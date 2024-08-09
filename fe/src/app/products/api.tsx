import apiClient from "@/libs/api-client";
import { Product } from "./types";

const productAPI = {
  getProducts: async () => {
    console.log({ baseUrl: apiClient.defaults.baseURL });
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  },
};

export default productAPI;
