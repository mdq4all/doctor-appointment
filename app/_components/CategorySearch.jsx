"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);

  const getCategorys = async () => {
    const res = await GlobalApi.getCategoryList();
    setCategoryList(res.categories);
  };

  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 mb-10">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <p className="text-gray-500 text-xl px-5">
        Search your Doctor and Book Appointment in one click
      </p>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="w-4 h-4 mr-2" /> Search
        </Button>
      </div>
      {/* Display categories */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
        {categoryList.length > 0
          ? categoryList.map(
              (category, index) =>
                index < 6 && (
                  <Link
                  href={`/search/${category.category}`}
                    key={category.id}
                    className="flex flex-col items-center bg-sky-100 p-2 rounded-md hover:scale-110 transition-all cursor-pointer"
                  >
                    <img
                      src={category?.icon?.url}
                      width={40}
                      height={40}
                      alt="icon"
                    />
                    <label className="capitalize text-primary">
                      {category.category}
                    </label>
                  </Link>
                )
            )
          : // Skeleton effect
            [1, 2, 3, 4, 5, 6].map((index) => (
              <div className="w-[100px] h-[100px] bg-slate-200 rounded-md animate-pulse" key={index}></div>
            ))}
      </div>
    </div>
  );
};

export default CategorySearch;
