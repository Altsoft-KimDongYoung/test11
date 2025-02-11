import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

import useIntersectionObserver from '@/ondaji/hooks/useIntersectionObserver';
import type { ApiResponse } from '@/ondaji/types/common';
import type {
  ApprovedSignageDevice,
  ApprovedSignageDevicesParams,
  ApprovedSignageDevicesResponse,
  CancelPayGroupDetailParams,
  CancelPayGroupDetailResponse,
  DecisionInProgressGroupDetail,
  DecisionInProgressGroupDetailParams,
  DeviceCanRegister,
  NotPaidGroup,
  NotPaidGroupParams,
  NotPaidGroupResponse,
  PaidSignageGroup,
  PaidSignageGroupParams,
  PaidSignageGroupResponse,
  PaySignageGroup,
  RenderTypeDevicePage,
  RenderTypeGroupPage,
  SignageDeviceSpec,
  SignageDeviceSpecResponse,
  SignageGroupApplyHistoryResponse,
  SignageGroupDetail,
  SignageGroupDetailInfoParams,
  SignageGroupDetailInfoResponse,
  SignageGroupDetailParams,
  SignageGroupDetailResponse,
  SignageGroupHistory,
  UseReApplyDeviceCanRegisterParams,
  UseReApplyDeviceCanRegisterResponse,
  WillPayGroupDetailParams,
  WillPayGroupDetailResponse,
  WillPayReciptInfo,
} from '@/ondaji/types/domain';

import {
  fetchApprovedSignageDevices,
  fetchCancelPayGroupDetail,
  fetchDecisionInProgressGroupDetail,
  fetchNotPaidGroup,
  fetchPaidSignageGroup,
  fetchRenderTypeDevicePage,
  fetchRenderTypeGroupPage,
  fetchSignageDeviceSpec,
  fetchSignageGroupApplyHistory,
  fetchSignageGroupDetail,
  fetchSignageGroupDetailInfo,
  fetchUseReApplyDeviceCanRegister,
  fetchWillPayGroupDetail,
} from './api';
import { signageKeys } from './queryKey';

/** @SIGNAGE 사이니지 기기등록시 선택할 수 있는 디바이스의 정보를 가져오는 훅 */
export const useQuerySignageDeviceSpec = <T = SignageDeviceSpec[]>(
  options?: UseQueryOptions<
    ApiResponse<SignageDeviceSpecResponse>,
    AxiosError,
    T,
    ReturnType<typeof signageKeys.device.device_spec>
  >
) => {
  return useQuery({
    queryKey: signageKeys.device.device_spec(),
    queryFn: fetchSignageDeviceSpec,
    select: (data) => data.result.content as T,
    ...options,
  });
};

/** @SIGNAGE 승인된 사이니지 기기목록을 불러오는 훅 */
export const useInfiniteQueryApprovedSignageDevices = <T = ApprovedSignageDevice[]>(
  params: Partial<
    Omit<ApprovedSignageDevicesParams, 'page'> & {
      callLocation: string;
    }
  > = {},
  options?: UseInfiniteQueryOptions<
    ApiResponse<ApprovedSignageDevicesResponse>,
    AxiosError,
    T,
    ApiResponse<ApprovedSignageDevicesResponse>,
    ReturnType<typeof signageKeys.device.approved_signage_devices>
  >
) => {
  const {
    groupRegYn = null,
    ratioType = null,
    powerOn = null,
    size = 10,
    callLocation = '',
  } = params;

  const query = useInfiniteQuery({
    queryKey: signageKeys.device.approved_signage_devices({
      groupRegYn,
      ratioType,
      powerOn,
      callLocation,
      size,
    }),
    queryFn: ({ pageParam }) =>
      fetchApprovedSignageDevices({
        page: pageParam as number,
        size,
        groupRegYn,
        ratioType,
        powerOn,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });

  const { hasNextPage, fetchNextPage } = query;

  const lastItemRef = useIntersectionObserver<HTMLLIElement>({
    fetchNextPage,
    hasNextPage,
    intersectionOptions: {
      rootMargin: '120px',
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    refetch: query.refetch,
    lastItemRef,
  };
};

/** @SIGNAGE 사용자의 사이니지 기기 보유 상태에 따라 페이지를 분기처리하는 타입을 얻는 훅 */
export const useQueryRenderTypeDevicePage = <T = RenderTypeDevicePage>(
  options?: UseQueryOptions<
    ApiResponse<RenderTypeDevicePage>,
    AxiosError,
    T,
    ReturnType<typeof signageKeys.device.render_type_device_page>
  >
) => {
  return useQuery({
    queryKey: signageKeys.device.render_type_device_page(),
    queryFn: fetchRenderTypeDevicePage,
    select: (data) => data.result as T,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 사용자가 그룹을 신청한 내역을 얻는 훅 */
export const useInfiniteQuerySignageGroupApplyHistory = <T = SignageGroupHistory[]>(
  options?: UseInfiniteQueryOptions<
    ApiResponse<SignageGroupApplyHistoryResponse>,
    AxiosError,
    T,
    ApiResponse<SignageGroupApplyHistoryResponse>,
    ReturnType<typeof signageKeys.group.group_apply_history>
  >
) => {
  return useInfiniteQuery({
    queryKey: signageKeys.group.group_apply_history(),
    queryFn: ({ pageParam }) =>
      fetchSignageGroupApplyHistory({
        page: pageParam as number,
        size: 1000,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * @SIGNAGE 사용자의 현재 상태에 따라 그룹탭을 분기처리하기 위한 타입을 가져오는 훅
 * NOT_EXISTENT_PAYMENT("결제 정보가 없음"),
 * NOT_EXISTENT_GROUP("사이니지 그룹이 없음"),
 * NOT_EXISTENT_APPROVED_GROUP("승인된 사이니지 그룹이 없음"),
 * NOT_EXISTENT_PAID_GROUP("결제된 사이니지 그룹이 없음"),
 * EXISTENT_GROUP("사이니지 그룹 존재"),
 */
export const useQueryRenderTypeGroupPage = <T = RenderTypeGroupPage>(
  options?: UseQueryOptions<
    ApiResponse<RenderTypeGroupPage>,
    AxiosError,
    T,
    ReturnType<typeof signageKeys.group.render_type_group_page>
  >
) => {
  return useQuery({
    queryKey: signageKeys.group.render_type_group_page(),
    queryFn: fetchRenderTypeGroupPage,
    select: (data) => data.result as T,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 결제된 사이니지 그룹의 목록을 받아오는 훅 */
export const useInfiniteQueryPaidSignageGroup = <T = PaidSignageGroup[]>(
  params: PaidSignageGroupParams = {},
  options?: UseInfiniteQueryOptions<
    ApiResponse<PaidSignageGroupResponse>,
    AxiosError,
    T,
    ApiResponse<PaidSignageGroupResponse>,
    ReturnType<typeof signageKeys.group.paid_signage_group>
  >
) => {
  const { size = 10, signageGroupPlayStatus = null } = params;

  return useInfiniteQuery({
    queryKey: signageKeys.group.paid_signage_group({
      size,
      signageGroupPlayStatus,
    }),
    queryFn: ({ pageParam }) =>
      fetchPaidSignageGroup({
        page: pageParam as number,
        size,
        signageGroupPlayStatus,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 심사가 반려된 그룹의 재신청을 할때 기존에 신청한 정보를 받아오는 훅 */
export const useQueryDecisionInProgressGroupDetail = <T = DecisionInProgressGroupDetail>(
  params: DecisionInProgressGroupDetailParams,
  options?: UseQueryOptions<
    ApiResponse<DecisionInProgressGroupDetail>,
    AxiosError,
    T,
    ReturnType<typeof signageKeys.group.decision_in_progress_group_detail>
  >
) => {
  return useQuery({
    queryKey: signageKeys.group.decision_in_progress_group_detail(params),
    queryFn: () => fetchDecisionInProgressGroupDetail(params),
    select: (data) => data.result as T,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 그룹에 대한 정보를 얻는 훅 */
export const useInfiniteQuerySignageGroupDetail = <T = SignageGroupDetail[]>(
  params: SignageGroupDetailParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<SignageGroupDetailResponse>,
      AxiosError,
      T,
      ApiResponse<SignageGroupDetailResponse>,
      ReturnType<typeof signageKeys.group.group_detail>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: signageKeys.group.group_detail({
      size: 10,
      groupId: params.groupId,
    }),
    queryFn: ({ pageParam }) =>
      fetchSignageGroupDetail({
        page: pageParam as number,
        size: 10,
        groupId: params.groupId,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 그룹 재신청할때 해당 그룹에 포함될 수 있는 디바이스들의 리스트를 기존 포함여부와 함께 조회하는 훅  */
export const useInfiniteQueryUseReApplyDeviceCanRegister = <T = DeviceCanRegister[]>(
  params: Omit<UseReApplyDeviceCanRegisterParams, 'page' | 'size'>,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<UseReApplyDeviceCanRegisterResponse>,
      AxiosError,
      T,
      ApiResponse<UseReApplyDeviceCanRegisterResponse>,
      ReturnType<typeof signageKeys.device.use_re_apply_devcie_can_register>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: signageKeys.device.use_re_apply_devcie_can_register({
      groupId: params.groupId,
      ratioType: params.ratioType,
    }),
    queryFn: ({ pageParam }) =>
      fetchUseReApplyDeviceCanRegister({
        page: pageParam as number,
        size: 1000,
        groupId: params.groupId,
        ratioType: params.ratioType,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 결제될 사이니지 그룹에 대한 정보를 얻는 훅  */
export const useQueryWillPayGroupDetail = <
  T = {
    signageGroupElementDtos: PaySignageGroup[];
    willPayReciptInfo: WillPayReciptInfo;
  }
>(
  params: WillPayGroupDetailParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<WillPayGroupDetailResponse>,
      AxiosError,
      T,
      ReturnType<typeof signageKeys.group.will_pay_signage_group_detail>
    >
  >
) => {
  return useQuery({
    queryKey: signageKeys.group.will_pay_signage_group_detail(params),
    queryFn: () => fetchWillPayGroupDetail(params),
    select: (data) => {
      return {
        signageGroupElementDtos: data.result.signageGroupElementDtos,
        willPayReciptInfo: {
          deviceSumCount: data.result.deviceSumCount,
          nextPaymentDateTime: data.result.nextPaymentDateTime,
          paymentAmount: data.result.paymentAmount,
        },
      } as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 결제 취소될 그룹의 정보를 가져오는 훅 */
export const useQueryCancelPayGroupDetail = <T = CancelPayGroupDetailResponse>(
  params: CancelPayGroupDetailParams,
  options?: UseQueryOptions<
    ApiResponse<CancelPayGroupDetailResponse>,
    AxiosError,
    T,
    ReturnType<typeof signageKeys.group.cancel_pay_signage_group_detail>
  >
) => {
  return useQuery({
    queryKey: signageKeys.group.cancel_pay_signage_group_detail(params),
    queryFn: () => fetchCancelPayGroupDetail(params),
    select: (data) => {
      return data.result as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 승인이 되었지만 결제는 되지 않은 그룹 데이터를 가져오는 훅 */
export const useInfiniteQueryNotPaidGroup = <T = NotPaidGroup[]>(
  params: Omit<NotPaidGroupParams, 'page' | 'size'>,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<NotPaidGroupResponse>,
      AxiosError,
      T,
      ApiResponse<NotPaidGroupResponse>,
      ReturnType<typeof signageKeys.group.not_paid_group>
    >
  >
) => {
  const size = 100;

  return useInfiniteQuery({
    queryKey: signageKeys.group.not_paid_group({
      size,
    }),
    queryFn: ({ pageParam }) =>
      fetchNotPaidGroup({
        page: pageParam as number,
        size,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/** @SIGNAGE 사이니지 그룹의 상세정보를 가져오는 훅 */
export const useQuerySignageGroupDetailInfo = <T = SignageGroupDetailInfoResponse>(
  params: SignageGroupDetailInfoParams,
  options?: UseQueryOptions<
    ApiResponse<SignageGroupDetailInfoResponse>,
    AxiosError,
    T,
    ReturnType<typeof signageKeys.group.group_detail_info>
  >
) => {
  return useQuery({
    queryKey: signageKeys.group.group_detail_info(params),
    queryFn: () => fetchSignageGroupDetailInfo(params),
    select: (data) => data.result as T,
    ...options,
  });
};
