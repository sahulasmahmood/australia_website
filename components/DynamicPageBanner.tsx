"use client";

import { PageBanner } from "@/components/page-banner";
import { useBanner } from "@/hooks/use-banner";

interface DynamicPageBannerProps {
  pageKey: string;
  title: string;
  breadcrumb?: { label: string; href: string }[];
}

export function DynamicPageBanner({
  pageKey,
  title,
  breadcrumb,
}: DynamicPageBannerProps) {
  const { banner, isLoading } = useBanner(pageKey);

  if (isLoading) {
    return (
      <PageBanner
        title={title}
        breadcrumb={breadcrumb}
      />
    );
  }

  return (
    <PageBanner
      title={title}
      breadcrumb={breadcrumb}
      backgroundImage={banner?.image}
    />
  );
}
