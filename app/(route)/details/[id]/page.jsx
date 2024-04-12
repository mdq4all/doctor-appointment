"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import DoctorDetail from "../_components/DoctorDetail";
import Suggestions from "../_components/Suggestions";

const DoctorDetailsPage = ({ params }) => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const getDoctorDetail = async () => {
    const res = await GlobalApi.searchDocsById(params.id);
    setDoctorDetails(res.doctor);
  };
  useEffect(() => {
    getDoctorDetail();
  }, []);

  return (
    <div className="p-5 md:p-20">
      <h2 className="font-bold text-[22px]">Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Doctor details */}
        <DoctorDetail doctorDetails={doctorDetails} />
        {/* Doctos Suggestions */}
        <div>
          <Suggestions id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
