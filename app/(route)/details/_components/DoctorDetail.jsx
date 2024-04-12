import { MapPin } from "lucide-react";
import BookAppointment from "./BookAppointment";

const DoctorDetail = ({ doctorDetails }) => {

  const imageUrl = doctorDetails?.image?.url;
  const hasValidImageUrl =
    typeof imageUrl === "string" && imageUrl.trim().length > 0;
  return (

    <div className="col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-3  gap-y-4 sm:gap-x-4 border p-2 rounded-md ">
        {/* Doctor Image */}
        <div>
          {hasValidImageUrl && (
            <img
              src={imageUrl}
              alt="doctor picture"
              width={200}
              height={200}
              className="rounded-md w-full object-cover h-[270px]"
            />
          )}
        </div>
        {/* Doctor Information */}
        <div className="col-span-2 flex flex-col sm:justify-between gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl capitalize">
              Dr. {doctorDetails?.name}
            </h2>
            <h2 className="flex gap-2 text-slate-500">
              <MapPin />{" "}
              <span>
                {doctorDetails?.hospitals.map((hospital, index) => (
                  <span key={index}> {hospital.address}</span>
                ))}
              </span>
            </h2>
            <div>
              {doctorDetails?.categories.map((category, index) => (
                <h2
                  key={index}
                  className="capitalize bg-blue-100 text-primary rounded-xl py-1 px-4 inline"
                >
                  {category.category}
                </h2>
              ))}
            </div>
          </div>
          <div>
            <BookAppointment doctor={doctorDetails} />
          </div>
        </div>
      </div>
      {/* About */}
      <div className="mt-3 border rounded-md p-2">
        <h2 className="text-xl font-bold">About</h2>
        <p className="text-gray-600  tracking-wider">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio.
          Eveniet ipsam doloremque sunt. Obcaecati, labore dicta praesentium,
          quidem necessitatibus excepturi vel, doloremque animi mollitia cumque
          est saepe ipsa sequi! Modi, consequuntur odio? Debitis exercitationem
          aut porro asperiores? Aliquam quaerat harum maiores optio, quis
          facilis perferendis iste, aspernatur aperiam inventore beatae, minima
          distinctio laudantium. Ipsam recusandae aperiam eum veniam ea. Amet
          dolorem illum in? Perferendis non maiores quo recusandae. Consectetur
          assumenda unde delectus autem accusamus quo reprehenderit? Voluptatem
          sapiente et, iste, odit commodi explicabo id eum consequuntur vero
          possimus tempora.
        </p>
      </div>
    </div>
  );
};

export default DoctorDetail;
