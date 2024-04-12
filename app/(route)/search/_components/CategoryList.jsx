"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    const params = usePathname()
    const categoryItem = params.split('/')[2]
    
    const getCategorys = async () => {
        const res = await GlobalApi.getCategoryList();
        setCategoryList(res.categories);
    };
    
    useEffect(() => {
        getCategorys();
    }, []);

  return (
    <div className="h-screen pt-3 shadow-md">
      <Command>
        <CommandInput placeholder="search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((category) => (
                <CommandItem key={category.id}>
                  <Link
                    href={`/search/${category.category}`}
                    className={`flex items-center gap-2 p-2 capitalize text-primary cursor-pointer rounded-md text-sm w-full ${categoryItem === category.category && 'bg-blue-100'}`}
                  >
                    <img
                      src={category?.icon?.url}
                      width={25}
                      height={40}
                      alt="icon"
                    />
                    {category.category}
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
