"use client";

// React and nextjs
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

// Components
import SesionCard from "@/components/Sesiones/SesionCard";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input, Textarea } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SkeletonSesionCard from "@/components/Sesiones/Skeletons/SkeletonSesionCard";

// Utils
import { fetchSessions, fetchAvailableDates } from "@/utils/sessions";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function Sesiones() {
  const { isLoaded, userId } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accountSize, setAccountSize] = useState("100000");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dates, setDates] = useState({});
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchSessions(setIsLoading, setSessions);
      fetchAvailableDates(setAvailableDates);
    }
  }, [userId]);

  if (!isLoaded || !userId) {
    return null;
  }

  /**
   * Submits a new session to the API and navigates to the newly created session page.
   *
   * @return {Promise<void>} - Returns a promise that resolves when the session is created and the user is navigated to the new session page.
   */
  const handleSubmit = async () => {
    try {
      const [startDate, endDate] = await Promise.all([
        new Date(
          dates.start.year,
          dates.start.month - 1,
          dates.start.day
        ).toISOString(),
        new Date(
          dates.end.year,
          dates.end.month - 1,
          dates.end.day
        ).toISOString(),
      ]);

      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          accountSize,
          startDate,
          endDate,
        }),
      });

      if (res.ok) {
        const newSession = await res.json();
        setTitle("");
        setDescription("");
        onOpenChange(false);
        toast.success("Session created!");
        setSessions([...sessions, newSession]);
      } else {
        toast.error("Error creating session!");
        throw new Error("Failed to create session");
      }
    } catch (error) {
      toast.error("Error creating session!");

      console.error("Error creating session:", error);
    }
  };

  const handleAccountSizeChange = (e) => {
    setAccountSize(e.target.value);
  };

  return (
    <main className="flex w-full h-full flex-col p-4">
      <div className="min-h-[5%] w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sesiones</h2>
        <Button
          onPress={onOpen}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        >
          New
        </Button>
      </div>
      <hr className="my-4 w-full" />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nueva Sesión
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Textarea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Select
                  label="Select account size"
                  className="max-w-full"
                  id="account_size"
                  selectedKeys={[accountSize]}
                  onChange={handleAccountSizeChange}
                >
                  <SelectItem key="5000">5000€</SelectItem>
                  <SelectItem key="10000">10000€</SelectItem>
                  <SelectItem key="20000">20000€</SelectItem>
                  <SelectItem key="50000">50000€</SelectItem>
                  <SelectItem key="100000">100000€</SelectItem>
                  <SelectItem key="150000">150000€</SelectItem>
                  <SelectItem key="200000">200000€</SelectItem>
                </Select>
                <DateRangePicker
                  label="Date range "
                  value={dates}
                  onChange={setDates}
                  isDateUnavailable={(date) => {
                    const formattedDate = date
                      .toDate(getLocalTimeZone())
                      .toISOString()
                      .split("T")[0];
                    return !availableDates.includes(formattedDate);
                  }}
                  maxValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" onPress={handleSubmit}>
                  Crear Sesión
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonSesionCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 ">
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <SesionCard key={index} sesion={session} />
            ))
          ) : (
            <p>No sessions found</p>
          )}
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
