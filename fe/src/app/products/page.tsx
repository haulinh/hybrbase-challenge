import { Suspense } from "react";
import { Filter } from "./components";
import { ProductList } from "./components/ProductList";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    color?: string;
    size?: string;
  };
}) => {
  return (
    <div className="flex">
      <div className="w-60">
        <Filter />
      </div>
      <div className="grow px-16">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsPage;
