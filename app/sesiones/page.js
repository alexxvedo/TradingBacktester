"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

// Components
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SkeletonSesionCard from "@/components/Sesiones/Skeletons/SkeletonSesionCard";
import SesionCard from "@/components/Sesiones/SesionCard";

// Utils
import { fetchSessions, timeZones } from "@/utils/sessions";
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
  const [dates, setDates] = useState({
    start: null,
    end: null,
  });

  const [date, setDate] = useState();

  const [availableDates, setAvailableDates] = useState([]);
  const [pair, setPair] = useState("EURUSD");
  const [timeframe, setTimeframe] = useState("D1");
  const [realistic, setRealistic] = useState(false);
  const [tooManyCandles, setTooManyCandles] = useState(false);

  const [startInputValue, setStartInputValue] = useState("");
  const [endInputValue, setEndInputValue] = useState("");
  const [startInputError, setStartInputError] = useState("");
  const [endInputError, setEndInputError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchSessions(setIsLoading, setSessions);
    }
  }, [userId]);

  const pairOptions = ["EURUSD", "USDJPY"];

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
      startDate.day,
    );
    const maxEndDate = new Date(
      today(getLocalTimeZone()).subtract({ days: 1 }),
    );

    while (currentDate <= maxEndDate) {
      const endDate = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
      };
      const candles = calculateCandles(startDate, endDate, interval);
      if (candles <= 1000000) {
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
        timeframeOptions[timeframe],
      );
      setAvailableDates(updatedAvailableDates);
    } else {
      const allDates = generateAvailableDates(
        { year: 2014, month: 1, day: 1 },
        timeframeOptions[timeframe],
      );
      setAvailableDates(allDates);
    }
  }, [dates.start, timeframe]);

  if (!isLoaded || !userId) {
    return null;
  }

  const handleSubmit = async () => {
    if (tooManyCandles) {
      toast.error(
        "The selected date range and timeframe result in more than 10,000 candles. Please select a shorter date range or a higher timeframe.",
      );
      return;
    }

    try {
      const [startDate, endDate] = await Promise.all([
        new Date(
          dates.start.year,
          dates.start.month - 1,
          dates.start.day,
        ).toISOString(),
        new Date(
          dates.end.year,
          dates.end.month - 1,
          dates.end.day,
        ).toISOString(),
      ]);

      console.log(
        title,
        description,
        accountSize,
        startDate,
        endDate,
        pair,
        timeframeOptions[timeframe],
        realistic,
      );

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

  const handleDateChange = (newDate, dateType) => {
    setDates((prevDates) => ({
      ...prevDates,
      [dateType]: {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      },
    }));
    if (dateType === "start") {
      setStartInputValue(
        `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`,
      );
    } else {
      setEndInputValue(
        `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`,
      );
    }
  };

  const isDateValid = (year, month, day) => {
    const newDate = new Date(year, month - 1, day);
    return (
      !isNaN(newDate) &&
      availableDates.includes(newDate.toISOString().split("T")[0])
    );
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
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                New
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto max-w-sm flex flex-col gap-4 ">
                <DrawerHeader className="flex flex-col gap-1">
                  <DrawerTitle>New Session</DrawerTitle>
                </DrawerHeader>
                <label id="title" className="text-sm font-semibold">
                  Title
                </label>
                <Input
                  htmlFor="title"
                  label="Title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label id="description" className="text-sm font-semibold">
                  Description
                </label>
                <Textarea
                  label="Description"
                  htmlFor="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div className="flex gap-4 justify-between">
                  <div className="flex flex-col w-full">
                    <label id="accountSize" className="text-sm font-semibold">
                      Account Size
                    </label>
                    <Select
                      htmlFor="accountSize"
                      value={accountSize}
                      onValueChange={(size) =>
                        setAccountSize(size.split("€")[0])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={accountSize} />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="5000">5000€</SelectItem>
                          <SelectItem value="10000">10000€</SelectItem>
                          <SelectItem value="20000">20000€</SelectItem>
                          <SelectItem value="50000">50000€</SelectItem>
                          <SelectItem value="100000">100000€</SelectItem>
                          <SelectItem value="150000">150000€</SelectItem>
                          <SelectItem value="200000">200000€</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label id="pair" className="text-sm font-semibold">
                      Pair
                    </label>
                    <Select
                      htmlFor="pair"
                      value={pair}
                      onValueChange={(pair) => setPair(pair)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={pair} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {pairOptions.map((pair) => (
                            <SelectItem key={pair} value={pair}>
                              {pair}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label id="timeframe" className="text-sm font-semibold">
                      Timeframe
                    </label>
                    <Select
                      htmlFor="timeframe"
                      value={timeframe}
                      onValueChange={(e) => {
                        setTimeframe(e);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={timeframe} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(timeframeOptions).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {key}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="flex gap-4 w-full justify-between ">
                    <div className="flex flex-col w-[50%]">
                      <label id="startDate" className="text-sm font-semibold">
                        Start date
                      </label>
                      <div className="flex  justify-center">
                        <Popover htmlFor="startDate">
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-auto justify-center ",
                                !dates.start && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              initialFocus
                              defaultMonth={
                                dates.start
                                  ? new Date(
                                      dates.start.year,
                                      dates.start.month - 1,
                                      dates.start.day,
                                    )
                                  : new Date()
                              }
                              selected={
                                dates.start
                                  ? new Date(
                                      dates.start.year,
                                      dates.start.month - 1,
                                      dates.start.day,
                                    )
                                  : null
                              }
                              onSelect={(newDate) =>
                                handleDateChange(newDate, "start")
                              }
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("2014-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="flex ">
                          <Input
                            value={startInputValue}
                            placeholder="Start date"
                            className="w-full"
                            onChange={(e) => {
                              setStartInputValue(e.target.value);
                              setStartInputError("");
                            }}
                            onBlur={(e) => {
                              const [year, month, day] = e.target.value
                                .split("-")
                                .map(Number);
                              if (isDateValid(year, month, day)) {
                                const newDate = new Date(year, month - 1, day);
                                handleDateChange(newDate, "start");
                              } else {
                                const newDate = new Date(year, month - 1, day);
                                setStartInputValue(
                                  `${dates.start.year}-${String(dates.start.month).padStart(2, "0")}-${String(dates.start.day).padStart(2, "0")}`,
                                );
                                setStartInputError(
                                  "Invalid date. Please select a date within the valid range.",
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-[50%]">
                      <label id="endDate" className="text-sm font-semibold">
                        End date
                      </label>
                      <div className="flex justify-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-auto justify-center ",
                                !dates.start && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                dates.end
                                  ? new Date(
                                      dates.end.year,
                                      dates.end.month - 1,
                                      dates.end.day,
                                    )
                                  : null
                              }
                              defaultMonth={
                                dates.end
                                  ? new Date(
                                      dates.end.year,
                                      dates.end.month - 1,
                                      dates.end.day,
                                    )
                                  : dates.start
                                    ? new Date(
                                        dates.start.year,
                                        dates.start.month - 1,
                                        dates.start.day,
                                      )
                                    : ""
                              }
                              onSelect={(newDate) =>
                                handleDateChange(newDate, "end")
                              }
                              disabled={(date) => {
                                const dateString = date
                                  .toISOString()
                                  .split("T")[0];
                                return !availableDates.includes(dateString);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="flex ">
                          <Input
                            value={endInputValue}
                            placeholder="End date"
                            className="w-full"
                            onChange={(e) => {
                              setEndInputValue(e.target.value);
                              setEndInputError("");
                            }}
                            onBlur={(e) => {
                              try {
                                const [year, month, day] = e.target.value
                                  .split("-")
                                  .map(Number);

                                if (isDateValid(year, month, day)) {
                                  const newDate = new Date(
                                    year,
                                    month - 1,
                                    day,
                                  );
                                  handleDateChange(newDate, "end");
                                } else {
                                  const newDate = new Date(
                                    year,
                                    month - 1,
                                    day,
                                  );
                                  setEndInputValue(
                                    `${dates.end.year}-${String(dates.end.month).padStart(2, "0")}-${String(dates.end.day).padStart(2, "0")}`,
                                  );
                                  setEndInputError(
                                    "Invalid date. Please select a date within the valid range.",
                                  );
                                }
                              } catch (error) {
                                setEndInputValue(
                                  dates.end
                                    ? `${dates.end.year}-${String(dates.end.month).padStart(2, "0")}-${String(dates.end.day).padStart(2, "0")}`
                                    : "",
                                );
                                setEndInputError(
                                  "Invalid date. Please select a date within the valid range.",
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {tooManyCandles && (
                      <p className="text-red-500">
                        The selected date range and timeframe result in more
                        than 10,000 candles. Please select a shorter date range
                        or a higher timeframe.
                      </p>
                    )}
                  </div>
                  <div className="w-full flex items-center justify-end">
                    <p
                      className="text-sm text-blue-500 cursor-pointer"
                      onClick={() => {
                        setStartInputError("");
                        setStartInputValue("");
                        setEndInputError("");
                        setEndInputValue("");
                        setDates({ start: null, end: null });
                      }}
                    >
                      Reset date
                    </p>
                  </div>
                  <DrawerTrigger asChild>
                    <div className="flex">
                      <Button onClick={handleSubmit} className="w-full">
                        Create
                      </Button>
                    </div>
                  </DrawerTrigger>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <hr className="my-4 w-full" />

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
