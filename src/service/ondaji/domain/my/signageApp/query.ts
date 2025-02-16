import { AxiosError } from 'axios';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';

import { fetchSignageAppPinCode } from './api';
import { signageAppKeys } from './queryKey';

/** @MY 사이니지 핀코드 조회 */
export const useQuerySignageAppPinCode = (
  options?: UseQueryOptions<
    ApiResponse<string>,
    AxiosError,
    string[],
    ReturnType<typeof signageAppKeys.pinCode>
  >
) => {
  return useQuery({
    queryKey: signageAppKeys.pinCode(),
    queryFn: () => fetchSignageAppPinCode(),
    select: ({ result }) => [...result],
    ...options,
  });
};
