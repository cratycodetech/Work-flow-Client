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
import {  FaCloudDownloadAlt, FaFilter } from "react-icons/fa";

const UpperPart = () => {
    const [date, setDate] = useState<Date>()

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
            <div>
                <Select>
                  <SelectTrigger className="w-[128px] h-[45px] bg-[#459895] text-[#F8F8F8] font-normal text-sm">
                    <SelectValue placeholder="Select a Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Department</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
            <div>
                <Select>
                  <SelectTrigger className="lg:w-[155px]  flex items-center gap-2 p-[10px] border border-gray-300 rounded-md">
                        <FaClipboardUser className="w-[14px] h-[180px] text-[#F3F4F8]" />
                        <SelectValue placeholder="Select an Employee ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Employee ID</SelectLabel>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
            </div>
            <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                    //   variant={"outline"}
                      className={cn(
                        "w-[185px]  p-[10px] gap-2 justify-start text-left font-normal bg-[#3D5A8F] text-[#F8F8F8]",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <FaCalendarDays className="text-[#F8F8F8] rounded-md"></FaCalendarDays>
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
                //   variant={"outline"}
                  className="w-[98px]  p-[10px] gap-2 text-center font-normal bg-[#3D5A8F] text-[#F8F8F8]"
                >
                  <FaFilter className="w-[18px] h-[18px] rounded-md"></FaFilter>
                   <span className="font-normal text-sm leading-4">Filters</span>
                </Button>
            </div>
            <div>
                <Button
                //   variant={"outline"}
                  className="w-[98px]  p-[10px] gap-2 text-center font-normal bg-[#459895] text-[#F8F8F8]"
                >
                  <FaCloudDownloadAlt className='w-[18px] h-[18px] rounded-md'></FaCloudDownloadAlt>
                   <span className="font-normal text-sm leading-4">Export</span>
                </Button>
            </div>
            </div>
        </div>
    );
};

export default UpperPart;