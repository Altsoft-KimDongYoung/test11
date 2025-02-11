export const signageAppKeys = {
  all: ['signageApp'] as const,
  pinCode: () => [...signageAppKeys.all, 'pinCode'] as const,
} as const;
