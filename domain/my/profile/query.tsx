import { AxiosError } from 'axios';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useCallback } from 'react';

import type { ApiResponse } from '@/ondaji/types/common';
import {
  ApartmentMemberProfileDTO,
  ApartmentMemberProfileForm,
  BusinessMemberProfileDTO,
  BusinessMemberProfileForm,
  FetchMyProfileResponse,
  GVMTMemberProfileDTO,
  GVMTMemberProfileForm,
  MemberProfileDTO,
  MemberProfileForm,
  MyPage,
} from '@/ondaji/types/domain';
import { formatHyphenPhoneNumber } from '@/ondaji/utils/number';

import {
  fetchApartmentMemberProfile,
  fetchBusinessMemberProfile,
  fetchGVMTMemberProfile,
  fetchMemberProfile,
} from './api';
import { myProfileKeys } from './queryKey';

/** @MY 일반회원 마이페이지 */
export const useQueryMyPage = (
  options?: UseQueryOptions<
    ApiResponse<FetchMyProfileResponse>,
    AxiosError,
    MyPage,
    ReturnType<typeof myProfileKeys.detail>
  >
) => {
  return useQuery({
    queryKey: myProfileKeys.detail(),
    queryFn: () => fetchMemberProfile(),
    select: useCallback(({ result }: { result: FetchMyProfileResponse }) => {
      const { localboxName, localboxProfileImgUrl, loginId } = result as MemberProfileDTO;

      return {
        localboxProfileImgUrl,
        loginId,
        nickname: localboxName,
      };
    }, []),
    ...options,
  });
};

/** @My 일반회원 프로필 상세 조회 */
export const useQueryMemberProfile = (
  options?: UseQueryOptions<
    ApiResponse<FetchMyProfileResponse>,
    AxiosError,
    MemberProfileForm,
    ReturnType<typeof myProfileKeys.detail>
  >
) => {
  return useQuery({
    queryKey: myProfileKeys.detail(),
    queryFn: () => fetchMemberProfile(),
    select: useCallback(({ result }: { result: FetchMyProfileResponse }) => {
      const { localboxName, localboxProfileImgUrl, loginId, mobile, profileImg, email } =
        result as MemberProfileDTO;

      return {
        profileImg,
        loginId,
        localboxProfileImgUrl,
        nickname: localboxName,
        name: '',
        currentPhoneNumber: formatHyphenPhoneNumber(mobile),
        newPhoneNumber: '',
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
        currentEmail: email,
        newEmail: '',
      };
    }, []),
    ...options,
  });
};

/** @MY 기업회원 프로필 상세 조회 */
export const useQueryBusinessMemberProfile = (
  options?: UseQueryOptions<
    ApiResponse<FetchMyProfileResponse>,
    AxiosError,
    BusinessMemberProfileForm,
    ReturnType<typeof myProfileKeys.detail>
  >
) => {
  return useQuery({
    queryKey: myProfileKeys.detail(),
    queryFn: () => fetchBusinessMemberProfile(),
    select: useCallback(({ result }: { result: FetchMyProfileResponse }) => {
      const {
        profileImg,
        localboxName,
        localboxProfileImgUrl,
        loginId,
        mobile,
        businessLicenseFileInfo,
        businessName,
        businessNumber,
        businessOpenDt,
        email,
        ownerName,
        serviceName,
        homepageUrl,
        licenseFile,
      } = result as BusinessMemberProfileDTO;

      return {
        loginId,
        localboxProfileImgUrl,
        businessLicenseFileInfo,
        businessName,
        businessNumber,
        businessOpenDt,
        ownerName,
        serviceName,
        homepageUrl,
        profileImg,
        nickname: localboxName,
        name: '',
        currentPhoneNumber: formatHyphenPhoneNumber(mobile),
        newPhoneNumber: '',
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
        currentEmail: email,
        newEmail: '',
        licenseFile,
      };
    }, []),
    ...options,
  });
};

/** @MY 아파트 회원 프로필 상세 조회 */
export const useQueryApartmentMemberProfile = (
  options?: UseQueryOptions<
    ApiResponse<FetchMyProfileResponse>,
    AxiosError,
    ApartmentMemberProfileForm,
    ReturnType<typeof myProfileKeys.detail>
  >
) => {
  return useQuery({
    queryKey: myProfileKeys.detail(),
    queryFn: () => fetchApartmentMemberProfile(),
    select: useCallback(({ result }: { result: FetchMyProfileResponse }) => {
      const {
        profileImg,
        localboxName,
        localboxProfileImgUrl,
        loginId,
        mobile,
        employmentFileInfo,
        organizationName,
        homepageUrl,
        email,
        ownerName,
        employmentFile,
      } = result as ApartmentMemberProfileDTO;

      return {
        loginId,
        localboxProfileImgUrl,
        employmentFileInfo,
        organizationName,
        ownerName,
        profileImg,
        nickname: localboxName,
        name: '',
        currentPhoneNumber: formatHyphenPhoneNumber(mobile),
        newPhoneNumber: '',
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
        currentEmail: email,
        newEmail: '',
        employmentFile,
        homepageUrl,
      };
    }, []),
    ...options,
  });
};

/** @MY 관공서 회원 프로필 상세 조회 */
export const useQueryGVMTMemberProfile = (
  options?: UseQueryOptions<
    ApiResponse<FetchMyProfileResponse>,
    AxiosError,
    GVMTMemberProfileForm,
    ReturnType<typeof myProfileKeys.detail>
  >
) => {
  return useQuery({
    queryKey: myProfileKeys.detail(),
    queryFn: () => fetchGVMTMemberProfile(),
    select: useCallback(({ result }: { result: FetchMyProfileResponse }) => {
      const {
        profileImg,
        localboxName,
        localboxProfileImgUrl,
        loginId,
        mobile,
        employmentFileInfo,
        organizationName,
        email,
        contactName,
        employmentFile,
      } = result as GVMTMemberProfileDTO;

      return {
        loginId,
        localboxProfileImgUrl,
        employmentFileInfo,
        organizationName,
        contactName,
        profileImg,
        nickname: localboxName,
        name: '',
        currentPhoneNumber: formatHyphenPhoneNumber(mobile),
        newPhoneNumber: '',
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
        currentEmail: email,
        newEmail: '',
        employmentFile,
      };
    }, []),
    ...options,
  });
};
