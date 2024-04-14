import { ApiResData, ApiResPaginated } from '@weavcraft/common';

export const apiResData = <T>(
  data: T | null,
  status = 200,
  success = true,
): ApiResData<T> => {
  return {
    success,
    status,
    data: data ?? null,
  };
};

export const apiResDataList = <T>(
  data: T[],
  status = 200,
  success = true,
): ApiResData<T> => {
  return {
    success,
    status,
    data,
  };
};

export const apiResPaginated = <T>(
  data: T[],
  total: number,
  status = 200,
  success = true,
): ApiResPaginated<T> => {
  return {
    success,
    status,
    total,
    data,
  };
};
