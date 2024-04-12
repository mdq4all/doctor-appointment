"use client";

import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";

const MyBooking = () => {
  const { user } = useKindeBrowserClient();
  const [appointmentsList, setAppointmentsList] = useState([]);

  const filterUserBooking = (type) => {
     
    const result = appointmentsList.filter(item => type==='upcoming' ? new Date(item.date) >= new Date()
    : new Date(item.date) < new Date()
    )
    return result
  }
  const getUserBooking = async () => {
    const res = await GlobalApi.listAppointmentsUser(user?.email);
    setAppointmentsList(res.appointments)
  };

  useEffect(() => {
    user&&getUserBooking()
  }, [user]);

  
  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full my-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList booking={filterUserBooking('upcoming')} expired={false} />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList booking={filterUserBooking('expired')} expired={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
