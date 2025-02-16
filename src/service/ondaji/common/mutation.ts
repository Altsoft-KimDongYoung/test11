import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse, LogoutBody } from '@/ondaji/types/common';

import { postLogout } from './api';

/** @Common 로그아웃 */
export const useMutationLogout = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, LogoutBody>
) => {
  return useMutation({
    mutationFn: (body: LogoutBody) => postLogout(body),
    ...options,
  });
};
