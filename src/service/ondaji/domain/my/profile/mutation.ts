import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';

import { patchMyProfile } from './api';

/** @My 마이프로필 수정 */
export const useMutationMyProfile = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => patchMyProfile(body),
    ...options,
  });
};
