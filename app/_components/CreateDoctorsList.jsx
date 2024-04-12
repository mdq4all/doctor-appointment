import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateDoctorsList = ({ doctors, heading }) => {
  return (
    <div>
      <h2 className="font-bold text-xl capitalize">{heading}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
        {doctors.length > 0
          ? doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="border p-4 rounded-lg flex flex-col justify-between cursor-pointer hover:border-primary hover:shadow-lg"
              >
                <div>
                  <img
                    src={doctor.image.url}
                    width={100}
                    height={60}
                    alt={`doctor ${doctor.name} picture`}
                    className="h-[200px] w-full object-cover rounded-md"
                  />
                  <div>
                    <div className="mt-2 flex flex-col items-baseline gap-1">
                      {doctor.categories.map((category, index) => (
                        <h2
                          key={index}
                          className="capitalize bg-blue-100 text-primary rounded-md px-3 py-1"
                        >
                          {category.category}
                        </h2>
                      ))}
                      <h2 className="capitalize font-bold">
                        Dr. {doctor.name}
                      </h2>
                      <h2 className="text-primary text-sm">
                        {doctor.patients} patients
                      </h2>
                      <h2>
                        {doctor.hospitals.map((hospital) => (
                          <span
                            key={hospital.name}
                            className="text-gray-500 text-sm"
                          >
                            {hospital.name}
                          </span>
                        ))}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <Link href={`/details/${doctor.id}`}>
                    <Button
                      variant="outline"
                      className="border-primary rounded-3xl text-primary hover:bg-primary hover:text-white"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          : // Skeleton effect
            [1, 2, 3, 4, 5, 6].map((index) => (
              <div
                className="h-[220px] w-full bg-slate-200 rounded-lg animate-pulse"
                key={index}
              ></div>
            ))}
      </div>
    </div>
  );
};

export default CreateDoctorsList;
