import { Calendar, Clock, MapPin } from "lucide-react";
import moment from "moment/moment";
import CancelAppointment from "./CancelAppointment";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

const BookingList = ({ booking, expired }) => {
  const onDeleteBooking = async (item) => {
    try {
        const res = await GlobalApi.deleteAppointment(item.id);
        console.log(res) 
        toast.success("Cancel succesfull", {
        description: `Booking with Dr. ${item.doctor.name} was cancel succesfully`,
      });
    } catch (error) {
      toast.error("An error ocurred", error);
    }
  };

  return (
    <div>
      {booking &&
        booking.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center p-3 m-3 border rounded-md"
          >
            <img
              src={item.doctor.image.url}
              width={70}
              height={70}
              alt="doctor image"
              className="rounded-full object-cover h-[70px] w-[70px] border"
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between gap-2">
                <h2 className="capitalize font-bold text-[18px]">
                  Dr. {item.doctor.name}
                </h2>
                {!expired && (
                  <CancelAppointment
                    onContinueClick={() => onDeleteBooking(item)}
                  />
                )}
              </div>
              <h2 className="flex gap-2">
                <MapPin className="text-primary" />
                {item.hospital.address}
              </h2>
              <h2 className="flex gap-2">
                <Calendar className="text-primary" /> Appointment On:{" "}
                {moment(item.date).format("DD-MMM-YYYY")}
              </h2>
              <h2 className="flex gap-2">
                <Clock className="text-primary" />
                At Time: <span className="lowercase">{item.time}</span>
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookingList;
