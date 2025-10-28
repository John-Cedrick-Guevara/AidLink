import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps<T> {
  items: T[];
  tableHeads: string[];
  tableRow: (item: T, index: number) => React.ReactNode;
}

function TableUI<T>({ tableHeads, tableRow, items }: TableProps<T>) {
  return (
    /* table */
    <Table className="w-full">
      <TableHeader>
        <TableRow className="">
          {tableHeads.map((item, index) => {
            return (
              <TableHead
                key={index}
                className={`px-4 h-12 text-muted-foreground hidden lg:table-cell ${index === tableHeads.length - 1 ? "text-right" : ""  }`}
              >
                {item}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody className="max-lg:grid max-sm:grid-cols-1 md:grid-cols-2">
        {items &&
          items.length > 0 &&
          items.map((item, index) => tableRow(item, index))}
      </TableBody>
    </Table>
  );
}

export default TableUI;