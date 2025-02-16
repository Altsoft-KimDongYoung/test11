import { Delete, Fetch, Patch, Post, Put } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  ApplyPayGroupBody,
  ApprovedSignageDevicesParams,
  ApprovedSignageDevicesResponse,
  CancelPayGroupDetailParams,
  CancelPayGroupDetailResponse,
  CancelPayGroupParams,
  DecisionInProgressGroupDetail,
  DecisionInProgressGroupDetailParams,
  DeleteDecisionInProgressGroupParams,
  DeleteSignageDeviceParams,
  NotPaidGroupParams,
  NotPaidGroupResponse,
  PaidSignageGroupParams,
  PaidSignageGroupResponse,
  PatchGroupDefaultProjectBody,
  PatchSignageDeviceNameBody,
  PatchSignageGroupNameParams,
  RenderTypeDevicePage,
  RenderTypeGroupPage,
  SignageDeviceSpecResponse,
  SignageGroupApplyHistoryParams,
  SignageGroupApplyHistoryResponse,
  SignageGroupDeleteParams,
  SignageGroupDetailInfoParams,
  SignageGroupDetailInfoResponse,
  SignageGroupDetailParams,
  SignageGroupDetailResponse,
  UseReApplyDeviceCanRegisterParams,
  UseReApplyDeviceCanRegisterResponse,
  WillPayGroupDetailParams,
  WillPayGroupDetailResponse,
} from '@/ondaji/types/domain';

/** @SIGNAGE 사이니지 기기등록시 선택할 수 있는 디바이스의 정보를 가져오는 API */
export const fetchSignageDeviceSpec = async () => {
  const { data } = await Fetch<SignageDeviceSpecResponse>(API_URL.SIGNAGES.SIGNAGE.DEVICE.SPEC);

  return data;
};

/** @SIGNAGE 사이니지 기기등록시 디바이스 이름의 중복을 확인하는 API */
export const fetchSignageDeviceNameDuplicateCheck = async (params: { deviceName: string }) => {
  const { data } = await Fetch<boolean>(API_URL.SIGNAGES.SIGNAGE.DEVICE.NAME_DUPLICATE_CHECK, {
    params,
  });

  return data;
};

/** @SIGNAGE 사이니지 기기등록시 디바이스 시리얼넘버의 중복을 확인하는 API */
export const fetchSignageDeviceSerialNumDuplicateCheck = async (params: { serialNum: string }) => {
  const { data } = await Fetch<boolean>(
    API_URL.SIGNAGES.SIGNAGE.DEVICE.SERIAL_NUM_DUPLICATE_CHECK,
    {
      params,
    }
  );

  return data;
};

/** @SIGNAGE 사이니지 기기 등록 하는 API */
export const postRegisterSignageDevice = async (body: FormData) => {
  const { data } = await Post<boolean>(API_URL.SIGNAGES.SIGNAGE.DEVICE.REGISTER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** @SIGNAGE 승인된 사이니지 기기목록을 불러오는 API */
export const fetchApprovedSignageDevices = async (params: ApprovedSignageDevicesParams) => {
  const { data } = await Fetch<ApprovedSignageDevicesResponse>(
    API_URL.SIGNAGES.SIGNAGE.DEVICE.APPROVED,
    {
      params,
    }
  );

  return data;
};

/** @SIGNAGE 승인된 사이니지 기기를 삭제하는 API */
export const deleteSignageDevice = async (params: DeleteSignageDeviceParams) => {
  const { deviceId } = params;
  const { data } = await Delete<boolean>(API_URL.SIGNAGES.SIGNAGE.DEVICE.DELETE(deviceId));

  return data;
};

/** @SIGNAGE 승인된 사이니지 기기의 이름을 변경하는 API */
export const patchSignageDeviceName = async (body: PatchSignageDeviceNameBody) => {
  const { data } = await Patch<boolean>(API_URL.SIGNAGES.SIGNAGE.DEVICE.PATCH_NAME, body);

  return data;
};

/** @SIGNAGE 사용자의 사이니지 기기 보유 상태에 따라 페이지를 분기처리하는 타입을 얻는 API */
export const fetchRenderTypeDevicePage = async () => {
  const { data } = await Fetch<RenderTypeDevicePage>(
    API_URL.SIGNAGES.SIGNAGE.DEVICE.RENDER_TYPE_PAGE
  );

  return data;
};

/** @SIGNAGE 사이니지 그룹을 등록하는 API */
export const postRegisterSignageGroup = async (body: FormData) => {
  const { data } = await Post<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.REGISTER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** @SIGNAGE 사용자가 그룹을 신청한 내역을 얻는 API */
export const fetchSignageGroupApplyHistory = async (params: SignageGroupApplyHistoryParams) => {
  const { data } = await Fetch<SignageGroupApplyHistoryResponse>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.APPLY_HISTORY,
    {
      params,
    }
  );

  return data;
};

/** @SIGNAGE 사용자가 그룹등록시 그룹이름이 중복되었는지 체크하는 API */
export const fetchSignageGroupNameDuplicateCheck = async (params: { groupName: string }) => {
  const { data } = await Fetch<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.NAME_DUPLICATE_CHECK, {
    params,
  });

  return data;
};

/**
 * @SIGNAGE 사용자의 현재 상태에 따라 그룹탭을 분기처리하기 위한 타입을 가져오는 API
 * NOT_EXISTENT_PAYMENT("결제 정보가 없음"),
 * NOT_EXISTENT_GROUP("사이니지 그룹이 없음"),
 * NOT_EXISTENT_APPROVED_GROUP("승인된 사이니지 그룹이 없음"),
 * NOT_EXISTENT_PAID_GROUP("결제된 사이니지 그룹이 없음"),
 * EXISTENT_GROUP("사이니지 그룹 존재"),
 */
export const fetchRenderTypeGroupPage = async () => {
  const { data } = await Fetch<RenderTypeGroupPage>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.RENDER_TYPE_PAGE
  );

  return data;
};

/** @SIGNAGE 결제된 사이니지 그룹의 목록을 받아오는 API */
export const fetchPaidSignageGroup = async (params: PaidSignageGroupParams) => {
  const { data } = await Fetch<PaidSignageGroupResponse>(API_URL.SIGNAGES.SIGNAGE.GROUP.PAID, {
    params,
  });

  return data;
};

/** @SIGNAGE 심사가 반려된 그룹의 신청을 취소하는 API */
export const deleteDecisionInProgressGroup = async (
  params: DeleteDecisionInProgressGroupParams
) => {
  const { approvalId } = params;

  const { data } = await Delete<boolean>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.DELETE_DECISION_IN_PROGRESS(approvalId)
  );

  return data;
};

/** @SIGNAGE 심사가 반려된 그룹의 재신청을 할때 기존에 신청한 정보를 받아오는 API */
export const fetchDecisionInProgressGroupDetail = async (
  params: DecisionInProgressGroupDetailParams
) => {
  const { approvalId } = params;

  const { data } = await Fetch<DecisionInProgressGroupDetail>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.DECISION_IN_PROGRESS_DETAIL(approvalId)
  );

  return data;
};

/** @SIGNAGE 그룹에 대한 정보를 얻는 API */
export const fetchSignageGroupDetail = async (params: SignageGroupDetailParams) => {
  const { groupId } = params;

  const { data } = await Fetch<SignageGroupDetailResponse>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.DETAIL(groupId),
    {
      params,
    }
  );

  return data;
};

/** @SIGNAGE 그룹 재신청할때 해당 그룹에 포함될 수 있는 디바이스들의 리스트를 기존 포함여부와 함께 조회하는 API  */
export const fetchUseReApplyDeviceCanRegister = async (
  params: UseReApplyDeviceCanRegisterParams
) => {
  const { groupId } = params;

  const { data } = await Fetch<UseReApplyDeviceCanRegisterResponse>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.USE_REAPPLY_DEVICE_CAN_REGISTER(groupId),
    {
      params,
    }
  );

  return data;
};

/** @SIGNAGE 그룹의 이름을 수정하는 API */
export const patchSignageGroupName = async (body: PatchSignageGroupNameParams) => {
  const { data } = await Patch<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.PATCH_NAME, body);

  return data;
};

/** @SIGNAGE 사이니지 그룹 재신청 API  */
export const putRegisterSignageGroup = async (body: FormData) => {
  const { data } = await Put<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.REGISTER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** @SIGNAGE 결제될 사이니지 그룹에 대한 정보를 얻는 API  */
export const fetchWillPayGroupDetail = async (params: WillPayGroupDetailParams) => {
  const { data } = await Fetch<WillPayGroupDetailResponse>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.WILL_PAY_DETAIL(params)
  );

  return data;
};

/** @SIGNAGE 사이니지 그룹 결제하는 API  */
export const postApplyPayGroup = async (body: ApplyPayGroupBody) => {
  const { data } = await Post<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.APPLY_PAY, body);

  return data;
};

/** @SIGNAGE 사이니지 그룹 삭제하는 API  */
export const deleteSignageGroup = async (params: SignageGroupDeleteParams) => {
  const { groupId } = params;

  const { data } = await Delete<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.DELETE(groupId));

  return data;
};

/** @SIGNAGE 결제 취소될 그룹의 정보를 가져오는 API */
export const fetchCancelPayGroupDetail = async (params: CancelPayGroupDetailParams) => {
  const { data } = await Fetch<CancelPayGroupDetailResponse>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.CANCEL_PAY_DETAIL(params.groupId)
  );

  return data;
};

/** @SIGNAGE 그룹 결제 서비스를 해지하는 API */
export const cancelPayGroup = async (params: CancelPayGroupParams) => {
  const { data } = await Put<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.CANCEL_PAY(params.groupId));

  return data;
};

/** @SIGNAGE 승인이 되었지만 결제는 되지 않은 그룹 데이터를 가져오는 API */
export const fetchNotPaidGroup = async (params: NotPaidGroupParams) => {
  const { data } = await Fetch<NotPaidGroupResponse>(API_URL.SIGNAGES.SIGNAGE.GROUP.NOT_PAID, {
    params,
  });

  return data;
};

/** @SIGNAGE 사이니지 그룹의 상세정보를 가져오는 API */
export const fetchSignageGroupDetailInfo = async (params: SignageGroupDetailInfoParams) => {
  const { data } = await Fetch<SignageGroupDetailInfoResponse>(
    API_URL.SIGNAGES.SIGNAGE.GROUP.DETAIL_INFO(params.groupId)
  );

  return data;
};

/** @SIGNAGE 사이니지 그룹의 기본 프로젝트를 변경하는 API */
export const patchGroupDefaultProject = async (body: PatchGroupDefaultProjectBody) => {
  const { data } = await Patch<boolean>(API_URL.SIGNAGES.SIGNAGE.GROUP.PATCH_DEFAULT_PROJECT, body);

  return data;
};
