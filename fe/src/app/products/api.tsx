import apiClient from "@/lib/api-client";
import { Product, Color, PaginationType, Size } from "./types";
import qs from "qs";

export type ColorResponse = {
  data: {
    id: number;
    attributes: Color;
  }[];
  meta: {
    pagination: PaginationType;
  };
};

export type SizeResponse = {
  data: {
    id: number;
    attributes: Size;
  }[];
  meta: {
    pagination: PaginationType;
  };
};

export type ProductsResponse = {
  data: {
    id: number;
    attributes: Product;
  }[];
  meta: {
    pagination: PaginationType;
  };
};

export type ProductResponse = {
  data: {
    id: number;
    attributes: Product;
  };
  meta: {
    pagination: PaginationType;
  };
};

const productAPI = {
  getProducts: async ({ color, size }: { color?: string; size?: string }) => {
    const query = qs.stringify(
      {
        filters: {
          product_variation: {
            color: {
              $eq: color,
            },
            size: {
              $eq: size,
            },
          },
        },
        populate: {
          images: {
            fields: ["url"],
          },
        },
      },
      { encodeValuesOnly: true }
    );
    const response = await apiClient.get<ProductsResponse>(
      `/products?${query}`
    );
    return response.data;
  },

  getDetail: async (id: string) => {
    const query = qs.stringify({
      populate: {
        images: {
          fields: ["url"],
        },
      },
    });
    const response = await apiClient.get<ProductResponse>(
      `/products/${id}?${query}`
    );
    return response.data;
  },

  getPrice: async (params: { id?: string; size?: string; color?: string }) => {
    const query = qs.stringify({
      filters: {
        product: {
          $eq: params.id,
        },
        size: {
          $eq: params.size,
        },
        color: {
          $eq: params.color,
        },
      },
    });
    const response = await apiClient.get(`/product-variations?${query}`);
    return response?.data?.data?.[0]?.attributes?.price;
  },

  getColors: async () => {
    const query = qs.stringify({ fields: ["value", "name"] });
    const response = await apiClient.get<ColorResponse>(`/colors?${query}`);
    return response.data;
  },

  getSizes: async () => {
    const query = qs.stringify({ fields: ["value"] });
    const response = await apiClient.get<SizeResponse>(`/sizes?${query}`);
    return response.data;
  },
};

export default productAPI;
