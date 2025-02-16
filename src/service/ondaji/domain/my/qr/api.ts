import { Delete, Fetch, Post } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  CertifyType,
  InMyTownCertifyOrganizationResponse,
  MyCertifyResponse,
  OrganizationManagerByIdResponse,
  OrganizationParentHierarchyListByIdResponse,
  OrganizationRequestJoinAddressRequestBody,
  QRCanCertifyJuminRequestParams,
  QRCertifyJuminRequestBody,
  QRManageCertifyImageResponse,
} from '@/ondaji/types/domain';

/** @MY QR 주민 인증 관리타입 조회 */
export const fetchManagementCertifyType = async () => {
  const { data } = await Fetch<CertifyType>(API_URL.QR.MANAGEMENT_CERTIFY_TYPE);

  return data;
};

/** @MY 주민인증 지도에서 내 동네 안에 있는 주민 인증할 수 있는 기관 정보 조회 */
export const fetchInMyTownCertifyOrganization = async () => {
  const { data } = await Fetch<InMyTownCertifyOrganizationResponse>(
    API_URL.ORGANIZATION.INMYTOWN_CERTIFY_ORGANIZATION
  );

  return data;
};

/** @MY 주민인증 지도에서 미가입 기관 클릭 시 가입 요청 건수 조회 */
export const fetchOrganizationRequestJoinNum = async (organizationId: number) => {
  const { data } = await Fetch<number>(API_URL.ORGANIZATION.REQUEST_JOIN(organizationId));

  return data;
};

/** @MY 주민인증 지도에서 미가입 기관에 대해 가입 요청 */
export const postOrganizationRequestJoin = async (organizationId: number) => {
  const { data } = await Post<boolean>(API_URL.ORGANIZATION.REQUEST_JOIN(organizationId));

  return data;
};

/** @MY QR 주민인증 지도에서 미가입 기관 주소 등록 */
export const postOrganizationRequestJoinAddress = async (
  body: OrganizationRequestJoinAddressRequestBody
) => {
  const { data } = await Post<boolean>(API_URL.ORGANIZATION.REQUEST_JOIN_ADDRESS, body);
  return data;
};

/** @MY 관공서, 아파트 유저 외에 모든 회원이 주민인증한 리스트 조회 */
export const fetchQRMyCertify = async () => {
  const { data } = await Fetch<MyCertifyResponse>(API_URL.QR.MY_CERTIFY);

  return data;
};

/** @MY 관공서(주민센터), 아파트 크리에이터가 관리하는 주민인증 QR 이미지 조회 */
export const fetchQRManageCertifyImage = async () => {
  const { data } = await Fetch<QRManageCertifyImageResponse>(API_URL.QR.MANAGEMENT_CERTIFY_IMAGE);
  return data;
};

/** @MY 부모 행정기관 조회(By organizationId) */
export const fetchOrganizationParentHierarchyListById = async (organizationId: number) => {
  const { data } = await Fetch<OrganizationParentHierarchyListByIdResponse>(
    API_URL.ORGANIZATION.PARENT_HIERARCHY_LIST_ID(organizationId)
  );

  return data;
};
/** @MY QR 스캔 직후, QR 인증이 가능한지 확인하기 위한 API */
export const fetchQRCanCertifyJumin = async (params: QRCanCertifyJuminRequestParams) => {
  const { data } = await Fetch<boolean>(API_URL.QR.CAN_CERTIFT_JUMIN, {
    params,
  });

  return data;
};

/** @MY QR 주민인증 */
export const postQRCertifyJumin = async (body: QRCertifyJuminRequestBody) => {
  const { data } = await Post<boolean>(API_URL.QR.CERTIFY_JUMIN, body);
  return data;
};

/** @MY QR 주민인증 삭제 */
export const deleteQRCertifyJumin = async (certifyId: number) => {
  const { data } = await Delete<boolean>(API_URL.QR.CERTIFY_JUMIN_CERTIFY_ID(certifyId));
  return data;
};

/** @MY QR 주민 인증 정보 존재 여부 조회 */
export const fetchQRResidentCertificationStatus = async (organizationId: number) => {
  const { data } = await Fetch<boolean>(API_URL.QR.EXIST_CERTIFY_JUMIN, {
    params: {
      organizationId,
    },
  });

  return data;
};

/** @MY 주민인증 가능 기관 클릭 시, organizationId로 기관정보 조회 */
export const fetchOrganizationManagerById = async (organizationId: number) => {
  const { data } = await Fetch<OrganizationManagerByIdResponse>(
    API_URL.ORGANIZATION.MANAGER_ID(organizationId)
  );
  return data;
};
