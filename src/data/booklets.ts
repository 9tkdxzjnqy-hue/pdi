export interface BookletYear {
  year: number;
  pages: number;
}

export const bookletYears: BookletYear[] = [
  { year: 2020, pages: 38 },
  { year: 2019, pages: 62 },
  { year: 2018, pages: 53 },
  { year: 2017, pages: 62 },
  { year: 2016, pages: 62 },
  { year: 2015, pages: 68 },
  { year: 2014, pages: 65 },
  { year: 2013, pages: 72 },
];

/** Generate the image path for a booklet page */
export function bookletPageSrc(year: number, page: number): string {
  const nn = String(page).padStart(2, "0");
  return `/gallery/booklets/${year}/page-${nn}.jpg`;
}
