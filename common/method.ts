import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiResponse } from '@/ondaji/types/common';

import { ax } from './axios';

export const Fetch = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await ax.get(url, config);

  return response;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await ax.post(url, data, config);

  return response;
};

export const Delete = async <T>(
  url: string,
  data?: any
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await ax.delete(url, data);

  return response;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await ax.patch(url, data, config);

  return response;
};

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await ax.put(url, data, config);

  return response;
};
