import { ContentReplyListParams, HashTagListParams } from '@/ondaji/types/domain';

export const contentsKeys = {
  all: ['contents'] as const,
  temporary: () => [...contentsKeys.all, 'temporaryContents'] as const,
  bannerList: () => [...contentsKeys.all, 'banner'] as const,
  banner: (id: number) => [...contentsKeys.bannerList(), id] as const,
  temporaryContent: (contentTempId: number) =>
    [...contentsKeys.temporary(), contentTempId] as const,
  detail: (contentId: number) => [...contentsKeys.all, contentId] as const,
  comments: () => [...contentsKeys.all, 'comments'] as const,
  comment: (params: ContentReplyListParams) =>
    [...contentsKeys.comments(), params.contentId, params?.path, { ...params }] as const,
  contentCount: () => [...contentsKeys.all, 'contentCount'] as const,
  recentSearchKeyword: () => [...contentsKeys.all, 'recentSearchKeyword'] as const,
  subContentPostingCount: () => [...contentsKeys.all, 'subContentPostingCount'] as const,
  hashTag: (params: HashTagListParams) => [...contentsKeys.all, 'hashTag', { ...params }] as const,
} as const;
