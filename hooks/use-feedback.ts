"use client";

import useSWR from "swr";

export interface Feedback {
  _id: string;
  isAnonymous: boolean;
  name: string;
  email: string;
  phone: string;
  feedbackType: "compliment" | "suggestion" | "concern" | "complaint" | "other";
  feedback: string;
  resolution: string;
  status: "new" | "reviewed" | "in-progress" | "resolved";
  adminNotes: string;
  submittedAt: string;
  lastUpdated: string;
}

interface FeedbackResponse {
  success: boolean;
  data: Feedback[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  stats: {
    total: number;
    new: number;
    reviewed: number;
    resolved: number;
    complaints: number;
  };
}

interface UseFeedbackOptions {
  page?: number;
  limit?: number;
  status?: string;
  feedbackType?: string;
  search?: string;
}

export function useFeedback(options: UseFeedbackOptions = {}) {
  const { page = 1, limit = 10, status = "all", feedbackType = "all", search = "" } = options;

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (status !== "all") params.append("status", status);
  if (feedbackType !== "all") params.append("feedbackType", feedbackType);
  if (search) params.append("search", search);

  const { data, error, isLoading, mutate } = useSWR<FeedbackResponse>(
    `/api/admin/feedback?${params.toString()}`,
    (url) => fetch(url).then((r) => r.json()),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    feedbacks: data?.data || [],
    pagination: data?.pagination,
    stats: data?.stats,
    isLoading,
    isError: error,
    mutate,
  };
}
