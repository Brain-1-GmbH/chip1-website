import axios from 'axios';
import type {
  CategoriesResponse,
  PartsListResponse,
  PartsListFilter,
  CategoryL1Key,
} from '../types/category';
import { CATEGORY_L1_KEYS } from '../types/category';

// Use proxy path in dev (avoids CORS); direct URL in prod
const API_BASE_URL = import.meta.env.DEV
  ? '/api/part/public/parts'
  : 'https://my.chip1.com/api/part/public/parts';

/**
 * Fetch categories for Hardware or Semiconductors
 */
export const fetchCategories = async (
  categoryL1Key: CategoryL1Key
): Promise<CategoriesResponse> => {
  const response = await axios.get<CategoriesResponse>(
    `${API_BASE_URL}/categories`,
    {
      params: {
        categoryL1Key,
      },
    }
  );
  return response.data;
};

/**
 * Fetch hardware categories
 */
export const fetchHardwareCategories = () =>
  fetchCategories(CATEGORY_L1_KEYS.HARDWARE);

/**
 * Fetch semiconductor categories
 */
export const fetchSemiconductorCategories = () =>
  fetchCategories(CATEGORY_L1_KEYS.SEMICONDUCTOR);

/**
 * Fetch parts list with filters
 */
export const fetchPartsList = async (
  filter: PartsListFilter,
  page: number = 0,
  size: number = 24,
  sort: string = 'dataBits.lastActivityDate,desc'
): Promise<PartsListResponse> => {
  const response = await axios.get<PartsListResponse>(`${API_BASE_URL}/list`, {
    params: {
      size,
      page,
      filter: JSON.stringify(filter),
      sort,
    },
  });
  const raw = response.data as Record<string, unknown>;
  const dataObj = raw?.data;
  // API may return { data: { content: [...] } } OR { data: [...] } OR { content: [...] }
  let content: unknown[] = [];
  if (Array.isArray(dataObj)) {
    content = dataObj;
  } else if (dataObj && typeof dataObj === 'object' && 'content' in (dataObj as object)) {
    const c = (dataObj as { content: unknown }).content;
    content = Array.isArray(c) ? c : [];
  } else if (raw?.content && Array.isArray(raw.content)) {
    content = raw.content;
  }
  const pageData = (dataObj && typeof dataObj === 'object' ? dataObj : raw) as Record<string, unknown>;
  // API returns totalCount (not totalElements); compute totalPages from totalCount/size when not provided
  const totalElements = (pageData?.totalElements as number) ?? (raw?.totalElements as number) ?? (raw?.totalCount as number) ?? 0;
  const totalPages = (pageData?.totalPages as number) ?? (raw?.totalPages as number) ?? (totalElements > 0 ? Math.ceil(totalElements / size) : 0);
  const pageNum = (pageData?.number as number) ?? (raw?.number as number) ?? page;
  const pageSizeVal = (pageData?.size as number) ?? (raw?.size as number) ?? size;
  const first = (pageData?.first as boolean) ?? (raw?.first as boolean) ?? pageNum === 0;
  const last = (pageData?.last as boolean) ?? (raw?.last as boolean) ?? pageNum >= totalPages - 1;
  const empty = content.length === 0;
  return {
    data: { content, totalElements, totalPages, size: pageSizeVal, number: pageNum, first, last, empty },
  };
};

/**
 * Build filter object for parts list
 */
export const buildPartsFilter = (
  categoryL1Key: string,
  categoryL2Key?: string,
  categoryL3Key?: string
): PartsListFilter => {
  const filter: PartsListFilter = { categoryL1Key };
  
  if (categoryL2Key) {
    filter.categoryL2Key = categoryL2Key;
  }
  
  if (categoryL3Key) {
    filter.categoryL3Key = categoryL3Key;
  }
  
  return filter;
};
