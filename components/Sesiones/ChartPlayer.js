import PauseIcon from "@/public/pause.svg";
import RewindIcon from "@/public/rewind.svg";
import FastForwardIcon from "@/public/forward.svg";
import Save from "@/public/save.svg";
import PlayIcon from "@/public/play.svg";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
//import { Select, SelectItem } from "@nextui-org/select";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export default function ChartPlayer({
  isPaused,
  togglePause,
  candlePerSecond,
  setCandlePerSecond,
  saveSessionData,
  timeZones,
  timeZone,
  setTimeZone,

  theme,
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4 max-h-[5%]">
      <Button size="icon" variant="outline">
        <Image
          src={RewindIcon}
          alt="Rewind"
          sizes="icon"
          className={` w-full h-full ${theme === "light" ? "invert" : "invert-0"}`}
        />
      </Button>
      <Button variant="outline" size="icon" onClick={togglePause}>
        <Image
          src={!isPaused ? PauseIcon : PlayIcon}
          alt="Pause"
          sizes="icon"
          className={`w-full h-full ${theme === "light" ? "invert" : "invert-0"}`}
        />
      </Button>
      <Slider
        color={"foreground"}
        defaultValue={[candlePerSecond]}
        max={200}
        min={1}
        step={1}
        onValueChange={setCandlePerSecond}
      />
      <Button variant="outline" size="icon">
        <Image
          src={FastForwardIcon}
          alt="Fast Forward"
          sizes="icon"
          className={`w-full h-full ${theme === "light" ? "invert" : "invert-0"}`}
        />
      </Button>
      <Button variant="save" size="icon" onClick={saveSessionData}>
        <Image src={Save} alt="Fast Forward" className="w-full h-full" />
      </Button>
      <Select
        label="Timezone"
        id="timeZone"
        className="w-1/4"
        value={timeZone}
        onValueChange={(option) => setTimeZone(option)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={timeZone.value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timeZones.map((timezone) => (
              <SelectItem key={timezone.value} value={timezone.value}>
                {timezone.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
