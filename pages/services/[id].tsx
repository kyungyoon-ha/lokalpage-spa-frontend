import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { servicesData } from "@/data/services";

const LOCALES = ["ko", "en", "ja", "zh-CN", "zh-TW"];

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: servicesData.flatMap((s) =>
    LOCALES.map((locale) => ({ params: { id: s.id }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ locale, params }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common", "services"])),
    id: params?.id as string,
  },
});

const ServiceDetailPage: NextPage<{ id: string }> = ({ id }) => {
  const { t } = useTranslation("services");
  const { locale } = useRouter();
  const service = servicesData.find((s) => s.id === id);
  if (!service) return null;

  const name = t(`items.${id}.name`);
  const tagline = t(`items.${id}.tagline`);

  return (
    <>
      <NextSeo
        title={`${name} | KORISPA`}
        description={t(`items.${id}.description`)}
      />

      {/* page background */}
      <main
        style={{
          background: "#f8f5f0",
          minHeight: "100vh",
          paddingTop: "80px",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{ maxWidth: "660px", margin: "0 auto", padding: "0 0 40px" }}
        >
          {/* ── Additional images ── */}
          {service.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${name} ${i + 2}`}
              style={{
                width: "100%",
                display: "block",
                marginTop: "8px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      </main>

      {/* ── Fixed bottom bar ── */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          right: "24px",
          background: "rgba(26, 23, 20, 0.93)",
          backdropFilter: "blur(8px)",
          borderRadius: "4px",
          padding: "20px 32px",
          zIndex: 100,
        }}
      >
        <div className="service-bottom-bar">
          <div className="bar-text">
            <span className="bar-name">{name}</span>
            <span className="bar-tagline">{tagline}</span>
          </div>
          <Link href="/reservation" locale={locale} className="bar-btn">
            RESERVATION
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailPage;
