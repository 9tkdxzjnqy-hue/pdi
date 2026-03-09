export const inducteesQuery = `*[_type == "inductee"] | order(year desc, nickname asc) {
  nickname,
  contribution,
  year,
  "photo": photo.asset->url
}`;

export const competitionsQuery = `*[_type == "competition"] | order(displayOrder asc) {
  name,
  description,
  image,
  "slug": slug.current,
  featured,
  displayOrder,
  results
}`;

export const featuredCompetitionsQuery = `*[_type == "competition" && featured == true] | order(displayOrder asc) {
  name,
  description,
  image,
  "slug": slug.current
}`;

export const erasQuery = `*[_type == "era"] | order(displayOrder asc) {
  eraId,
  label,
  description,
  groupByYear,
  allYears,
  displayOrder
}`;

export const galleryByEraQuery = `*[_type == "galleryItem" && era == $era] | order(year desc) {
  "src": image.asset->url,
  alt,
  era,
  year,
  featured,
  youtubeId
}`;

export const featuredGalleryQuery = `*[_type == "galleryItem" && featured == true] | order(year desc) {
  "src": image.asset->url,
  alt,
  era,
  year,
  youtubeId
}`;

export const storyThreadsQuery = `*[_type == "storyThread"] | order(displayOrder asc) {
  title,
  description,
  "slug": slug.current,
  comingSoon,
  displayOrder
}`;

export const storiesByThreadQuery = `*[_type == "story" && thread->slug.current == $threadSlug] | order(displayOrder asc) {
  title,
  year,
  author,
  body,
  images[] {
    "src": asset->url,
    alt
  },
  displayOrder
}`;

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  donationAmount,
  donationLabel,
  charityName,
  charityUrl,
  galleryUploadUrl
}`;

export const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0] {
  heroTitle,
  heroSubtitle,
  storyTitle,
  storyBody,
  storyImage,
  storyImageAlt,
  charityLabel,
  charityHeading,
  charityLinkText,
  charityImage,
  charityImageAlt,
  competitionsTitle,
  competitionsDescription,
  competitionsLinkText,
  galleryTitle,
  galleryDescription,
  galleryLinkText,
  galleryUploadText
}`;
