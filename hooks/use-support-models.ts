"use client";

import useSWR from "swr";

interface SupportModel {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
  slug: string;
  status: string;
  order: number;
  views?: number;
  bookings?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface SupportModelsResponse {
  success: boolean;
  data: SupportModel[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalSupportModels: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function useSupportModels(page: number = 1, limit: number = 20) {
  const { data, error, isLoading } = useSWR<SupportModelsResponse>(
    `/api/support-models?page=${page}&limit=${limit}`,
    (url) => fetch(url).then((r) => r.json()),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000,
    }
  );

  return {
    supportModels: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError: error,
  };
}
