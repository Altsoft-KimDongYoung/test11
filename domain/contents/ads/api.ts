import { Post, Put } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import { ContentRegisterResponse } from '@/ondaji/types/domain';

/** @CONTENT 광고 콘텐츠(모바일) 등록 api */
export const postContentAd = async (body: FormData) => {
  const { data } = await Post<ContentRegisterResponse>(API_URL.CONTENT.AD, body, {});
  return data.result;
};

/** @CONTENT 임시저장_광고 콘텐츠 등록 api */
export const postContentTempAd = async (body: FormData) => {
  const { data } = await Post<number>(API_URL.CONTENT_TEMP.AD, body, {});

  return data;
};

/** @CONTENT 임시저장_광고 콘텐츠 수정 api */
export const putContentTempAd = async (body: FormData) => {
  const { data } = await Put<number>(API_URL.CONTENT_TEMP.AD, body, {});

  return data;
};

/** @CONTENT 광고 콘텐츠 수정 api */
export const putContentAd = async (body: FormData) => {
  const { data } = await Put<ContentRegisterResponse>(API_URL.CONTENT.AD, body, {});
  return data.result;
};
