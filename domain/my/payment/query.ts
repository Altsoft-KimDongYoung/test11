import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { ApiResponse, Pagenation } from '@/ondaji/types/common';
import { CardInfo, PaymentHistoryResponse, ReceiptInfo } from '@/ondaji/types/domain';

import { fetchPaymentHistory, fetchPaymentInfo } from './api';
import { paymentKeys } from './queryKey';

/** @PAYMENT 카드 정보 조회 */
export const useQueryPaymentInfo = (
  options?: UseQueryOptions<
    ApiResponse<CardInfo[]>,
    AxiosError,
    CardInfo[],
    ReturnType<typeof paymentKeys.card_list>
  >
) => {
  return useQuery({
    queryKey: paymentKeys.card_list(),
    queryFn: () => fetchPaymentInfo(),
    select: ({ result }) => result,
    ...options,
  });
};

/** @PAYMENT 결제 내역 목록 훅 */
export const useInfinitePaymentHistory = <T = ReceiptInfo[]>(
  params: Pagenation,
  options?: UseInfiniteQueryOptions<
    ApiResponse<PaymentHistoryResponse>,
    AxiosError,
    T,
    ApiResponse<PaymentHistoryResponse>,
    ReturnType<typeof paymentKeys.history>
  >
) => {
  return useInfiniteQuery({
    queryKey: paymentKeys.history({
      size: params.size,
    }),
    queryFn: ({ pageParam }) =>
      fetchPaymentHistory({
        page: pageParam as number,
        size: params.size,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    ...options,
  });
};
