import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
// import Hero from "@/components/sections/Hero";
import StickyScroll from "@/components/sections/StickyScroll";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import Therapist from "@/components/sections/Therapist";
import Gallery from "@/components/sections/Gallery";
import LocationContact from "@/components/sections/LocationContact";
import { getHomePageSeo, getLocalBusinessLdJson, type Locale } from "@/lib/seo";

const HomePage: NextPage = () => {
  const { locale } = useRouter();
  const seoProps = getHomePageSeo((locale ?? "ko") as Locale);

  return (
    <>
      <NextSeo {...seoProps} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessLdJson()),
          }}
        />
      </Head>
      <main>
        {/* <Hero /> */}
        <StickyScroll />
        <Services />
        <About />
        <Philosophy />
        <Gallery />
        <Therapist />
        <LocationContact />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", [
      "common",
      "home",
      "services",
    ])),
  },
});

export default HomePage;
