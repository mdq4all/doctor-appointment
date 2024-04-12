"use client";

import { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import CreateDoctorsList from "./CreateDoctorsList";

const DoctorsList = () => {
  const [doctorsList, setDoctorsList] = useState([]);

  const allDoctors = async () => {
    const res = await GlobalApi.getDoctorsList();
    setDoctorsList(res.doctors);
  };
  useEffect(() => {
    allDoctors();
  }, []);

  return (
    <div className="mb-10">
      <CreateDoctorsList doctors={doctorsList} heading={'Popular Doctors'} />
    </div>
  );
};

export default DoctorsList;
