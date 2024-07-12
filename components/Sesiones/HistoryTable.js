import {
  Table,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  TableCell,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";

export default function HistoryTable({
  history,
  setHistory,
  currentPrice,
  saveSessionData,
}) {
  return (
    <Table aria-label="Position Table" className="h-full max-h-full">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Entry Price</TableColumn>
        <TableColumn>Close Price</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>Result</TableColumn>
      </TableHeader>
      {history != undefined && history.length != 0 ? (
        <TableBody className="max-h-full">
          {history.map((order, index) => {
            console.log(order);
            return (
              <TableRow key={index}>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{order.type.toUpperCase()}</TableCell>
                <TableCell>{order.entryPrice.toFixed(4)}</TableCell>
                <TableCell>{order.exitPrice.toFixed(4)}</TableCell>

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
