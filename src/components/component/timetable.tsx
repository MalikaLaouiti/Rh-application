
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"

export function timetable() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Timetable</h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="date-range">Date Range:</Label>
          <div />
        </div>
      </div>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Total Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-04-10</TableCell>
              <TableCell>9:00 AM</TableCell>
              <TableCell>5:30 PM</TableCell>
              <TableCell>8.5 hrs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-11</TableCell>
              <TableCell>8:30 AM</TableCell>
              <TableCell>6:00 PM</TableCell>
              <TableCell>9 hrs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-12</TableCell>
              <TableCell>9:15 AM</TableCell>
              <TableCell>5:45 PM</TableCell>
              <TableCell>8.5 hrs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-13</TableCell>
              <TableCell>8:45 AM</TableCell>
              <TableCell>6:15 PM</TableCell>
              <TableCell>9.5 hrs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-14</TableCell>
              <TableCell>9:00 AM</TableCell>
              <TableCell>5:30 PM</TableCell>
              <TableCell>8.5 hrs</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Weekly Total:
              </TableCell>
              <TableCell className="font-medium">43.5 hrs</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
