/*import {
  Table,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  TableCell,
} from "@nextui-org/table";*/

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//import { Button } from "@nextui-org/button";
import { Button } from "@/components/ui/button";

export default function HistoryTable({
  history,
  setHistory,
  currentPrice,
  saveSessionData,
}) {
  return (
    <Table aria-label="Position Table" className="h-full max-h-full">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Entry Price</TableHead>
          <TableHead>Close Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Result</TableHead>
        </TableRow>
      </TableHeader>
      {history != undefined && history.length != 0 ? (
        <TableBody className="max-h-full">
          {history.map((order, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  {`${new Date(order.exitDate).toLocaleDateString()}, ${new Date(order.exitDate).toLocaleTimeString()}`}
                </TableCell>
                <TableCell>{order.type.toUpperCase()}</TableCell>
                <TableCell>{order.entryPrice.toFixed(5)}</TableCell>
                <TableCell>{order.exitPrice.toFixed(5)}</TableCell>

                <TableCell>{order.size / 100000}</TableCell>
                <TableCell
                  className={
                    order.profit >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {order.profit.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      ) : (
        <TableBody
          className="max-h-[20%] overflow-hidden flex"
          emptyContent={"No rows to display."}
        >
          {[]}
        </TableBody>
      )}
    </Table>
  );
}
