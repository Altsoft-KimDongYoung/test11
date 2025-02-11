import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  ReservatedProject,
  ReservationDateListResponse,
  ReservationDetailResponse,
  ReservationListParams,
  ReserveDetailParams,
} from '@/ondaji/types/domain';

import { fetchReservationDateList, fetchReservationList, fetchReserveDetail } from './api';
import { reserveKeys } from './queryKey';

/** @SIGNAGE 프로젝트를 사용하는 그룹들 조회 훅 */
export const useQueryReservationDateList = <T = ReservationDateListResponse>(
  params: ReservationListParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<ReservationDateListResponse>,
      AxiosError,
      T,
      ReturnType<typeof reserveKeys.date_list>
    >
  >
) => {
  return useQuery({
    queryKey: reserveKeys.date_list(params),
    queryFn: () => fetchReservationDateList(params),
    select: (data) => data.result as T,
    ...options,
  });
};

/** @SIGNAGE 예약된 프로젝트 목록을 가져오는 훅 */
export const useQueryReservationList = <T = ReservatedProject[]>(
  params: ReservationListParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<ReservatedProject[]>,
      AxiosError,
      T,
      ReturnType<typeof reserveKeys.list>
    >
  >
) => {
  return useQuery({
    queryKey: reserveKeys.list({
      groupId: params.groupId,
      conditionMonthDt: params.conditionMonthDt,
    }),
    queryFn: () => fetchReservationList(params),
    select: (data) => data.result as T,
    ...options,
  });
};

/** @SIGNAGE  사이니지 프로젝트 예약 상세 정보를 가져오는 훅 */
export const useQueryReserveDetail = <T = ReservationDetailResponse>(
  params: ReserveDetailParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<ReservationDetailResponse>,
      AxiosError,
      T,
      ReturnType<typeof reserveKeys.detail>
    >
  >
) => {
  return useQuery({
    queryKey: reserveKeys.detail(params.reservationId),
    queryFn: () => fetchReserveDetail(params),
    select: (data) => data.result as T,
    ...options,
  });
};
