import { Pagenation } from '@/ondaji/types/common';
import { NoticeDetailParams, NotificationDetailParams } from '@/ondaji/types/domain';

export const notificationKeys = {
  all: ['news'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (params: Pagenation) => [...notificationKeys.lists(), params?.page, params?.size] as const,
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (params: NotificationDetailParams) =>
    [...notificationKeys.details(), params?.notificationId] as const,
} as const;

export const noticeKeys = {
  all: ['notice'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (params: Pagenation) => [...noticeKeys.lists(), params?.page, params?.size] as const,
  details: () => [...noticeKeys.all, 'detail'] as const,
  detail: (params: NoticeDetailParams) => [...noticeKeys.details(), params?.noticeId] as const,
} as const;

export const bookmarkKeys = {
  all: ['bookmark'] as const,
  lists: () => [...bookmarkKeys.all, 'list'] as const,
  list: (params: Pagenation) => [...bookmarkKeys.lists(), params?.page, params?.size] as const,
};

export const subscriptionKeys = {
  all: ['subscription'] as const,
  lists: () => [...subscriptionKeys.all, 'list'] as const,
  list: (params: Pagenation) => [...subscriptionKeys.lists(), params?.page, params?.size] as const,
};
