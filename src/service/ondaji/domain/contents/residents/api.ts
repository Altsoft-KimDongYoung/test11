import { Fetch, Post, Put } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  ChildOrganizationDto,
  ChildOrganizationResponse,
  ContentListParams,
  ContentListResponse,
  ContentRegisterResponse,
} from '@/ondaji/types/domain';

/** @CONTENT 주민소식 목록 조회 api */
export const fetchContentMainResident = async (params?: ContentListParams) => {
  const { data } = await Fetch<ContentListResponse>(API_URL.CONTENT.RESIDENT_NEWS, { params });

  return data;
};

/** @CONTENT 주민소식 콘텐츠(모바일) 등록 api */
export const postContentResidentNews = async (body: FormData) => {
  const { data } = await Post<ContentRegisterResponse>(API_URL.CONTENT.RESIDENT_NEWS, body, {});
  return data.result;
};

/** @CONTENT 임시저장_주민소식 콘텐츠 등록 api */
export const postContentTempResidentNews = async (body: FormData) => {
  const { data } = await Post<number>(API_URL.CONTENT_TEMP.RESIDENT_NEWS, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** @CONTENT 임시저장_주민소식 콘텐츠 수정 api */
export const putContentTempResidentNews = async (body: FormData) => {
  const { data } = await Put<number>(API_URL.CONTENT_TEMP.RESIDENT_NEWS, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** @CONTENT 주민소식 등록 시 담당기관의 산하 기관 조회 api */
export const fetchLocalboxChildOrganization = async () => {
  const { data } = await Fetch<ChildOrganizationResponse>(API_URL.LOCALBOX.CHILD_ORGANIZATION);

  return data;
};

/** @CONTENT 주민소식 콘텐츠(모바일) 수정 api */
export const putContentResidentNews = async (body: FormData) => {
  const { data } = await Put<ContentRegisterResponse>(API_URL.CONTENT.RESIDENT_NEWS, body, {});
  return data.result;
};
