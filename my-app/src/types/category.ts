// Types for category API responses

export interface CategoryName {
  key: string;
  value: string;
}

export interface SubCategory {
  name: CategoryName;
  count: number;
}

export interface Category {
  name: CategoryName;
  count: number;
  subCategories: SubCategory[];
}

export interface CategoriesResponse {
  data: Category[];
}

// Types for parts list API response

export interface PartCategoryInfo {
  namespace?: string;
  scope?: string;
  category?: string;
  key: string;
  value: string;
}

export interface Part {
  id: string;
  mpn: unknown;
  manufacturer: unknown;
  description: unknown;
  categoryL1?: PartCategoryInfo;
  categoryL2?: PartCategoryInfo;
  categoryL3?: PartCategoryInfo;
  lifecycle?: unknown;
  availability?: unknown;
  countryOfOrigin?: unknown;
  riskScore?: unknown;
  riskLevel?: unknown;
  dataBits?: {
    lastActivityDate?: string;
    [key: string]: unknown;
  };
  parametric?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface PartsListResponse {
  data: {
    content: Part[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

// Filter for parts list API
export interface PartsListFilter {
  categoryL1Key: string;
  categoryL2Key?: string;
  categoryL3Key?: string;
}

// Category L1 keys
export const CATEGORY_L1_KEYS = {
  HARDWARE: 'category_l1.hardware',
  SEMICONDUCTOR: 'category_l1.semiconductor',
} as const;

export type CategoryL1Key = typeof CATEGORY_L1_KEYS[keyof typeof CATEGORY_L1_KEYS];
