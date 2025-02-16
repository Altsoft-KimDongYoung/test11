import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import { PaymentInfoBody } from '@/ondaji/types/domain';

import { deletePaymentInfo, postPaymentInfo } from './api';

/** @PAYMENT 카드 정보 등록 */
export const useMutationRegisterPaymentInfo = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, PaymentInfoBody>
) => {
  return useMutation({
    mutationFn: (body: PaymentInfoBody) => postPaymentInfo(body),
    ...options,
  });
};

/** @PAYMENT 카드 정보 삭제 */
export const useMutationDeletePaymentInfo = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (id: number) => deletePaymentInfo(id),
    ...options,
  });
};
