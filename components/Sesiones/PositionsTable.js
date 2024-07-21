import {
  Table,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  TableCell,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";

export default function PositionsTable({
  orders,
  setOrders,
  history,
  setHistory,
  currentPrice,
  saveSessionData,
  accountSize,
}) {
  const closePosition = (key) => async () => {
    const order = orders.find((order) => order.id === key);

    const newOrder = {
      ...order,
      exitPrice: currentPrice,
      profit:
        (currentPrice - order.entryPrice) *
        order.size *
        (order.type === "buy" ? 1 : -1),
    };
    setHistory([...history, newOrder]);

    try {
      const res = await fetch(`/api/operations/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exitPrice: newOrder.exitPrice,
          profit: newOrder.profit,
          accountSize,
        }),
      });

      if (res.ok) {
        setOrders([...orders.filter((order) => order.id !== key)]);
        setHistory([...history, newOrder]);
        saveSessionData();
      } else {
        setOrders([...orders, order]);
        console.error("Failed to close operation");
      }
    } catch (error) {
      setOrders([...orders, order]);
      setHistory([...history.filter((order) => order.id !== key)]);

      console.error("Error closing operation:", error);
    }
  };
  return (
    <Table aria-label="Position Table" className="h-full max-h-full">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Entry Price</TableColumn>
        <TableColumn>Current Price</TableColumn>

        <TableColumn>Quantity</TableColumn>
        <TableColumn>Result</TableColumn>
        <TableColumn>Close</TableColumn>
      </TableHeader>
      {orders != undefined && orders.length != 0 ? (
        <TableBody className="max-h-full">
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.type.toUpperCase()}</TableCell>
              <TableCell>{order.entryPrice.toFixed(4)}</TableCell>
              <TableCell>{currentPrice.toFixed(4)}</TableCell>

              <TableCell>{order.size / 100000}</TableCell>
              <TableCell
                className={
                  (currentPrice - order.entryPrice) *
                    order.size *
                    (order.type === "buy" ? 1 : -1) >=
                  0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {(
                  (currentPrice - order.entryPrice) *
                  order.size *
                  (order.type === "buy" ? 1 : -1)
                ).toFixed(2)}
              </TableCell>

              <TableCell className="cursor-pointer">
                <Button
                  variant="flat"
                  color="danger"
                  onClick={closePosition(order.id)}
                >
                  Close
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      )}
    </Table>
  );
}
