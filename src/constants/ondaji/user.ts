export const USER_STORAGE_KEY = 'ONDAJI_USER' as const;
export const IS_CHECKED_AUTO_LOGIN = 'isCheckedAutoLogin' as const;

export const USER = {
  member: 'member',
  business: 'business',
  apartment: 'apartment',
  gvmt: 'gvmt',
} as const;

export const USER_TYPE = {
  USER_MEMBER: 'USER_MEMBER',
  USER_BUSINESS: 'USER_BUSINESS',
  USER_APARTMENT: 'USER_APARTMENT',
  USER_GVMT: 'USER_GVMT',
} as const;

export const USER_TYPE_LABEL = {
  USER_MEMBER: '일반 회원',
  USER_BUSINESS: '기업 회원',
  USER_APARTMENT: '아파트관리 회원',
  USER_GVMT: '관공서 회원',
} as const;

export const LOCALBOX_CREATOR_TYPE = {
  LOCALBOX_MEMBER: 'LOCALBOX_MEMBER',
  LOCALBOX_BUSINESS: 'LOCALBOX_BUSINESS',
  LOCALBOX_GVMT: 'LOCALBOX_GVMT',
  LOCALBOX_APARTMENT: 'LOCALBOX_APARTMENT',
} as const;

export const USER_ROLES = {
  ROLE_USER: 'ROLE_USER',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_BLACK_LIST: 'ROLE_BLACK_LIST',
} as const;
