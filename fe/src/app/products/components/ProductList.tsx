import Image from "next/image";
import productAPI from "../api";
import Link from "next/link";

export const ProductList = async ({
  searchParams,
}: {
  searchParams: {
    color?: string;
    size?: string;
  };
}) => {
  const productsResponse = await productAPI.getProducts({
    color: searchParams.color,
    size: searchParams.size,
  });

  if (productsResponse.data.length === 0) {
    return <>Nodata</>;
  }

  return (
    <div>
      <div className="text-lg font-bold">Product List</div>
      <div className="mt-4 grid grid-cols-3">
        {productsResponse.data.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="text-base font-bold mb-4" key={product.id}>
              {product.attributes.name}
            </div>
            <Image
              width={300}
              height={400}
              alt={product.attributes.name}
              unoptimized
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.attributes.images.data[0].attributes.url}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
