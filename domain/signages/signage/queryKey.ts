import {
  ApprovedSignageDevicesParams,
  CancelPayGroupDetailParams,
  DecisionInProgressGroupDetailParams,
  NotPaidGroupParams,
  PaidSignageGroupParams,
  SignageGroupDetailInfoParams,
  SignageGroupDetailParams,
  UseReApplyDeviceCanRegisterParams,
} from '@/ondaji/types/domain';

export const signageKeys = {
  device: {
    all: ['signage', 'device'] as const,
    device_spec: () => [...signageKeys.device.all, 'device_spec'] as const,
    render_type_device_page: () => [...signageKeys.device.all, 'render_type_device_page'] as const,
    approved_signage_devices: (
      params: Omit<ApprovedSignageDevicesParams, 'page'> & {
        callLocation: string;
      }
    ) => [...signageKeys.device.all, 'approved_signage_devices', { ...params }] as const,
    use_re_apply_devcie_can_register: (
      params: Omit<UseReApplyDeviceCanRegisterParams, 'page' | 'size'>
    ) => [...signageKeys.device.all, 'use_re_apply_devcie_can_register', { ...params }] as const,
  },
  group: {
    all: ['signage', 'group'] as const,
    group_apply_history: () => [...signageKeys.group.all, 'group_apply_history'] as const,
    not_paid_group: (params: Omit<NotPaidGroupParams, 'page'>) =>
      [...signageKeys.group.all, 'not_paid_group', { ...params }] as const,
    render_type_group_page: () => [...signageKeys.group.all, 'render_type_group_page'] as const,
    paid_signage_group: (params: PaidSignageGroupParams) =>
      [...signageKeys.group.all, 'paid_signage_group', { ...params }] as const,
    group_detail: (params: Omit<SignageGroupDetailParams, 'page' | 'null'>) =>
      [...signageKeys.group.all, 'group_detail', { ...params }] as const,
    group_detail_info: (params: SignageGroupDetailInfoParams) =>
      [...signageKeys.group.all, 'group_detail', { ...params }] as const,
    decision_in_progress_group_detail: (params: DecisionInProgressGroupDetailParams) =>
      [...signageKeys.group.all, 'decision_in_progress_group_detail', { ...params }] as const,
    will_pay_signage_group_detail: (params: string[]) =>
      [...signageKeys.group.all, 'will_pay_signage_group_detail', { ...params }] as const,
    cancel_pay_signage_group_detail: (params: CancelPayGroupDetailParams) =>
      [...signageKeys.group.all, 'cancel_pay_signage_group_detail', { ...params }] as const,
  },
};
