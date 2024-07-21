import PauseIcon from "@/public/pause.svg";
import RewindIcon from "@/public/rewind.svg";
import FastForwardIcon from "@/public/forward.svg";
import Save from "@/public/save.svg";
import PlayIcon from "@/public/play.svg";
import Image from "next/image";
import { Slider } from "@nextui-org/slider";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

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
      <Button variant="ghost" size="icon">
        <Image
          src={RewindIcon}
          alt="Rewind"
          className={`h-5 w-5 ${theme === "light" ? "invert" : "invert-0"}`}
        />
      </Button>
      <Button variant="ghost" size="icon" onClick={togglePause}>
        <Image
          src={!isPaused ? PauseIcon : PlayIcon}
          alt="Pause"
          className={`h-5 w-5 ${theme === "light" ? "invert" : "invert-0"}`}
        />
      </Button>
      <Slider
        color={"foreground"}
        aria-label="Speed"
        minValue={1}
        maxValue={200}
        value={candlePerSecond}
        onChange={setCandlePerSecond}
      />
      <Button variant="ghost" size="icon">
        <Image
          src={FastForwardIcon}
          alt="Fast Forward"
          className={`h-5 w-5 ${theme === "light" ? "invert" : "invert-0"}`}
        />
      </Button>
      <Button color="success" size="icon" onClick={saveSessionData}>
        <Image src={Save} alt="Fast Forward" className="h-5 w-5" />
      </Button>
      <Select
        label="Timezone"
        id="timeZone"
        className="w-1/4"
        selectedKeys={[timeZone]}
        onChange={(e) => {
          setTimeZone(e.target.value);
        }}
        value={timeZone}
      >
        {timeZones.map((timeZone) => (
          <SelectItem
            key={timeZone.value}
            value={timeZone.value}
            textValue={`${timeZone.label} - ${timeZone.value}`}
          >
            {timeZone.label} - {timeZone.value}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
