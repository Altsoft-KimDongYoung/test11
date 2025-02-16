import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import { LoginBody, LoginResponse } from '@/ondaji/types/domain';

import { postLogin } from './api';

/** @AUTH 로그인 */
export const useMutationLogin = (
  options?: UseMutationOptions<ApiResponse<LoginResponse>, AxiosError, LoginBody>
) => {
  return useMutation({
    mutationFn: (body: LoginBody) => postLogin(body),
    ...options,
  });
};
