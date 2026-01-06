"use client"

import useSWR from "swr"

export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  avatar?: string;
  content: string;
  rating: number;
  serviceType: string;
  date: string;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TestimonialsResponse {
  success: boolean;
  data: Testimonial[];
}

export function useTestimonials() {
  const { data, error, isLoading, mutate } = useSWR<TestimonialsResponse>(
    '/api/testimonials',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      dedupingInterval: 60000,
    },
  )

  return {
    testimonials: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  }
}
