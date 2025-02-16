import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  EditReserveRequestBody,
  ProjectCopyRequestBody,
  RegisterReserveRequestBody,
} from '@/ondaji/types/domain';

import { deleteReserve, postCopyProject, postRegisterReserve, putReserve } from './api';

/** @SIGNAGE 사이니지 예약를 등록하는 훅 */
export const useMutationRegisterReserve = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, RegisterReserveRequestBody>
) => {
  return useMutation({
    mutationFn: (body) => postRegisterReserve(body),
    ...options,
  });
};

/** @SIGNAGE 사이니지 예약를 삭제하는 훅 */
export const useMutationDeleteReserve = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, number>
) => {
  return useMutation({
    mutationFn: (reservationId) => deleteReserve(reservationId),
    ...options,
  });
};

/** @SIGNAGE 사이니지 예약를 수정하는 훅 */
export const useMutationEditReserve = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, EditReserveRequestBody>
) => {
  return useMutation({
    mutationFn: (body) => putReserve(body),
    ...options,
  });
};

/** @SIGNAGE 사이니지 프로젝트를 복사하는 훅 */
export const useMutationCopyProject = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, ProjectCopyRequestBody>
) => {
  return useMutation({
    mutationFn: (body) => postCopyProject(body),
    ...options,
  });
};
