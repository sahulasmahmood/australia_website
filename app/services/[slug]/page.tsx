import { notFound } from "next/navigation";
import { TopBar } from "@/components/top-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaBanner } from "@/components/cta-banner";
import { DynamicPageBanner } from "@/components/DynamicPageBanner";
import ServiceDetailClient from "@/components/Services/ServiceDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

import { cache } from "react";

// Base fetcher to be deduplicated
const getServiceBase = cache(async (slug: string) => {
  const connectDB = (await import("@/config/models/connectDB")).default;
  const Service = (
    await import("@/config/utils/admin/services/serviceSchema")
  ).default;

  await connectDB();

  const service = await Service.findOne({
    slug,
    status: "active",
    $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
  })
    .select("-isDeleted -__v")
    .lean();

  return service ? JSON.parse(JSON.stringify(service)) : null;
});

// Fetch single service by slug
async function getServiceBySlug(slug: string, increment = false) {
  try {
    const service = await getServiceBase(slug);

    if (service && increment) {
      const Service = (
        await import("@/config/utils/admin/services/serviceSchema")
      ).default;
      // Increment view count separately from fetch
      await Service.findByIdAndUpdate(service._id, {
        $inc: { views: 1 },
      });
    }

    return service;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const serviceData = await getServiceBySlug(resolvedParams.slug);

  if (!serviceData) {
    return {
      title: "Service Not Found - Elegant Care Service",
      description: "The requested service could not be found.",
    };
  }

  return {
    title:
      serviceData.seoTitle ||
      `${serviceData.serviceName} - Elegant Care Service`,
    description: serviceData.seoDescription || serviceData.description,
    keywords:
      serviceData.seoKeywords ||
      `${serviceData.serviceName}, NDIS services, disability support, Elegant Care Service`,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const serviceData = await getServiceBySlug(resolvedParams.slug, true);

  if (!serviceData) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <DynamicPageBanner
        pageKey="services"
        title={serviceData.serviceName.toUpperCase()}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: serviceData.serviceName, href: `/services/${resolvedParams.slug}` },
        ]}
      />
      <ServiceDetailClient serviceData={serviceData} />
      <CtaBanner />
      <Footer />
    </main>
  );
}
