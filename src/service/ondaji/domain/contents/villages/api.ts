import { Fetch, Post, Put } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  ComplainCanContentLocalityResponse,
  ComplainContentLocalityBody,
  ContentDisplayAreaInfo,
  ContentDisplayAreaParams,
  ContentListParams,
  ContentListResponse,
  ContentRegisterResponse,
  VillageNewsPutResponse,
} from '@/ondaji/types/domain';

// 🔥 공통으로 옮겨야 하나?
/** @CONTENT 로컬박스 동네 영역 조회 api */
export const fetchLocalboxMyTown = async () => {
  const { data } = await Fetch<string>(API_URL.LOCALBOX.MY_TOWN);

  return data;
};

/** @CONTENT 콘텐츠 노출 지역 조회 api (지도의 좌표를 기준으로 노출 지역과 주변 지역 개수 조회) */
export const fetchContentDisplayArea = async (params: ContentDisplayAreaParams) => {
  const { data } = await Fetch<ContentDisplayAreaInfo>(API_URL.CONTENT.DISPLAY_AREA, {
    params,
  });
  return data;
};

/** @CONTENT 동네소식 목록 조회 api */
export const fetchContentMainVillage = async (params?: ContentListParams) => {
  const { data } = await Fetch<ContentListResponse>(API_URL.CONTENT.VILLAGE_NEWS, { params });

  return data;
};

/** @CONTENT 동네소식 등록 api */
export const postContentVillageNews = async (body: string) => {
  const { data } = await Post<ContentRegisterResponse>(API_URL.CONTENT.VILLAGE_NEWS, body, {});
  return data.result;
};

/** @CONTENT 임시저장_동네소식 콘텐츠 등록 api */
export const postContentTempVillageNews = async (body: FormData) => {
  const { data } = await Post<number>(API_URL.CONTENT_TEMP.VILLAGE_NEWS, body, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });

  return data;
};

/** @CONTENT 임시저장_동네소식 콘텐츠 수정 api */
export const putContentTempVillageNews = async (body: FormData) => {
  const { data } = await Put<number>(API_URL.CONTENT_TEMP.VILLAGE_NEWS, body, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });

  return data;
};

/** @CONTENT 동네소식 수정 api */
export const putContentVillageNews = async (body: FormData) => {
  const { data } = await Put<VillageNewsPutResponse>(API_URL.CONTENT.VILLAGE_NEWS, body, {});

  return data.result;
};

/** @CONTENT 콘텐츠 지역성 신고 가능 여부 api */
export const fetchComplainCanContentLocality = async (contentId: number) => {
  const { data } = await Fetch<ComplainCanContentLocalityResponse>(
    API_URL.COMPLAIN.CAN_CONTENT_LOCALITY(contentId)
  );

  return data;
};

/** @CONTENT 콘텐츠 지역성 신고 api */
export const postComplainContentLocality = async (body: ComplainContentLocalityBody) => {
  const { data } = await Post<boolean>(API_URL.COMPLAIN.CONTENT_LOCALITY, body);

  return data;
};
