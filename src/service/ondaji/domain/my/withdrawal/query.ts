import { AxiosError } from 'axios';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import { WithdrawalResponse } from '@/ondaji/types/domain';

import { fetchUserDeletionStatus } from './api';
import { withdrawalKeys } from './queryKey';

/** @MY 탈퇴예정인 회원인지 아닌지 조회 */
export const useQueryUserDeletionStatus = (
  options?: UseQueryOptions<
    ApiResponse<WithdrawalResponse>,
    AxiosError,
    WithdrawalResponse,
    ReturnType<typeof withdrawalKeys.paidPeriodRemaining>
  >
) => {
  return useQuery({
    queryKey: withdrawalKeys.paidPeriodRemaining(),
    queryFn: () => fetchUserDeletionStatus(),
    select: ({ result }) => result,
    ...options,
  });
};
