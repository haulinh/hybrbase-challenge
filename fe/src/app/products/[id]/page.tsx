import Image from "next/image";
import productAPI from "../api";
import { Filter } from "../components";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { color?: string; size?: string };
}) {
  const product = await productAPI.getDetail(params.id);


  const price = await productAPI.getPrice({
    id: params.id,
    size: searchParams.size,
    color: searchParams.color,
  });

  return (
    <div className="flex gap-8">
      <div>
        <div className="text-lg font-bold">{product.data.attributes.name}</div>
        <Image
          width={300}
          height={400}
          alt={product.data.attributes.name}
          unoptimized
          src={`${process.env.NEXT_PUBLIC_API_URL}${product.data.attributes.images.data[0].attributes.url}`}
        />
        <div className="font-bold mt-4">Price: {`${price ? price : 'No Price'}`}</div>
      </div>
      <div>
        <Filter />
      </div>
    </div>
  );
}
