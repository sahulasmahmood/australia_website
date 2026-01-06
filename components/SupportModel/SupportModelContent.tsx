"use client";

import Link from "next/link";
import Image from "next/image";
import { useSupportModels } from "@/hooks/use-support-models";
import { Target } from "lucide-react";
import { ServicesSectionSkeleton } from "@/components/ui/skeletons";

// Helper function to strip HTML tags and decode entities
const stripHtml = (html: string | undefined) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .trim();
};

export function SupportModelContent() {
  const { supportModels, isLoading } = useSupportModels(1, 20);

  if (isLoading) {
    return <ServicesSectionSkeleton />;
  }

  if (!supportModels || supportModels.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-secondary">OUR </span>
              <span className="text-primary">SUPPORT MODELS</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-justify">
              Discover our range of support models designed to meet your unique needs and goals.
            </p>
          </div>
          <div className="text-center">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Support models coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="text-secondary">OUR </span>
            <span className="text-primary">SUPPORT MODELS</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our range of support models designed to meet your unique needs and goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportModels.filter(model => model.image && model.title).map((model) => (
            <Link
              key={model._id}
              href={`/support-model/${model.slug}`}
              className="group bg-light-gray overflow-hidden rounded-lg hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={model.image}
                  alt={model.title || "Support Model"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-8 text-center flex flex-col flex-1">
                <h3 className="text-sm font-bold text-secondary mb-3 tracking-wide uppercase">
                  {model.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 text-justify">
                  {model.shortDescription || stripHtml(model.description)}
                </p>
                <span className="mt-4 inline-block text-primary text-sm font-medium group-hover:underline">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
