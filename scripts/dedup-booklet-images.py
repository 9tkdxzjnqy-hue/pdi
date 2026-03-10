#!/usr/bin/env python3
"""
Deduplicate booklet extract images against existing gallery and across years.

Usage:
    python3 scripts/dedup-booklet-images.py [--copy]

Without --copy: prints report only (dry run).
With --copy: copies kept images to public/gallery/ and prints TS entries.
"""

import os
import sys
import json
import shutil
from pathlib import Path
from collections import defaultdict

import imagehash
from PIL import Image

# --- Config ---
CONTENT_ROOT = Path("/Users/aidanmaughan/pdi content")
GALLERY_DIR = Path("/Users/aidanmaughan/my-projects/pdi/public/gallery")
YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
HAMMING_THRESHOLD = 10
MIN_DIMENSION = 400
MAX_WIDTH = 1200

DO_COPY = "--copy" in sys.argv


def hash_image(path: Path):
    """Return perceptual hash and dimensions, or None if unreadable."""
    try:
        img = Image.open(path)
        w, h = img.size
        phash = imagehash.phash(img)
        return phash, w, h
    except Exception as e:
        print(f"  WARNING: Could not read {path}: {e}")
        return None


def find_match(phash, hash_list, threshold):
    """Return first matching (path, hash) tuple from hash_list, or None."""
    for other_path, other_hash in hash_list:
        if phash - other_hash <= threshold:
            return other_path, other_hash
    return None


def main():
    # --- 1. Hash existing gallery images ---
    print("=== Hashing existing gallery images ===")
    existing_hashes = []  # [(path, hash)]
    gallery_files = sorted(GALLERY_DIR.glob("*.*"))
    for f in gallery_files:
        if f.suffix.lower() in (".jpg", ".jpeg", ".png"):
            result = hash_image(f)
            if result:
                phash, w, h = result
                existing_hashes.append((f, phash))
    print(f"  Hashed {len(existing_hashes)} existing gallery images\n")

    # --- 2. Hash all booklet extract images ---
    print("=== Hashing booklet extract images ===")
    booklet_images = []  # [(path, year, phash, w, h)]
    for year in YEARS:
        extract_dir = CONTENT_ROOT / str(year) / "images" / "booklet image extracts"
        if not extract_dir.exists():
            print(f"  {year}: directory not found, skipping")
            continue
        files = sorted(extract_dir.iterdir())
        count = 0
        for f in files:
            if f.suffix.lower() in (".jpg", ".jpeg", ".png"):
                result = hash_image(f)
                if result:
                    phash, w, h = result
                    booklet_images.append((f, year, phash, w, h))
                    count += 1
        print(f"  {year}: hashed {count} images")
    print(f"  Total booklet images hashed: {len(booklet_images)}\n")

    # --- 3. Filter: exclude too-small images ---
    print("=== Filtering by minimum dimensions ({0}px) ===".format(MIN_DIMENSION))
    too_small = []
    sized_ok = []
    for path, year, phash, w, h in booklet_images:
        if w < MIN_DIMENSION or h < MIN_DIMENSION:
            too_small.append((path, year, w, h))
        else:
            sized_ok.append((path, year, phash, w, h))
    print(f"  Too small (excluded): {len(too_small)}")
    print(f"  Size OK: {len(sized_ok)}\n")

    # --- 4. Filter: exclude matches against existing gallery ---
    print("=== Filtering against existing gallery (hamming ≤ {0}) ===".format(HAMMING_THRESHOLD))
    matched_existing = []
    no_gallery_match = []
    for path, year, phash, w, h in sized_ok:
        match = find_match(phash, existing_hashes, HAMMING_THRESHOLD)
        if match:
            matched_existing.append((path, year, match[0]))
        else:
            no_gallery_match.append((path, year, phash, w, h))
    print(f"  Already in gallery (excluded): {len(matched_existing)}")
    if matched_existing:
        for src, yr, gallery_match in matched_existing[:10]:
            print(f"    {src.name} ({yr}) ≈ {gallery_match.name}")
        if len(matched_existing) > 10:
            print(f"    ... and {len(matched_existing) - 10} more")
    print(f"  New to gallery: {len(no_gallery_match)}\n")

    # --- 5. Deduplicate across booklet years (keep oldest year) ---
    print("=== Deduplicating across booklet years (keep oldest) ===")
    # Sort by year ascending so oldest comes first
    no_gallery_match.sort(key=lambda x: x[1])
    kept = []  # [(path, year, phash, w, h)]
    kept_hashes = []  # [(path, hash)] for matching
    cross_year_dupes = []
    for path, year, phash, w, h in no_gallery_match:
        match = find_match(phash, kept_hashes, HAMMING_THRESHOLD)
        if match:
            cross_year_dupes.append((path, year, match[0]))
        else:
            kept.append((path, year, phash, w, h))
            kept_hashes.append((path, phash))
    print(f"  Cross-year duplicates removed: {len(cross_year_dupes)}")
    if cross_year_dupes:
        for src, yr, kept_match in cross_year_dupes[:10]:
            print(f"    {src.name} ({yr}) ≈ {kept_match.name}")
        if len(cross_year_dupes) > 10:
            print(f"    ... and {len(cross_year_dupes) - 10} more")
    print(f"  Unique images to add: {len(kept)}\n")

    # --- 6. Summary by year ---
    print("=== Kept images by year ===")
    by_year = defaultdict(list)
    for path, year, phash, w, h in kept:
        by_year[year].append((path, w, h))
    for year in YEARS:
        items = by_year.get(year, [])
        print(f"  {year}: {len(items)} images")
    print()

    # --- 7. Summary ---
    print("=== SUMMARY ===")
    print(f"  Total booklet images:          {len(booklet_images)}")
    print(f"  Too small (<{MIN_DIMENSION}px):          {len(too_small)}")
    print(f"  Already in gallery:            {len(matched_existing)}")
    print(f"  Cross-year duplicates:         {len(cross_year_dupes)}")
    print(f"  UNIQUE IMAGES TO ADD:          {len(kept)}")
    print()

    # --- 8. Copy & generate TS entries ---
    if DO_COPY:
        print("=== Copying images to gallery ===")
        ts_entries = []
        # Number per year
        year_counters = defaultdict(int)
        for path, year, phash, w, h in kept:
            year_counters[year] += 1
            nn = year_counters[year]
            dest_name = f"{year}-booklet-{nn:02d}.jpg"
            dest = GALLERY_DIR / dest_name

            # Open, resize if needed, save as JPEG
            img = Image.open(path)
            if img.width > MAX_WIDTH:
                ratio = MAX_WIDTH / img.width
                new_h = int(img.height * ratio)
                img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
                print(f"  Resized {path.name} ({w}x{h}) → {MAX_WIDTH}x{new_h}")

            # Convert to RGB if needed (handles RGBA/P modes)
            if img.mode != "RGB":
                img = img.convert("RGB")

            img.save(dest, "JPEG", quality=85)
            print(f"  Saved {dest_name}")

            ts_entries.append({
                "src": f"/gallery/{dest_name}",
                "alt": f"PDI {year} booklet photo",
                "era": "recent",
                "year": year,
            })

        # Print TS entries
        print(f"\n=== TypeScript gallery entries ({len(ts_entries)}) ===")
        print("  // === BOOKLET EXTRACTS ===")
        for entry in ts_entries:
            print(f'  {{ src: "{entry["src"]}", alt: "{entry["alt"]}", era: "{entry["era"]}", year: {entry["year"]} }},')

        # Also write to a JSON file for easy programmatic use
        json_path = Path("/Users/aidanmaughan/my-projects/pdi/scripts/booklet-entries.json")
        with open(json_path, "w") as f:
            json.dump(ts_entries, f, indent=2)
        print(f"\n  JSON entries written to {json_path}")
    else:
        print("Dry run — use --copy to copy images and generate entries.")
        print("\n=== Images that would be kept ===")
        for path, year, phash, w, h in kept:
            print(f"  [{year}] {path.name} ({w}x{h})")


if __name__ == "__main__":
    main()
