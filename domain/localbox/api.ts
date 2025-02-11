import { API_URL } from '@/ondaji/constants/apiUrl';
import { AdministrativeDistrictPercentage } from '@/ondaji/types/common';
import {
  ContentPostingBody,
  LocalboxContentResponse,
  LocalboxDetailResponse,
  LocalboxFollowBody,
  LocalboxFollowersParams,
  LocalboxFollowersResponse,
  LocalboxFollowingParams,
  LocalboxFollowingResponse,
  LocalboxInfoResponse,
  LocalboxIntroResponse,
  LocalboxListParams,
  LocalboxListResponse,
  LocalboxMyContentParams,
  LocalboxOtherContentParams,
  LocalboxOverviewReponse,
  LocalboxTopPinnedContentDTO,
  SubscribeBody,
  VisitTownDTO,
} from '@/ondaji/types/domain';
import { convertURLtoFile } from '@/ondaji/utils/convertURLtoFile';

import { Delete, Fetch, Patch, Post } from '../../common/method';

/** ❌ 제거 예정 */
export const postLocalboxSubscription = async (body: SubscribeBody) => {
  const { data } = await Post<boolean>(API_URL.LOCALBOX.SUBSCRIPTION, body);

  return data;
};

/** @LOCALBOX 최근 동네 방문 이력 조회 */
export const fetchLocalboxRecentVisitTown = async () => {
  const { data } = await Fetch<VisitTownDTO[]>(API_URL.LOCALBOX.RECENT_VISIT_TOWN);

  return data;
};

/** @LOCALBOX 최근 동네 방문 이력 삭제 */
export const deleteLocalboxRecentVisitTown = async (visitTownId: number) => {
  const { data } = await Delete<boolean>(API_URL.LOCALBOX.RECENT_VISIT_TOWN_ID(visitTownId));

  return data;
};

/** @LOCALBOX 내 로컬박스 기본 정보 조회 */
export const fetchLocalboxInfo = async () => {
  const { data } = await Fetch<LocalboxInfoResponse>(API_URL.LOCALBOX.MY);

  const profileImgUrl = data.result?.localboxProfileImgUrl;
  const profileImg = profileImgUrl ? await convertURLtoFile(profileImgUrl) : null;

  return {
    ...data,
    result: {
      ...data.result,
      profileImg,
    },
  };
};

/** @LOCALBOX 내 로컬박스 기본 정보 수정 */
export const patchLocalboxInfo = async (body: FormData) => {
  const { data } = await Patch<boolean>(API_URL.LOCALBOX.MY, body, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });

  return data;
};

/** @LOCALBOX 로컬박스 상세 조회 */
export const fetchLocalboxDetail = async (localboxId: number) => {
  const { data } = await Fetch<LocalboxDetailResponse>(API_URL.LOCALBOX.DETAIL(localboxId));

  return data;
};

/** @LOCALBOX 로컬박스 법정동별 백분율 */
export const fetchLocalboxContentBeopPercentage = async (localboxId: number) => {
  const { data } = await Fetch<AdministrativeDistrictPercentage[]>(
    API_URL.LOCALBOX.CONTENT_BEOP_PERCENTAGE(localboxId)
  );

  return data;
};

/** @LOCALBOX 로컬박스 상단 고정 콘텐츠 목록 조회 */
export const fetchLocalboxTopPinnedContent = async (localboxId: number) => {
  const { data } = await Fetch<LocalboxTopPinnedContentDTO[]>(
    API_URL.LOCALBOX.TOP_GROUP_CONTENT_LIST(localboxId)
  );

  return data;
};

/** @LOCALBOX 타 로컬박스 콘텐츠 목록 조회 */
export const fetchLocalboxOtherContent = async (params: LocalboxOtherContentParams) => {
  const { data } = await Fetch<LocalboxContentResponse>(API_URL.LOCALBOX.YOUR_CONTENT, { params });

  return data;
};

/** @LOCALBOX 내 로컬박스 콘텐츠 목록 조회 */
export const fetchLocalboxMyContent = async (params: LocalboxMyContentParams) => {
  const { data } = await Fetch<LocalboxContentResponse>(API_URL.LOCALBOX.MY_CONTENT, { params });

  return data;
};

/** @LOCALBOX 콘텐츠 포스팅 신청(동광&동주 만들기) */
export const postContentPosting = async (body: ContentPostingBody) => {
  const { data } = await Post<boolean>(API_URL.CONTENT.POSTING, body);

  return data;
};

/** @LOCALBOX 콘텐츠 포스팅 해제(동광&동주 해제) */
export const deleteContentPosting = async (contentId: number) => {
  const { data } = await Delete<boolean>(API_URL.CONTENT.POSTING_DELETE(contentId));

  return data;
};

/** @LOCALBOX 상단고정 콘텐츠 등록 API */
export const postLocalboxTopGroupContent = async (contentId: number) => {
  const { data } = await Post<boolean>(API_URL.LOCALBOX.TOP_GROUP_CONTENT, {
    contentId,
  });

  return data;
};

/** @LOCALBOX 상단고정 콘텐츠 해제 API */
export const deleteLocalboxTopGroupContent = async (contentId: number) => {
  const { data } = await Delete<boolean>(API_URL.LOCALBOX.DELETE_TOP_GROUP_CONTENT(contentId));

  return data;
};

/** @LOCALBOX 로컬박스 팔로우 요청 */
export const postLocalboxFollow = async (body: LocalboxFollowBody) => {
  const { data } = await Post<boolean>(API_URL.LOCALBOX.FOLLOW, body);

  return data;
};

/** @LOCALBOX 로컬박스 소개글 조회 */
export const fetchLocalboxIntro = async (targetLocalboxId: number) => {
  const { data } = await Fetch<LocalboxIntroResponse>(API_URL.LOCALBOX.INTRO(targetLocalboxId));

  return data;
};

/** @LOCALBOX 로컬박스 팔로워 조회 */
export const fetchLocalboxFollowers = async (params: LocalboxFollowersParams) => {
  const { data } = await Fetch<LocalboxFollowersResponse>(
    API_URL.LOCALBOX.FOLLOWERS(params.targetLocalboxId),
    { params }
  );

  return data;
};

/** @LOCALBOX 로컬박스 팔로잉 조회 */
export const fetchLocalboxFollowing = async (params: LocalboxFollowingParams) => {
  const { data } = await Fetch<LocalboxFollowingResponse>(
    API_URL.LOCALBOX.FOLLOWING(params.targetLocalboxId),
    { params }
  );
  return data;
};

/** @LOCALBOX 로컬박스 목록 조회 */
export const fetchLocalboxList = async (params: LocalboxListParams) => {
  const { data } = await Fetch<LocalboxListResponse>(API_URL.LOCALBOX.LIST, { params });

  return data;
};

/** @LOCALBOX 로컬박스 닉네임 조회 */
export const fetchLocalboxOverview = async (targetLocalboxId: number) => {
  const { data } = await Fetch<LocalboxOverviewReponse>(
    API_URL.LOCALBOX.OVERVIEW_ID(targetLocalboxId)
  );

  return data;
};
