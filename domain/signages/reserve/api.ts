import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  EditReserveRequestBody,
  ProjectCopyRequestBody,
  RegisterReserveRequestBody,
  ReservatedProject,
  ReservationDateListParams,
  ReservationDateListResponse,
  ReservationDetailResponse,
  ReservationListParams,
  ReserveDetailParams,
} from '@/ondaji/types/domain';

import { Delete, Fetch, Post, Put } from '../../../common/method';

/** @SIGNAGE 사이니지 프로젝트를 등록하는 API */
export const postRegisterReserve = async (body: RegisterReserveRequestBody) => {
  const { data } = await Post<boolean>(API_URL.SIGNAGES.RESERVE.REGISTER, body);

  return data;
};

/** @SIGNAGE 사이니지 프로젝트 예약 날짜 목록 데이터를 가져오는 API */
export const fetchReservationDateList = async (params: ReservationDateListParams) => {
  const { data } = await Fetch<ReservationDateListResponse>(
    API_URL.SIGNAGES.RESERVE.RESERVATION_DATE_LIST,
    {
      params,
    }
  );

  return data;
};

/** @SIGNAGE 사이니지 프로젝트 예약 목록 데이터를 가져오는 API */
export const fetchReservationList = async (params: ReservationListParams) => {
  const { data } = await Fetch<ReservatedProject[]>(API_URL.SIGNAGES.RESERVE.RESERVATION_LIST, {
    params,
  });

  return data;
};

/** @SIGNAGE 사이니지 프로젝트 예약 데이터를 삭제하는 API */
export const deleteReserve = async (reservationId: number) => {
  const { data } = await Delete<boolean>(API_URL.SIGNAGES.RESERVE.DELETE(reservationId));

  return data;
};

/** @SIGNAGE 사이니지 프로젝트 예약 상세 정보를 가져오는 API */
export const fetchReserveDetail = async (params: ReserveDetailParams) => {
  const { data } = await Fetch<ReservationDetailResponse>(
    API_URL.SIGNAGES.RESERVE.DETAIL(params.reservationId)
  );

  return data;
};

/** @SIGNAGE 사이니지 프로젝트 예약을 수정하는 API */
export const putReserve = async (body: EditReserveRequestBody) => {
  const { data } = await Put<boolean>(API_URL.SIGNAGES.RESERVE.EDIT, body);

  return data;
};

/** @SIGNAGE 사이니지 프로젝트를 복사하는 API */
export const postCopyProject = async (body: ProjectCopyRequestBody) => {
  const { data } = await Post<boolean>(API_URL.SIGNAGES.RESERVE.COPY, body);

  return data;
};
