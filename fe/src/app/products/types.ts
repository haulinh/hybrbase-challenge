export type Product = {
  name: string;
  images: {
    data: { id: string; attributes: { url: string } }[];
  };
};

export type Color = {
  name: string;
  value: string;
};

export type Size = {
  value: string;
};

export type PaginationType = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
