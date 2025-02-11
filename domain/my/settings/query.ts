import { AxiosError } from 'axios';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import { NotificationPermissionResponse } from '@/ondaji/types/domain';

import { fetchNotificationPermission } from './api';
import { settingsKeys } from './queryKey';

/** @MY 내 알림 권한 설정 정보 조회 API */
export const useQueryNotificationPermission = (
  options?: UseQueryOptions<
    ApiResponse<NotificationPermissionResponse>,
    AxiosError,
    NotificationPermissionResponse,
    ReturnType<typeof settingsKeys.notificationPermission>
  >
) => {
  return useQuery({
    queryKey: settingsKeys.notificationPermission(),
    queryFn: () => fetchNotificationPermission(),
    select: ({ result }) => result,
    ...options,
  });
};
