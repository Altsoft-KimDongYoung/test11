import { API_URL } from '@/ondaji/constants/apiUrl';
import { Pagenation } from '@/ondaji/types/common';
import {
  BookmarkContentDTO,
  NewsCommonResponse,
  NoticeContentDTO,
  NoticeDetailParams,
  NoticeDetailResponse,
  NotificationContentDTO,
  NotificationDetailParams,
  SubscriptionContentDTO,
} from '@/ondaji/types/domain';

import { Fetch } from '../../common/method';

/** @NEWS 알림 조회 */
export const fetchNotification = async (params: Pagenation) => {
  const { data } = await Fetch<NewsCommonResponse<NotificationContentDTO[]>>(API_URL.NOTIFICATION, {
    params,
  });

  return data;
};

/** @NEWS 알림 상세 조회 */
export const fetchNotificationDetail = async (params: NotificationDetailParams) => {
  const { data } = await Fetch<NotificationContentDTO>(
    API_URL.NOTIFICATION_ID(params.notificationId),
    {
      params,
    }
  );

  return data;
};

/** @NEWS 공지사항 목록 조회 */
export const fetchNotice = async (params: Pagenation) => {
  const { data } = await Fetch<NewsCommonResponse<NoticeContentDTO[]>>(API_URL.NOTICE, {
    params,
  });

  return data;
};

/** @NEWS 공지사항 상세 조회 */
export const fetchNoticeDetail = async (params: NoticeDetailParams) => {
  const { data } = await Fetch<NoticeDetailResponse>(API_URL.NOTICE_ID(params.noticeId), {
    params,
  });

  return data;
};

/** @NEWS 북마크 목록 조회 */
export const fetchBookmark = async (params: Pagenation) => {
  const { data } = await Fetch<NewsCommonResponse<BookmarkContentDTO[]>>(
    API_URL.CONTENT.BOOKMARK_MY_LOCALBOX_PAGE,
    { params }
  );

  return data;
};

/** @NEWS 내가 구독중인 로컬박스 목록 조회 */
export const fetchSubscription = async (params: Pagenation) => {
  const { data } = await Fetch<NewsCommonResponse<SubscriptionContentDTO[]>>(
    API_URL.LOCALBOX.SUBSCRIPITION_MY,
    { params }
  );

  return data;
};
