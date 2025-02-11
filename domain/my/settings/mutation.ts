import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import { NotificationPermissionBody } from '@/ondaji/types/domain';

import { PutNotificationPermission } from './api';

/** @MY 내 알림 권한 설정 정보 조회 API */
export const useMutationNotificationPermission = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, NotificationPermissionBody>
) => {
  return useMutation({
    mutationFn: (body: NotificationPermissionBody) => PutNotificationPermission(body),
    ...options,
  });
};
