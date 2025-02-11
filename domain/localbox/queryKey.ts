import {
  LocalboxListParams,
  LocalboxMyContentParams,
  LocalboxOtherContentParams,
} from '@/ondaji/types/domain';

export const localboxKeys = {
  all: ['localbox'] as const,
  myElement: () => [...localboxKeys.all, 'myElement'] as const,
  visitTown: () => [...localboxKeys.all, 'visitTown'] as const,
  ownLists: () => [...localboxKeys.all, 'ownLists'] as const,
  ownList: (params: LocalboxMyContentParams) =>
    [...localboxKeys.ownLists(), 'ownList', params] as const,
  otherLists: () => [...localboxKeys.all, 'otherLists'] as const,
  otherList: (params: LocalboxOtherContentParams) =>
    [...localboxKeys.otherLists(), 'otherList', params] as const,
  details: () => [...localboxKeys.all, 'detail'] as const,
  detail: (localboxId: number) => [...localboxKeys.details(), localboxId] as const,
  contentBeopPercentages: () => [...localboxKeys.all, 'contentBeopPercentage'] as const,
  contentBeopPercentage: (localboxId: number) =>
    [...localboxKeys.contentBeopPercentages(), localboxId] as const,
  topPinnedContents: () => [...localboxKeys.all, 'topPinnedContent'] as const,
  topPinnedContent: (localboxId: number) =>
    [...localboxKeys.topPinnedContents(), localboxId] as const,
  intro: (localboxId: number) => [...localboxKeys.all, 'intro', localboxId] as const,
  followers: (localboxId: number) => [...localboxKeys.all, 'followers', localboxId] as const,
  following: (localboxId: number) => [...localboxKeys.all, 'following', localboxId] as const,
  localboxLists: () => [...localboxKeys.all, 'localboxLists'] as const,
  localboxList: (params: LocalboxListParams) =>
    [...localboxKeys.localboxLists(), 'localboxList', params] as const,
  localboxOverview: () => [...localboxKeys.all, 'localboxOverview'] as const,
};
