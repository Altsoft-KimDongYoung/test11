export const qrKeys = {
  all: ['my'] as const,
  certifyType: () => [...qrKeys.all, 'certifyType'] as const,
  inMyTownCertifyOrganizationLists: () =>
    [...qrKeys.all, 'inMyTownCertifyOrganizationLists'] as const,
  inMyTownCertifyOrganizationList: () =>
    [...qrKeys.inMyTownCertifyOrganizationLists(), 'inMyTownCertifyOrganizationList'] as const,
  requestJoins: () => [...qrKeys.all, 'requestJoins'] as const,
  requestJoin: (organizationId: number) =>
    [...qrKeys.requestJoins(), 'requestJoin', { organizationId }] as const,
  myCertifyLists: () => [...qrKeys.all, 'myCertifyLists'] as const,
  myCertifyList: () => [...qrKeys.myCertifyLists(), 'myCertifyList'] as const,
  manageCertifyImages: () => [...qrKeys.all, 'manageCertifyImages'] as const,
  manageCertifyImage: () => [...qrKeys.myCertifyLists(), 'manageCertifyImage'] as const,
  organizationParentHierarchyLists: (organizationId: number) =>
    [...qrKeys.all, 'organizationParentHierarchyList', { organizationId }] as const,
  organizationParentHierarchyList: (organizationId: number) =>
    [...qrKeys.all, 'organizationParentHierarchyList', { organizationId }] as const,
  canCertifyJumins: () => [...qrKeys.all, 'canCertifyJumins'] as const,
  canCertifyJumin: () => [...qrKeys.canCertifyJumins(), 'canCertifyJumin'] as const,
  QRResidentCertificationStatus: (organizationId?: number) =>
    [...qrKeys.all, 'QRResidentCertificationStatus', organizationId] as const,
  organizationManagerById: (organizationId: number) =>
    [...qrKeys.all, 'organizationManager', organizationId] as const,
} as const;
