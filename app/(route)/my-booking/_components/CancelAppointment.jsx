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

const CancelAppointment = ({ onContinueClick }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-primary border-primary hover:text-blue-700"
        >
          Cancel Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will delete your appointment!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex sm:justify-between w-full">
              <Button onClick={() => onContinueClick()}>Confirm</Button>
              <Button type="button" variant="outline">
                Close
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelAppointment;
