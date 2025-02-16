import { DeviceRatio, User } from '@/ondaji/types/common';
import { NewsTabs, WillPayReciptInfo } from '@/ondaji/types/domain';

export const PATH = {
  ROOT: '/',
  NOT_FOUND: '/not-found',
  VILLAGES: {
    ROOT: '/villages',
    REGISTER: '/villages/register',
    DETAIL: (slug: number) => `/villages/detail/${slug}`,
    EDIT: (slug: number) => `/villages/edit/${slug}`,
  },
  RESIDENTS: {
    ROOT: '/residents',
    REGISTER: {
      ROOT: '/residents/register',
      MOBILE: '/residents/register/mobile',
      SIGNAGE: '/residents/register/signage',
      MIXED: '/residents/register/mixed',
    },
    ADD_REGISTER: (subContentType: string, contentId: number) =>
      `/residents/add-register/${subContentType}/${contentId}`,
    DETAIL: (slug: number) => `/residents/detail/${slug}`,
    EDIT: (slug: number) => `/residents/edit/${slug}`,
    RESIDENT_CERTIFICATION: {
      ROOT: '/residents/residentCertification',
      QR_SCAN: '/my/residentCertification/certify',
      LOCATION_REGISTER: '/residents/residentCertification/location-register',
    },
  },
  ADS: {
    REGISTER: {
      ROOT: '/ads/register',
      MOBILE: '/ads/register/mobile',
      SIGNAGE: '/ads/register/signage',
      MIXED: '/ads/register/mixed',
    },
    ADD_REGISTER: (subContentType: string, contentId: number) =>
      `/ads/add-register/${subContentType}/${contentId}`,
    DETAIL: (slug: number) => `/ads/detail/${slug}`,
    EDIT: (slug: number) => `/ads/edit/${slug}`,
  },
  AUTH: {
    LOGIN: '/auth/login',

    /**
     * TODO: 백엔드분과 논의 후 경로 변경이 필요합니다.
     */
    SOCIAL: '/auth/social',
    SOCIAL_LOGIN: '/auth/login/social',
    SIGNUP: {
      ROOT: '/auth/signup',
      MEMBER: '/auth/signup/member',
      BUSINESS: '/auth/signup/business',
      APARTMENT: '/auth/signup/apartment',
      GVMT: '/auth/signup/gvmt',
    },
    FIND_ACCOUNT: {
      ROOT: '/auth/find-account',
      MOBILE: '/auth/find-account/mobile',
      EMAIL: '/auth/find-account/email',
    },
    FIND_PASSWORD: {
      ROOT: '/auth/find-password',
      MOBILE: '/auth/find-password/mobile',
      EMAIL: '/auth/find-password/email',
    },
    BLACK_LIST: '/auth/black-list',
  },
  MY: {
    ROOT: '/my',
    LIST: '/my/list',
    PROFILE: (user?: User) => `/my/profile/${user}`,
    VILLAGES_SETTINGS: '/my/villages-settings',
    SETTINGS: {
      ROOT: '/my/settings',
      TERMS: {
        ROOT: '/my/settings/terms',
        SERVICE: '/my/settings/terms/service',
        PRIVACY: '/my/settings/terms/privacy',
        MARKETING: '/my/settings/terms/marketing',
        LOCATION: '/my/settings/terms/location',
        POLICY: '/my/settings/terms/policy',
      },
      LICENSE: '/my/settings/license',
      NOTIFICATION: '/my/settings/notification',
      WITHDRAW: '/my/settings/withdraw',
    },
    SIGNAGE_APP: {
      CODE: '/my/signage-app/code',
    },
    RESIDENT_CERTIFICATION: {
      ROOT: '/my/residentCertification',
      QR_SCAN: '/my/residentCertification/certify',
      LOCATION_REGISTER: '/my/residentCertification/location-register',
    },
    PAYMENT: `/my/payment`,
    CONTENTBOX: `/my/contentbox`,
  },
  SEARCH: '/search',
  LOCALBOX: {
    LIST: '/localbox/list',
    CONTENT_INSERT: (contentId: number) => `/localbox/list/insert/${contentId}`,
    CONTENT_REMOVE: (contentId: number) => `/localbox/list/remove/${contentId}`,
    DETAIL: (localboxId: number) => `/localbox/detail/${localboxId}`,
    EDIT: `/localbox/edit`,
    MENU: (localboxId: number) => `localbox/menu/${localboxId}`,
    MAP: (localboxId: number) => `/localbox/map/${localboxId}`,
    NAVIGATE_NAVER_MAP: (address: string) => `https://map.naver.com/p/search/${address}`,
    CONNECTIONS: {
      FOLLOWERS: (localboxId: number) => `/localbox/connections/followers/${localboxId}`,
      FOLLOWING: (localboxId: number) => `/localbox/connections/following/${localboxId}`,
    },
    SIGNAGE_OVERVIEW: '/localbox/signage-overview',
    CHECK_NEARBY: '/localbox/check-nearby',
  },
  NEWS: {
    ROOT: '/news',
    ROOT_TAB: (tab: NewsTabs) => `/news?tab=${tab}`,
    NOTIFICATION: {
      BLIND_APPLIED: (notificationId: number) =>
        `/news/notification/blind-applied/${notificationId}`,
      BLIND_REMOVED: (refId: number) => `/news/notification/blind-remove/${refId}`,
    },
    NOTICE: {
      DETAIL: (noticeId: number) => `/news/notice/detail/${noticeId}`,
    },
  },

  SEARCH_KEYWORD: (keyword: string) => `/search?keyword=${keyword}`,
  SIGNAGES: {
    SIGNAGE: {
      ROOT: '/signages/signage',
      ROOT_GROUP: `/signages/signage?signageSubTab=group`,
      ROOT_NO_GROUP: `/signages/signage?signageSubTab=noGroup`,
      MANUAL: '/signages/signage/manual',
      GUIDE: '/signages/signage/guide',
      PURCHASE: 'https://smartstore.naver.com/camel/products/729149942',
      REGISTER: '/signages/signage/register',
      REGISTER_COMPLETE: '/signages/signage/registerComplete',
      EDIT: (deviceId: number, deviceName: string) =>
        `/signages/signage/edit/${deviceId}/${deviceName}`,
      GROUP_REGISTER: {
        ROOT: '/signages/signage/group-register',
        EDIT: (slug: number) => `/signages/signage/group-register/edit/${slug}`,
        HISTORY: '/signages/signage/group-register-history',
      },
      GROUP_EDIT: (slug: number) => `/signages/signage/group-detail/${slug}`,
      GROUP_DETAIL: (slug: number, groupName: string) =>
        `/signages/signage/group-detail/${slug}/${groupName}`,
      PAYMENT: {
        ROOT: (slug: number) => `/signages/signage/payment/${slug}`,
        PENDING_PAYMENT: '/signages/signage/payment/pending-payment',
        COMPLETE: (query?: WillPayReciptInfo) =>
          `/signages/signage/payment/complete?deviceSumCount=${query?.deviceSumCount}&nextPaymentDateTime=${query?.nextPaymentDateTime}&paymentAmount=${query?.paymentAmount}`,
        CANCEL: (slug: number) => `/signages/signage/payment/cancel/${slug}`,
      },
      CANCEL: '/signages/signage/cancel',
    },
    PROJECT: {
      ROOT: '/signages/signage?tab=project',
      REGISTER: '/signages/project/register',
      EDIT: (slug: number) => `/signages/project/edit/${slug}`,

      DETAIL: (slug: number) => `/signages/project/${slug}`,
      PREVIEW: (slug: number) => `/signages/project/preview/${slug}`,
    },
    RESERVE: {
      REGISTER: (groupId: number, ratioType: DeviceRatio) =>
        `/signages/reserve/register/${groupId}/${ratioType}`,
      EDIT: (
        reservationId?: number,
        projectId?: number,
        ratioType?: DeviceRatio,
        groupId?: number
      ) => `/signages/reserve/edit/${reservationId}/${projectId}}/${ratioType}/${groupId}`,
      COPY: (projectId: number, groupId: number) =>
        `/signages/reserve/copy/${projectId}/${groupId}`,
      DETAIL: (groupId: number, ratioType: DeviceRatio) =>
        `/signages/reserve/detail/${groupId}/${ratioType}`,
    },
  },
} as const;
