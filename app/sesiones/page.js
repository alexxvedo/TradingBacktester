"use client";
// React and nextjs
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

// Components
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
import { DatePicker } from "@nextui-org/date-picker";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SkeletonSesionCard from "@/components/Sesiones/Skeletons/SkeletonSesionCard";
import SesionCard from "@/components/Sesiones/SesionCard";

// Utils
import { fetchSessions } from "@/utils/sessions";
import {
  getLocalTimeZone,
  today,
  parseDate,
  toLocalTimeZone,
} from "@internationalized/date";
import Link from "next/link";

export default function Sesiones() {
  const { isLoaded, userId } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accountSize, setAccountSize] = useState("100000");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dates, setDates] = useState({
    start: null,
    end: null,
  });
  const [availableDates, setAvailableDates] = useState([]);
  const [pair, setPair] = useState("EURUSD");
  const [timeframe, setTimeframe] = useState("D1");
  const [realistic, setRealistic] = useState(false);
  const [tooManyCandles, setTooManyCandles] = useState(false);

  const pairOptions = ["EURUSD", "EURJPY"];
  const timeframeOptions = {
    M1: "1min",
    M5: "5min",
    M15: "15min",
    H1: "1h",
    H4: "4h",
    D1: "1d",
  };

  function calculateCandles(startDate, endDate, interval) {
    const start = new Date(startDate.year, startDate.month - 1, startDate.day);
    const end = new Date(endDate.year, endDate.month - 1, endDate.day);
    const msInMinute = 60000;
    const msInHour = 3600000;
    const msInDay = 86400000;

    let intervalMs;

    switch (interval) {
      case "1min":
        intervalMs = msInMinute;
        break;
      case "5min":
        intervalMs = 5 * msInMinute;
        break;
      case "15min":
        intervalMs = 15 * msInMinute;
        break;
      case "1h":
        intervalMs = msInHour;
        break;
      case "4h":
        intervalMs = 4 * msInHour;
        break;
      case "1d":
        intervalMs = msInDay;
        break;
      default:
        throw new Error("Invalid interval");
    }

    const diffMs = end - start;
    const numberOfCandles = Math.floor(diffMs / intervalMs);

    return numberOfCandles;
  }

  const generateAvailableDates = (startDate, interval) => {
    const dateArray = [];
    let currentDate = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.day
    );
    const maxEndDate = new Date(
      today(getLocalTimeZone()).subtract({ days: 1 })
    );

    while (currentDate <= maxEndDate) {
      const endDate = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
      };
      const candles = calculateCandles(startDate, endDate, interval);
      if (candles <= 10000) {
        dateArray.push(new Date(currentDate).toISOString().split("T")[0]);
      } else {
        break;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  useEffect(() => {
    if (dates.start) {
      const updatedAvailableDates = generateAvailableDates(
        dates.start,
        timeframeOptions[timeframe]
      );
      setAvailableDates(updatedAvailableDates);
    } else {
      const allDates = generateAvailableDates(
        { year: 2014, month: 1, day: 1 },
        timeframeOptions[timeframe]
      );
      setAvailableDates(allDates);
    }
  }, [dates.start, timeframe]);

  useEffect(() => {
    if (userId) {
      fetchSessions(setIsLoading, setSessions);
    }
  }, [userId]);

  if (!isLoaded || !userId) {
    return null;
  }

  const handleSubmit = async () => {
    if (tooManyCandles) {
      toast.error(
        "The selected date range and timeframe result in more than 10,000 candles. Please select a shorter date range or a higher timeframe."
      );
      return;
    }

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
          pair,
          timeframe: timeframeOptions[timeframe],
          realistic,
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

        <div className="flex gap-2">
          <Link href="/plan">
            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              Plans
            </Button>
          </Link>
          <Button
            onPress={onOpen}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
          >
            New
          </Button>
        </div>
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
                <Select
                  label="Select pair"
                  className="max-w-full"
                  selectedKeys={[pair]}
                  onChange={(e) => setPair(e.target.value)}
                >
                  {pairOptions.map((pair) => (
                    <SelectItem key={pair}>{pair}</SelectItem>
                  ))}
                </Select>
                <Select
                  label="Select timeframe"
                  className="max-w-full"
                  selectedKeys={[timeframe]}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  {Object.entries(timeframeOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </Select>
                <DatePicker
                  label="Start Date"
                  value={dates.start}
                  onChange={(startDate) => {
                    setDates({ ...dates, start: startDate });
                    const updatedAvailableDates = generateAvailableDates(
                      startDate,
                      timeframeOptions[timeframe]
                    );
                    setAvailableDates(updatedAvailableDates);
                  }}
                  maxValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                />
                <DatePicker
                  label="End Date"
                  value={dates.end}
                  onChange={(endDate) => {
                    if (dates.start) {
                      const start = dates.start;
                      const end = endDate;
                      const candles = calculateCandles(
                        start,
                        end,
                        timeframeOptions[timeframe]
                      );
                      if (candles > 10000) {
                        setTooManyCandles(true);
                        toast.error(
                          "The selected date range and timeframe result in more than 10,000 candles. Please select a shorter date range or a higher timeframe."
                        );
                      } else {
                        setTooManyCandles(false);
                        setDates({ ...dates, end: endDate });
                      }
                    } else {
                      toast.error("Please select a start date first.");
                    }
                  }}
                  isDateUnavailable={(date) => {
                    if (!dates.start) {
                      return false;
                    }

                    const formattedDate = date
                      .toDate(getLocalTimeZone())
                      .toISOString()
                      .split("T")[0];

                    return !availableDates.includes(formattedDate);
                  }}
                  maxValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                />
                {tooManyCandles && (
                  <p className="text-red-500">
                    The selected date range and timeframe result in more than
                    10,000 candles. Please select a shorter date range or a
                    higher timeframe.
                  </p>
                )}
                <div className="w-full flex items-center justify-end">
                  <p
                    className="text-sm text-blue-500 cursor-pointer"
                    onClick={() => setDates({ start: null, end: null })}
                  >
                    Reset date
                  </p>
                </div>
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
          {[...Array(4)].map((_, index) => (
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
