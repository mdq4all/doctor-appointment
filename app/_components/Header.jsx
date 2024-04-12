"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user } = useKindeBrowserClient();
  const menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={180} height={180} alt="logo" priority />
        <ul className="hidden md:flex gap-8">
          {menu.map((item) => (
            <li
              key={item.id}
              className="hover:text-primary hover:scale-105 cursor-pointer duration-100"
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger>
            <img
              src={user?.picture}
              alt="user-profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer hover:bg-slate-100 rounded-md p-2">
                Profile
              </li>
              <Link href='/my-booking' className="cursor-pointer hover:bg-slate-100 rounded-md p-2">
                My Booking
              </Link>
              <li className="cursor-pointer hover:bg-slate-100 rounded-md p-2">
                <LogoutLink>Logout</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button>Get Started!</Button>
        </LoginLink>
      )}
    </div>
  );
};

export default Header;
