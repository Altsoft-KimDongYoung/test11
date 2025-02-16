import { AxiosError } from 'axios';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import {
  CertifyOrganizationDto,
  CertifyType,
  InMyTownCertifyOrganizationResponse,
  MyCertifyResponse,
  OrganizationManagerByIdResponse,
  OrganizationParentHierarchyListByIdResponse,
  QRCanCertifyJuminRequestParams,
  QRManageCertifyImageResponse,
} from '@/ondaji/types/domain';

import {
  fetchInMyTownCertifyOrganization,
  fetchManagementCertifyType,
  fetchOrganizationManagerById,
  fetchOrganizationParentHierarchyListById,
  fetchOrganizationRequestJoinNum,
  fetchQRCanCertifyJumin,
  fetchQRManageCertifyImage,
  fetchQRMyCertify,
  fetchQRResidentCertificationStatus,
} from './api';
import { qrKeys } from './queryKey';

/** @MY QR 주민 인증 관리타입 조회 */
export const useQueryCertifyType = (
  options?: UseQueryOptions<
    ApiResponse<CertifyType>,
    AxiosError,
    CertifyType,
    ReturnType<typeof qrKeys.certifyType>
  >
) => {
  return useQuery({
    queryKey: qrKeys.certifyType(),
    queryFn: () => fetchManagementCertifyType(),
    select: (data) => data.result,
    ...options,
  });
};

/** @MY 주민인증 지도에서 내 동네 안에 있는 주민 인증할 수 있는 기관 정보 조회 */
export const useQueryInMyTownCertifyOrganization = (
  options?: UseQueryOptions<
    ApiResponse<InMyTownCertifyOrganizationResponse>,
    AxiosError,
    CertifyOrganizationDto[],
    ReturnType<typeof qrKeys.inMyTownCertifyOrganizationList>
  >
) => {
  return useQuery({
    queryKey: qrKeys.inMyTownCertifyOrganizationList(),
    queryFn: () => fetchInMyTownCertifyOrganization(),
    select: (data) => data.result.certifyOrganizationDtos as CertifyOrganizationDto[],
    ...options,
  });
};

/** @MY 주민인증 지도에서 미가입 기관 마커 클릭 시 가입 요청 건수 조회 */
export const useQueryRequestJoinNumber = (
  organizationId: number,
  options?: Partial<
    UseQueryOptions<ApiResponse<number>, AxiosError, number, ReturnType<typeof qrKeys.requestJoin>>
  >
) => {
  return useQuery({
    queryKey: qrKeys.requestJoin(organizationId),
    queryFn: () => fetchOrganizationRequestJoinNum(organizationId),
    select: (data) => data.result,
    ...options,
  });
};

/** @MY 관공서, 아파트 유저 외에 모든 회원이 주민인증한 기록 조회 */
export const useQueryMyCertify = (
  options?: UseQueryOptions<
    ApiResponse<MyCertifyResponse>,
    AxiosError,
    MyCertifyResponse,
    ReturnType<typeof qrKeys.myCertifyList>
  >
) => {
  return useQuery({
    queryKey: qrKeys.myCertifyList(),
    queryFn: () => fetchQRMyCertify(),
    select: (data) => data.result,
    ...options,
  });
};

/** @MY 관공서(주민센터), 아파트 크리에이터가 관리하는 주민인증 QR 이미지 조회 */
export const useQueryManageCertifyImage = (
  options?: UseQueryOptions<
    ApiResponse<QRManageCertifyImageResponse>,
    AxiosError,
    QRManageCertifyImageResponse,
    ReturnType<typeof qrKeys.manageCertifyImage>
  >
) => {
  return useQuery({
    queryKey: qrKeys.manageCertifyImage(),
    queryFn: () => fetchQRManageCertifyImage(),
    select: (data) => data.result,
    ...options,
  });
};

/** @MY 부모 행정기관 조회(By organizationId) */
export const useQueryParentHierachyListById = (
  organizationId: number,
  options?: UseQueryOptions<
    ApiResponse<OrganizationParentHierarchyListByIdResponse>,
    AxiosError,
    OrganizationParentHierarchyListByIdResponse,
    ReturnType<typeof qrKeys.organizationParentHierarchyList>
  >
) => {
  return useQuery({
    queryKey: qrKeys.organizationParentHierarchyList(organizationId),
    queryFn: () => fetchOrganizationParentHierarchyListById(organizationId),
    select: (data) => data.result,
    enabled: organizationId !== 0,
    ...options,
  });
};

/** @MY QR 스캔 직후, QR 인증이 가능한지 확인하기 위한 query */
export const useQueryQRCanCertifyJumin = (
  params: QRCanCertifyJuminRequestParams,
  options?: UseQueryOptions<
    ApiResponse<boolean>,
    AxiosError,
    boolean,
    ReturnType<typeof qrKeys.canCertifyJumin>
  >
) => {
  return useQuery({
    queryKey: qrKeys.canCertifyJumin(),
    queryFn: () => fetchQRCanCertifyJumin(params),
    select: (data) => data.result,
    ...options,
  });
};

/** @MY QR 주민 인증 정보 존재 여부 조회 */
export const useQueryQRResidentCertificationStatus = (
  organizationId: number,
  options?: UseQueryOptions<
    ApiResponse<boolean>,
    AxiosError,
    boolean,
    ReturnType<typeof qrKeys.QRResidentCertificationStatus>
  >
) => {
  return useQuery({
    queryKey: qrKeys.QRResidentCertificationStatus(organizationId),
    queryFn: () => fetchQRResidentCertificationStatus(organizationId),
    select: ({ result }) => result,
    enabled: !!organizationId,
    ...options,
  });
};

/** @MY QR 주민 인증 가능 기관 클릭 시 기관정보 조회 */
export const useQueryOrganizationManagerById = (
  organizationId: number,
  options?: UseQueryOptions<
    ApiResponse<OrganizationManagerByIdResponse>,
    AxiosError,
    OrganizationManagerByIdResponse,
    ReturnType<typeof qrKeys.organizationManagerById>
  >
) => {
  return useQuery({
    queryKey: qrKeys.organizationManagerById(organizationId),
    queryFn: () => fetchOrganizationManagerById(organizationId),
    select: ({ result }) => result,
    enabled: !!organizationId && organizationId !== 0,
    ...options,
  });
};
