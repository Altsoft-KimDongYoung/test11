export const myProfileKeys = {
  all: ['my'] as const,
  details: () => [...myProfileKeys.all, 'details'] as const,
  detail: () => [...myProfileKeys.all, myProfileKeys.details()] as const,
} as const;
