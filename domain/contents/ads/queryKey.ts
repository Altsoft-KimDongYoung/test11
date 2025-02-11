export const adKeys = {
  all: ['residents'] as const,
  detail: (contentId: number) => [...adKeys.all, contentId] as const,
} as const;
