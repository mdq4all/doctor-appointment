import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const { user } = useKindeBrowserClient();

  const saveBooking = async () => {
    const data = {
      doctorId: doctor.id,
      userId:user.id,
      email: user.email,
      time: selectedTimeSlot,
      username: `${user.family_name} ${user.given_name}`,
      hospitalId: doctor.hospitals[0].id,
      date: date,
    };
    try {
      const res = await GlobalApi.bookAppointment(data);
      const res2 = await GlobalApi.publishAppointment(res.createAppointment
        .id)
    //   GlobalApi.sendEmail(data)
      toast.success("Appointment succesfull",{
        description:`${res.createAppointment.date}, ${res.createAppointment.time} appointment with Dr. ${res.createAppointment.doctor.name}`
      });
    } catch (error) {
      toast.error("An error ocurred");
    }
  };

  const isPastDay = (date) => {
    return date <= new Date();
  };
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i < 8; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
  };

  useEffect(() => {
    getTime();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Book Appointment
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {/* Calendar */}
                <div className="flex flex-col">
                  <h2 className="flex gap-2 items-center py-2">
                    <CalendarDays className="text-primary h-5" />
                    Select Day
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                {/* Time Slot */}
                <div className="flex flex-col">
                  <h2 className="flex gap-2 items-center py-2">
                    <Clock className="text-primary h-5" />
                    Select Hour
                  </h2>
                  <div className="grid grid-cols-3 gap-x-2 gap-y-3 border rounded-lg p-3">
                    {timeSlot &&
                      timeSlot.map((item, index) => (
                        <article
                          key={index}
                          className={`border rounded-full p-1 text-center hover:bg-primary hover:text-white cursor-pointer ${
                            item.time === selectedTimeSlot &&
                            "bg-primary text-white"
                          }`}
                          onClick={() => setSelectedTimeSlot(item.time)}
                        >
                          {item.time}
                        </article>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="text-red-500 border-red-500 hover:text-red-700"
              >
                Close
              </Button>
              <Button
                type="button"
                disabled={!(date && selectedTimeSlot)}
                onClick={() => saveBooking()}
              >
                Submit
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
