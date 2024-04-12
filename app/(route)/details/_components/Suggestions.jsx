"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import Link from "next/link";
import { useEffect, useState } from "react";

const Suggestions = ({ id }) => {
  const [doctors, setDoctors] = useState(null);

  const getSuggestedDoctors = async () => {
    const res = await GlobalApi.suggestedDoctors(id);
    setDoctors(res.doctors);
  };
  useEffect(() => {
    getSuggestedDoctors();
  }, []);

  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-lg font-bold">Suggested Doctors</h2>
      {doctors ? (
        <div className="flex flex-col gap-4 mt-4 ">
          {doctors.map((doctor) => (
            <Link
              href={`/details/${doctor.id}`}
              key={doctor.id}
              className="flex gap-4 p-2 rounded-md cursor-pointer hover:bg-slate-100 overflow-clip"
            >
              <img
                src={doctor?.image.url}
                width={60}
                height={60}
                alt="doctor image"
                className="rounded-full"
              />
              <div>
                {doctor.categories.map((category, index) => (
                  <article
                    key={index}
                    className="text-primary bg-blue-100 inline py-1 px-2  rounded-full text-sm"
                  >
                    {category.category}
                  </article>
                ))}
                <h2 className="capitalize text-sm truncate">
                  Dr. {doctor.name}
                </h2>
                <article className="text-sm text-gray-500">
                  {doctor.patients}
                </article>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        //skeleton
        [1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="mt-4 flex items-center gap-6">
            <div className="bg bg-slate-100 h-[60px] w-[60px] rounded-full animate-pulse"></div>
            <div className="flex flex-col gap-2">
              <div className="w-[100px] h-[10px] bg-slate-100 rounded-md animate-pulse"></div>
              <div className="w-[150px] h-[10px] bg-slate-100 rounded-md animate-pulse"></div>
              <div className="w-[70px] h-[10px] bg-slate-100 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Suggestions;
