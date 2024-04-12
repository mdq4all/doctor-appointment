"use client";
import CreateDoctorsList from "@/app/_components/CreateDoctorsList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";

const Search = ({ params }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const res = await GlobalApi.searchDocsByCategory(params.cname);
    setDoctors(res.doctors);
  };

  return (
    <div>
      {doctors && (
        <CreateDoctorsList doctors={doctors} heading={params.cname} />
      )}
    </div>
  );
};

export default Search;
