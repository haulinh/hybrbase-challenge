"use client";
import { cn } from "@/lib/utils";
import productAPI, { ColorResponse, SizeResponse } from "../api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export const Filter = () => {
  const searchParams = useSearchParams();
  const [colorResponse, setColorResponse] = useState<ColorResponse>();
  const [sizeResponse, setSizeResponse] = useState<SizeResponse>();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const [colorResponse, sizeResponse] = await Promise.all([
        productAPI.getColors(),
        productAPI.getSizes(),
      ]);
      setColorResponse(colorResponse);
      setSizeResponse(sizeResponse);
    };
    fetchData();
  }, []);

  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");

  return (
    <>
      <div className="flex gap-4">
        <div>Filter</div>
        <X
          className="text-gray-300 cursor-pointer"
          onClick={() => {
            replace(pathname);
          }}
        />
      </div>
      <div className="text-lg font-bold">Color</div>
      <div className="mt-4" />

      <div className="grid grid-cols-3 gap-4">
        {colorResponse?.data.map((color) => (
          <Link
            href={{
              query: {
                color: color.id,
                size: searchParams.get("size"),
              },
            }}
            className={cn("hover:bg-slate-100 rounded-lg cursor-pointer py-1", {
              "border border-current": color.id === Number(selectedColor),
            })}
            key={color.id}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                className={cn("w-6 h-6 rounded-full")}
                style={{ backgroundColor: color.attributes.value }}
              />
              <div>{color.attributes.name}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8" />
      <div className="text-lg font-bold">Size</div>
      <div className="mt-4" />
      <div className="grid grid-cols-3 gap-4">
        {sizeResponse?.data.map((size) => (
          <Link
            href={{
              query: {
                color: searchParams.get("color"),
                size: size.id,
              },
            }}
            className={cn(
              "hover:bg-slate-100 rounded-lg text-center px-4 py-4 border border-gray-200 cursor-pointer",
              {
                "border border-current": size.id === Number(selectedSize),
              }
            )}
            key={size.id}
          >
            {size.attributes.value}
          </Link>
        ))}
      </div>
    </>
  );
};
