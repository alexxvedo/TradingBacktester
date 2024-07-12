"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
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

import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { Input, Textarea } from "@nextui-org/input";

import { DateRangePicker } from "@nextui-org/date-picker";
import {
  getLocalTimeZone,
  parseDate,
  today,
  isWeekend,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export default function Sesiones() {
  const { isLoaded, userId } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Agregar estado de carga
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accountSize, setAccountSize] = useState("100000");
  const router = useRouter(); // Usar useRouter en un componente de cliente
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dates, setDates] = useState({});
  const [availableDates, setAvailableDates] = useState([]);

  let formatter = useDateFormatter();

  useEffect(() => {
    if (userId) {
      fetchSessions();
      fetchAvailableDates();
    }
  }, [userId]);

  if (!isLoaded || !userId) {
    return null;
  }

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/sessions");
      const data = await res.json();
      if (res.status === 401) {
        console.log(data.error);
        signOut(); // Cerrar sesión si no está autorizado
      }
      //console.log(data);
      setSessions(data);
      setIsLoading(false); // Cambiar estado de carga
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleSubmit = async (event) => {
    console.log("hola");

    try {
      const startDate = new Date(
        dates.start.year,
        dates.start.month - 1, // Los meses en JavaScript van de 0 (enero) a 11 (diciembre)
        dates.start.day,
      ).toISOString();
      console.log(startDate);

      const endDate = new Date(
        dates.end.year,
        dates.end.month - 1, // Los meses en JavaScript van de 0 (enero) a 11 (diciembre)
        dates.end.day,
      ).toISOString();
      console.log(endDate);

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
        onOpenChange(false); // Cambiar el estado del modal
        router.push(`/sesiones/${newSession.id}`); // Redirige a la nueva sesión
      } else {
        console.log(res);
        console.error("Failed to create session", res.error);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch("/api/dates");
      const dates = await response.json();
      setAvailableDates(
        dates.map((date) => new Date(date).toISOString().split("T")[0]),
      );
    } catch (error) {
      console.error("Failed to load available dates:", error);
    }
  };

  const handleAccountSizeChange = (e) => {
    console.log(e.target.value);
    setAccountSize(e.target.value);
  };

  return (
    <main className="flex w-full h-full flex-col p-4">
      <div className="min-h-[5%] w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sesiones</h2>
        <Button className="bg-white text-black" onPress={onOpen}>
          Nueva +
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
                  errorMessage={(value) => {
                    if (value.isInvalid) {
                      return "Please enter a valid date";
                    }
                    console.log(value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Crear Sesión
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <SesionCard key={index} sesion={session} />
            ))
          ) : (
            <p>No sessions found</p>
          )}
        </div>
      )}
    </main>
  );
}
