import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ColorSquare = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

export default function SettingsTab({
  chartColors,
  setChartColors,
  resetDefaultChartColors,
  handleColorChange,
  spread,
  handleSpreadChange,
}) {
  return (
    <div className="max-w-full min-w-full max-h-full flex flex-col gap-4 items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold mb-2">Candle Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Up Candle Color"
            color={chartColors.upColor}
            setColor={(color) =>
              setChartColors({ ...chartColors, upColor: color })
            }
          />
          <ColorPicker
            label="Down Candle Color"
            color={chartColors.downColor}
            setColor={(color) =>
              setChartColors({ ...chartColors, downColor: color })
            }
          />
          <ColorPicker
            label="Wick Up Color"
            color={chartColors.wickUp}
            setColor={(color) =>
              setChartColors({ ...chartColors, wickUp: color })
            }
          />
          <ColorPicker
            label="Wick Down Color"
            color={chartColors.wickDown}
            setColor={(color) =>
              setChartColors({ ...chartColors, wickDown: color })
            }
          />
          <ColorPicker
            label="Vertical Lines"
            color={chartColors.verticalLines}
            setColor={(color) =>
              setChartColors({ ...chartColors, verticalLines: color })
            }
          />
          <ColorPicker
            label="Horizontal Lines"
            color={chartColors.horizontalLines}
            setColor={(color) =>
              setChartColors({ ...chartColors, horizontalLines: color })
            }
          />
          <ColorPicker
            label="Text Color"
            color={chartColors.textColor}
            setColor={(color) =>
              setChartColors({ ...chartColors, textColor: color })
            }
          />
          <ColorPicker
            label="Background Color"
            color={chartColors.background}
            setColor={(color) =>
              setChartColors({ ...chartColors, background: color })
            }
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold mb-2">Simulate Spread</h3>
        <Input
          type="number"
          value={spread}
          onChange={handleSpreadChange}
          placeholder="Enter spread value"
        />
      </div>
      <Button variant="ghost" onClick={resetDefaultChartColors}>
        Reset colors
      </Button>
    </div>
  );
}

function ColorPicker({ label, color, setColor }) {
  return (
    <div className="flex flex-col items-center">
      <span>{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <ColorSquare color={color} />
        </PopoverTrigger>
        <PopoverContent>
          <HexColorPicker color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
