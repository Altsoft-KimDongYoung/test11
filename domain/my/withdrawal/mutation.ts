import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import { WithdrawalBody, WithdrawalResponse } from '@/ondaji/types/domain';

import { deleteUserWithdrawal } from './api';

/** @My 회원탈퇴 */
export const useMutationWithdrawal = (
  options?: UseMutationOptions<ApiResponse<WithdrawalResponse>, AxiosError, WithdrawalBody>
) => {
  return useMutation({
    mutationFn: (body: WithdrawalBody) => deleteUserWithdrawal(body),
    ...options,
  });
};
