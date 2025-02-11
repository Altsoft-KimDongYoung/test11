import { AxiosError } from 'axios';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import {
  ApiResponse,
  AreaPointMyTownParams,
  AreaPointMyTownResponse,
  OrganizationMyTownParams,
} from '@/ondaji/types/common';

import { fetchAreaPointMyTown, fetchOrganizationMyTown } from './api';
import { areaKeys } from './queryKey';

/** @useQuery 내 동네 영역 조회(Point) */
export const useQueryAreaPointMyTown = (
  params: AreaPointMyTownParams,
  options?: UseQueryOptions<
    ApiResponse<AreaPointMyTownResponse>,
    AxiosError,
    AreaPointMyTownResponse,
    ReturnType<typeof areaKeys.pointMyTown>
  >
) => {
  return useQuery({
    queryKey: areaKeys.pointMyTown(params),
    queryFn: () => fetchAreaPointMyTown(params),
    select: ({ result }) => result,
    ...options,
  });
};

/** @useQuery 내동네 영역 조회(OrganizationId) */
export const useQueryOrganizationMyTown = (
  params: OrganizationMyTownParams,
  options?: UseQueryOptions<
    ApiResponse<AreaPointMyTownResponse>,
    AxiosError,
    AreaPointMyTownResponse,
    ReturnType<typeof areaKeys.organizationMyTown>
  >
) => {
  return useQuery({
    queryKey: areaKeys.organizationMyTown(params),
    queryFn: () => fetchOrganizationMyTown(params),
    select: ({ result }) => result,
    ...options,
  });
};
