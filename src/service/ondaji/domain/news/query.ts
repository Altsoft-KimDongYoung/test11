import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { ApiResponse, Pagenation } from '@/ondaji/types/common';
import {
  BookmarkContentDTO,
  NewsCommonResponse,
  NoticeContentDTO,
  NoticeDetailParams,
  NoticeDetailResponse,
  NotificationContentDTO,
  NotificationDetailParams,
  SubscriptionContentDTO,
} from '@/ondaji/types/domain';

import {
  fetchBookmark,
  fetchNotice,
  fetchNoticeDetail,
  fetchNotification,
  fetchNotificationDetail,
  fetchSubscription,
} from './api';
import { bookmarkKeys, noticeKeys, notificationKeys, subscriptionKeys } from './queryKey';

/** @NEWS 알림 조회 */
export const useInfiniteQueryNotification = (
  params?: Pagenation,
  options?: UseInfiniteQueryOptions<
    ApiResponse<NewsCommonResponse<NotificationContentDTO[]>>,
    AxiosError,
    NotificationContentDTO[],
    ApiResponse<NewsCommonResponse<NotificationContentDTO[]>>,
    ReturnType<typeof notificationKeys.list>
  >
) => {
  const filter = params ?? { size: 12 };

  return useInfiniteQuery({
    queryKey: notificationKeys.list(filter),
    queryFn: ({ pageParam }) => fetchNotification({ ...filter, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.content),
    ...options,
  });
};

/** @NEWS 알림 상세 조회 */
export const useQueryNotificationDetail = (
  params: NotificationDetailParams,
  options?: UseQueryOptions<
    ApiResponse<NotificationContentDTO>,
    AxiosError,
    NotificationContentDTO,
    ReturnType<typeof notificationKeys.detail>
  >
) => {
  return useQuery({
    queryKey: notificationKeys.detail(params),
    queryFn: () => fetchNotificationDetail(params),
    select: ({ result }) => result,
    ...options,
  });
};

/** @NEWS 공지사항 목록 조회 */
export const useInfiniteQueryNotice = (
  params?: Pagenation,
  options?: UseInfiniteQueryOptions<
    ApiResponse<NewsCommonResponse<NoticeContentDTO[]>>,
    AxiosError,
    NoticeContentDTO[],
    ApiResponse<NewsCommonResponse<NoticeContentDTO[]>>,
    ReturnType<typeof noticeKeys.list>
  >
) => {
  const filter = params ?? { size: 12 };

  return useInfiniteQuery({
    queryKey: noticeKeys.list(filter),
    queryFn: ({ pageParam }) => fetchNotice({ ...filter, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.content),
    ...options,
  });
};

/** @NEWS 공지사항 상세 조회 */
export const useQueryNoticeDetail = (
  params: NoticeDetailParams,
  options?: UseQueryOptions<
    ApiResponse<NoticeDetailResponse>,
    AxiosError,
    NoticeDetailResponse,
    ReturnType<typeof noticeKeys.detail>
  >
) => {
  return useQuery({
    queryKey: noticeKeys.detail(params),
    queryFn: () => fetchNoticeDetail(params),
    select: ({ result }) => result,
    ...options,
  });
};

/** @NEWS 북마크 목록 조회 */
export const useInfiniteQueryBookmark = (
  params?: Pagenation,
  options?: UseInfiniteQueryOptions<
    ApiResponse<NewsCommonResponse<BookmarkContentDTO[]>>,
    AxiosError,
    BookmarkContentDTO[],
    ApiResponse<NewsCommonResponse<BookmarkContentDTO[]>>,
    ReturnType<typeof bookmarkKeys.list>
  >
) => {
  const filter = params ?? { size: 12 };

  return useInfiniteQuery({
    queryKey: bookmarkKeys.list(filter),
    queryFn: ({ pageParam }) => fetchBookmark({ ...filter, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.content),
    ...options,
  });
};

/** @NEWS 내가 구독중인 로컬박스 목록 조회 */
export const useInfiniteQuerySubscription = (
  params?: Pagenation,
  options?: UseInfiniteQueryOptions<
    ApiResponse<NewsCommonResponse<SubscriptionContentDTO[]>>,
    AxiosError,
    SubscriptionContentDTO[],
    ApiResponse<NewsCommonResponse<SubscriptionContentDTO[]>>,
    ReturnType<typeof subscriptionKeys.list>
  >
) => {
  const filter = params ?? { size: 12 };

  return useInfiniteQuery({
    queryKey: subscriptionKeys.list(filter),
    queryFn: ({ pageParam }) => fetchSubscription({ ...filter, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.content),
    ...options,
  });
};
