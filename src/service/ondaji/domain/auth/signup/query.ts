import { AxiosError } from 'axios';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import type {
  ApartmentContent,
  CheckBusinessParams,
  CheckBusinessResponse,
  CheckOrganizationManagerParams,
  CheckOrganizationManagerResponse,
  GvmtContent,
  OrganizationParams,
  OrganizationParentHierarchyListParams,
  OrganizationParentHierarchyListResponse,
  OrganizationResponse,
  UserCheckDuplicateLoginIdParams,
} from '@/ondaji/types/domain';

import {
  fetchCheckBusiness,
  fetchCheckOrganizationManager,
  fetchOrganizationApartment,
  fetchOrganizationGvmt,
  fetchOrganizationParentHierarchyList,
  fetchRandomNickname,
  fetchUserCheckDuplicateLoginId,
} from './api';
import { authKeys } from './queryKey';

/** @useQuery 아이디 중복 체크 */
export const useQueryUserCheckDuplicateLoginId = (
  params: UserCheckDuplicateLoginIdParams,
  options?: UseQueryOptions<
    ApiResponse<boolean>,
    AxiosError,
    boolean,
    ReturnType<typeof authKeys.checkDuplicateLoginId>
  >
) => {
  return useQuery({
    queryKey: authKeys.checkDuplicateLoginId(params),
    queryFn: () => fetchUserCheckDuplicateLoginId(params),
    select: ({ result }) => result,
    enabled: false,
    ...options,
  });
};

/** @useQuery 아파트명으로 검색하는 리스트 페이지 조회 */
export const useQueryOrganizationApartment = (
  params: OrganizationParams,
  options?: UseQueryOptions<
    ApiResponse<OrganizationResponse>,
    AxiosError,
    ApartmentContent[],
    ReturnType<typeof authKeys.organizationApartment>
  >
) => {
  return useQuery({
    queryKey: authKeys.organizationApartment(params),
    queryFn: () => fetchOrganizationApartment(params),
    enabled: false,
    select: (data) => data.result.content as ApartmentContent[],
    ...options,
  });
};

/** @useQuery 관공서명으로 검색하는 리스트 페이지 조회  */
export const useQueryOrganizationGvmt = (
  params: OrganizationParams,
  options?: UseQueryOptions<
    ApiResponse<OrganizationResponse>,
    AxiosError,
    GvmtContent[],
    ReturnType<typeof authKeys.organizationGvmt>
  >
) => {
  return useQuery({
    queryKey: authKeys.organizationGvmt(params),
    queryFn: () => fetchOrganizationGvmt(params),
    enabled: false,
    select: (data) => data.result.content as GvmtContent[],
    ...options,
  });
};

/** @useQuery 부모 행정기관 조회(By 좌표) */
export const useQueryOrganizationParentHierarchyList = (
  params: OrganizationParentHierarchyListParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<OrganizationParentHierarchyListResponse>,
      AxiosError,
      OrganizationParentHierarchyListResponse,
      ReturnType<typeof authKeys.organizationParentHierarchyList>
    >
  >
) => {
  return useQuery({
    queryKey: authKeys.organizationParentHierarchyList(params),
    queryFn: () => fetchOrganizationParentHierarchyList(params),
    select: ({ result }) => result,
    ...options,
  });
};

/**
 * @AUTH 사업자 유효성 체크 (기업 회원 가입시 입력한 사업장의 유효성 체크)
 * * @TODO: AUTH 해당 쿼리를 필요로 하는 API가 없어졌을 경우, 삭제가 필요합니다.
 * 4.0 -> 4.1 버전 마이그레이션으로 인한 삭제 대상
 * */
export const useQueryCheckBusiness = (
  params: CheckBusinessParams,
  options?: UseQueryOptions<
    ApiResponse<CheckBusinessResponse>,
    AxiosError,
    CheckBusinessResponse,
    ReturnType<typeof authKeys.checkBusiness>
  >
) => {
  return useQuery({
    queryKey: authKeys.checkBusiness(params),
    queryFn: () => fetchCheckBusiness(params),
    select: ({ result }) => result,
    enabled: false,
    ...options,
  });
};

/** @AUTH 특정 기관 관리자 존재 여부 체크 (특정 기관 관리자(회원)가 이미 존재하는 지를 확인하는 API) */
export const useQueryCheckOrganizationManager = (
  params: CheckOrganizationManagerParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<CheckOrganizationManagerResponse>,
      AxiosError,
      boolean,
      ReturnType<typeof authKeys.checkOrganizationManager>
    >
  >
) => {
  return useQuery({
    queryKey: authKeys.checkOrganizationManager(params),
    queryFn: () => fetchCheckOrganizationManager(params),
    select: ({ result }) => result.exist,
    enabled: false,
    ...options,
  });
};

/** @AUTH 닉네임 자동생성 */
export const useQueryRandomNickname = (
  options?: UseQueryOptions<
    ApiResponse<string>,
    AxiosError,
    string,
    ReturnType<typeof authKeys.randomNickname>
  >
) => {
  return useQuery({
    queryKey: authKeys.randomNickname(),
    queryFn: () => fetchRandomNickname(),
    select: ({ result }) => result,
    ...options,
  });
};
