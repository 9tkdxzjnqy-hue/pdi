import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Charity from "@/components/Charity";
import CompetitionsPreview from "@/components/CompetitionsPreview";
import GalleryPreview from "@/components/GalleryPreview";
import Footer from "@/components/Footer";
import { getFeaturedCompetitions, getFeaturedGalleryImages, getSiteSettings, getHomePage } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";

export default async function Home() {
  const [featuredCompetitions, featuredGalleryImages, settings, homePage] = await Promise.all([
    getFeaturedCompetitions(),
    getFeaturedGalleryImages(),
    getSiteSettings(),
    getHomePage(),
  ]);

  const storyImageSrc = homePage.storyImage?.asset?._ref
    ? urlFor(homePage.storyImage).width(800).url()
    : undefined;

  const charityImageSrc = homePage.charityImage?.asset?._ref
    ? urlFor(homePage.charityImage).width(800).url()
    : undefined;

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title={homePage.heroTitle}
          subtitle={homePage.heroSubtitle}
          donationAmount={settings.donationAmount}
          donationLabel={settings.donationLabel}
        />
        <Story
          title={homePage.storyTitle}
          body={homePage.storyBody}
          imageSrc={storyImageSrc}
          imageAlt={homePage.storyImageAlt}
        />
        <Charity
          label={homePage.charityLabel}
          heading={homePage.charityHeading ?? settings.charityName}
          donationAmount={settings.donationAmount}
          donationLabel={settings.donationLabel}
          linkText={homePage.charityLinkText}
          linkUrl={settings.charityUrl}
          imageSrc={charityImageSrc}
          imageAlt={homePage.charityImageAlt}
        />
        <CompetitionsPreview
          competitions={featuredCompetitions}
          title={homePage.competitionsTitle}
          description={homePage.competitionsDescription}
          linkText={homePage.competitionsLinkText}
        />
        <GalleryPreview
          images={featuredGalleryImages}
          title={homePage.galleryTitle}
          description={homePage.galleryDescription}
          linkText={homePage.galleryLinkText}
          uploadText={homePage.galleryUploadText}
          uploadUrl={settings.galleryUploadUrl}
        />
      </main>
      <Footer />
    </>
  );
}
