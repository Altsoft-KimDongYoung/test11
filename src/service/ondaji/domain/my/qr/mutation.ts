import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  OrganizationRequestJoinAddressRequestBody,
  QRCertifyJuminRequestBody,
} from '@/ondaji/types/domain';

import {
  deleteQRCertifyJumin,
  postOrganizationRequestJoin,
  postOrganizationRequestJoinAddress,
  postQRCertifyJumin,
} from './api';

/** @MY 주민소식 지도에서 미가입 기관에 대해 가입 요청 */
export const useMutationOrganizationRequestJoin = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (organizationId: number) => postOrganizationRequestJoin(organizationId),
    ...options,
  });
};

/** @MY QR 주민인증 지도에서 미가입 기관 주소 등록 요청 */
export const useMutationOrganizationRequestJoinAddress = (
  options?: UseMutationOptions<
    ApiResponse<boolean>,
    AxiosError,
    OrganizationRequestJoinAddressRequestBody
  >
) => {
  return useMutation({
    mutationFn: (body: OrganizationRequestJoinAddressRequestBody) =>
      postOrganizationRequestJoinAddress(body),
    ...options,
  });
};

/** @MY QR 주민인증  */
export const useMutationQRCertifyJumin = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, QRCertifyJuminRequestBody>
) => {
  return useMutation({
    mutationFn: (body: QRCertifyJuminRequestBody) => postQRCertifyJumin(body),
    ...options,
  });
};

/** @MY QR 주민인증 삭제 */
export const useMutationDeleteQRCertifyJumin = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (certifyId: number) => deleteQRCertifyJumin(certifyId),
    throwOnError: true,
    ...options,
  });
};
