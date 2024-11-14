/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaCalendarDays, FaClipboardUser } from "react-icons/fa6";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { FaCloudDownloadAlt, FaFilter } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hook";
import { setFilters } from "@/redux/features/filters/filterSlice";
import { useGetAllEmployeeQuery } from "@/redux/features/employee/employeeApi";


const UpperPart = ({ toPDF } : any) => {
  const [department, setDepartment] = useState<string>(""); 
  const [employeeID, setEmployeeID] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const { data: getAllEmployee } = useGetAllEmployeeQuery(undefined);

  //handle filter
  const handleFilterClick = () => {
    const dateString = date ? new Date(date).toLocaleDateString('en-CA') : null; // 'en-CA' is the YYYY-MM-DD format
    const filters = { department, employeeID, date: dateString };

    dispatch(setFilters(filters));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
      <div>
        <Select
          value={department} // Set the value directly from state
          onValueChange={(value) => setDepartment(value)} // Update state when a value is selected
        >
          <SelectTrigger className="w-[128px] h-[45px] bg-[#459895] text-[#F8F8F8] font-normal text-sm">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Department</SelectLabel>
              {getAllEmployee?.data ? (
                getAllEmployee?.data
                  .map((item: any) => item?.departmentName)
                  .filter(
                    (value: string, index: number, self: string[]) =>
                      self.indexOf(value) === index // Remove duplicates
                  )
                  .map((departmentName: string) => (
                    <SelectItem key={departmentName} value={departmentName}>
                      {departmentName}
                    </SelectItem>
                  ))
              ) : (
                <SelectItem value="disabled" disabled>
                  No departments available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
        <div>
          <Select
            value={employeeID}
            onValueChange={(value) => setEmployeeID(value)}
          >
            <SelectTrigger className="lg:w-[180px] flex items-center gap-2 p-[10px] border border-gray-300 rounded-md">
              <FaClipboardUser className="w-[14px] h-[180px] text-[#F3F4F8]" />
              <SelectValue placeholder="Select an Employee ID" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Employee ID</SelectLabel>
                {getAllEmployee?.data ? (
                  getAllEmployee?.data
                    .map((item: any) => item?.employeeId)
                    .filter(
                      (value: string, index: number, self: string[]) =>
                        self.indexOf(value) === index // Remove duplicates
                    )
                    .map((employeeId: string) => (
                      <SelectItem key={employeeId} value={employeeId}>
                        {employeeId}
                      </SelectItem>
                    ))
                ) : (
                  <SelectItem value="disabled" disabled>
                    No employees available
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "w-[185px] p-[10px] gap-2 justify-start text-left font-normal bg-[#3D5A8F] text-[#F8F8F8]",
                  !date && "text-muted-foreground"
                )}
              >
                <FaCalendarDays className="text-[#F8F8F8] rounded-md" />
                {date ? format(date, "PPP") : <span className="text-[#F8F8F8]">Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Button
            onClick={handleFilterClick}
            className="w-[98px] p-[10px] gap-2 text-center font-normal bg-[#3D5A8F] text-[#F8F8F8]"
          >
            <FaFilter className="w-[18px] h-[18px] rounded-md" />
            <span className="font-normal text-sm leading-4">Filters</span>
          </Button>
        </div>

        <div>
          <Button onClick={() => toPDF()} className="w-[98px] p-[10px] gap-2 text-center font-normal bg-[#459895] text-[#F8F8F8]">
            <FaCloudDownloadAlt className="w-[18px] h-[18px] rounded-md" />
            <span className="font-normal text-sm leading-4">Report</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpperPart;
