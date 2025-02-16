import { Fetch } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import { ContentBoxListParams, ContentBoxListResponse } from '@/ondaji/types/domain';

/** @MY 콘텐츠 보관함 목록 조회 */
export const fetchContentBoxList = async (params: ContentBoxListParams) => {
  const { data } = await Fetch<ContentBoxListResponse>(API_URL.MY.CONTENT_BOX.LIST, {
    params,
  });

  return data;
};
