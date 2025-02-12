import { Fetch, Put } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import { NotificationPermissionBody, NotificationPermissionResponse } from '@/ondaji/types/domain';

/** @MY 내 알림 권한 설정 정보 조회 */
export const fetchNotificationPermission = async () => {
  const { data } = await Fetch<NotificationPermissionResponse>(API_URL.NOTIFICATION_PERMISSION);

  return data;
};

/** @MY 내 알림 권한 설정 정보 조회 */
export const PutNotificationPermission = async (body: NotificationPermissionBody) => {
  const { data } = await Put<boolean>(API_URL.NOTIFICATION_PERMISSION, body);

  return data;
};
