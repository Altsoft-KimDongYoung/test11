import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  ApplyPayGroupBody,
  CancelPayGroupParams,
  DeleteDecisionInProgressGroupParams,
  DeleteSignageDeviceParams,
  PatchGroupDefaultProjectBody,
  PatchSignageDeviceNameBody,
  SignageGroupDeleteParams,
} from '@/ondaji/types/domain';

import {
  cancelPayGroup,
  deleteDecisionInProgressGroup,
  deleteSignageDevice,
  deleteSignageGroup,
  patchGroupDefaultProject,
  patchSignageDeviceName,
  postApplyPayGroup,
  postRegisterSignageDevice,
  postRegisterSignageGroup,
  putRegisterSignageGroup,
} from './api';

/** @SIGNAGE 사이니지 기기 등록 하는 훅 */
export const useMutationRegisterSignageDevice = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, FormData>
) => {
  return useMutation({
    mutationFn: (body) => postRegisterSignageDevice(body),
    ...options,
  });
};

/** @SIGNAGE 사이니지 기기를 삭제하는 훅 */
export const useMutationDeleteSignageDevice = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, DeleteSignageDeviceParams>
) => {
  return useMutation({
    mutationFn: (params) => deleteSignageDevice(params),
    ...options,
  });
};

/** @SIGNAGE 사이니지 기기의 이름을 수정하는 훅 */
export const useMutationPatchSignageDeviceName = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, PatchSignageDeviceNameBody>
) => {
  return useMutation({
    mutationFn: (body) => patchSignageDeviceName(body),
    ...options,
  });
};

/** @SIGNAGE 사이니지 그룹을 등록하는 훅 */
export const useMutationRegisterSignageGroup = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, FormData>
) => {
  return useMutation({
    mutationFn: (body) => postRegisterSignageGroup(body),
    ...options,
  });
};

/** @SIGNAGE 심사가 반려된 그룹의 신청을 취소하는 훅 */
export const useMutationDeleteDecisionInProgressGroup = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, DeleteDecisionInProgressGroupParams>
) => {
  return useMutation({
    mutationFn: (params) => deleteDecisionInProgressGroup(params),
    ...options,
  });
};

/** @SIGNAGE 사이니지 그룹을 재신청 하는 훅 */
export const useMutationReRegisterSignageGroup = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, FormData>
) => {
  return useMutation({
    mutationFn: (body) => putRegisterSignageGroup(body),
    ...options,
  });
};

/** @SIGNAGE 사이니지 그룹 결제하는 훅  */
export const useMutationApplyPayGroup = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, ApplyPayGroupBody>
) => {
  return useMutation({
    mutationFn: (body) => postApplyPayGroup(body),
    ...options,
  });
};

/** @SIGNAGE 사이니지 그룹 삭제하는 훅  */
export const useMutationDeleteSignageGroup = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, SignageGroupDeleteParams>
) => {
  return useMutation({
    mutationFn: (params) => deleteSignageGroup(params),
    ...options,
  });
};

/** @SIGNAGE 그룹 서비스를 해지하는 훅 */
export const useMutationCancelPayGroup = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, CancelPayGroupParams>
) => {
  return useMutation({
    mutationFn: (params) => cancelPayGroup(params),
    ...options,
  });
};

/** @SIGNAGE 사이니지 그룹의 기본 프로젝트를 변경하는 훅 */
export const useMutatioPatchGroupDefaultProject = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, PatchGroupDefaultProjectBody>
) => {
  return useMutation({
    mutationFn: (body) => patchGroupDefaultProject(body),
    ...options,
  });
};
