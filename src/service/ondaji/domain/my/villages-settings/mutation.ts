import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import { PatchUserLocationBody } from '@/ondaji/types/domain';

import { patchUserLocation } from './api';

/** @MY 동네 설정 하는 훅 */
export const useMutationPatchUserLocation = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, PatchUserLocationBody>
) => {
  return useMutation({
    mutationFn: (body) => patchUserLocation(body),
    throwOnError: true,
    ...options,
  });
};
