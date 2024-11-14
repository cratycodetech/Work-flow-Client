/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaCalendarDays, FaClipboardUser, FaEllipsis } from "react-icons/fa6";
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const data1 = [{ name: 'Present', value: 27 }, { name: 'Absent', value: 27 }];
const data2 = [{ name: 'Absent', value: 5 }, { name: 'Other', value: 25 }];
const data3 = [{ name: 'Late', value: 3 }, { name: 'Other', value: 27 }];
const weeklyHoursData = [
    { name: 'Completed', value: 40 }, // Adjust this value for actual completed hours
    { name: 'Remaining', value: 40 },  // Adjust this value for remaining hours
  ];

const COLORS1 = ['#3D5A8F', '#E0E0E0'];  // Colors for Present chart
const COLORS2 = ['#459895', '#E0E0E0'];  // Colors for Absent chart
const COLORS3 = ['#E0D59A', '#E0E0E0'];  // Colors for Late chart
const COLORS4 = ['#3D5A8F', '#E0E0E0']; // Primary color for completed, grey for remaining



const AttendanceDetailsModal = ({employee}: {employee: any}) => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      })

    const { employeeId, employeeName} = employee

    return (
        <div>
            <Dialog>
              <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
                <FaEllipsis className="h-[20px] w-[20px] text-[#463684] mx-auto"></FaEllipsis>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>

                </DialogHeader>
                <div className="flex gap-5 items-center justify-between mt-1">
                    <div>
                        <div className="flex items-center justify-start gap-3 rounded-md bg-[#D3D3D3] h-[38px] py-2 pl-4 pr-8">
                            <FaClipboardUser className="w-[14px] h-[18px] text-[#04080F]"></FaClipboardUser>
                            <p className="text-[#04080F] font-normal text-xs">{employeeId}</p>
                        </div>
                        <div className="mt-1 flex items-center justify-start gap-3 rounded-md bg-[#D3D3D3] h-[38px] py-2 pl-4 pr-8">
                            <FaClipboardUser className="w-[14px] h-[18px] text-[#04080F]"></FaClipboardUser>
                            <p className="text-[#04080F] font-normal text-xs">{employeeName}</p>
                        </div>
                    </div>
                    <div>
                        <img className="w-[150px] h-[150px] rounded-full" src="https://i.ibb.co.com/wLxtdPV/Frame-159.webp" alt="" />
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <div className={cn("grid gap-2",)}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[245px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <FaCalendarDays />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
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

                <div className="flex items-center justify-start gap-5">
                  {/* Present Chart */}
                  <div className="text-center">
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie
                          data={data1}
                          dataKey="value"
                          innerRadius={30}
                          outerRadius={55}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {data1.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                          ))}
                        </Pie>
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#3D5A8F"
                          fontSize="14px"
                          fontWeight="semibold"
                        >
                          27 Days
                        </text>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="bg-[#F3F4F8] flex items-center justify-start gap-2 px-3 py-1 mt-2">
                        <p className="w-[12px] h-[12px] border bg-[#3D5A8F]"></p>
                        <p className="leading-[18px] text-xs">Present</p>
                    </div>
                  </div>
            
                  {/* Absent Chart */}
                  <div className="text-center">
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie
                          data={data2}
                          dataKey="value"
                          innerRadius={30}
                          outerRadius={55}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {data2.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                          ))}
                        </Pie>
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#459895"
                          fontSize="14px"
                          fontWeight="semibold"
                        >
                          5 Days
                        </text>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="bg-[#F3F4F8] flex items-center justify-start gap-2 px-3 py-1 mt-2">
                        <p className="w-[12px] h-[12px] border bg-[#459895]"></p>
                        <p className="leading-[18px] text-xs">Absent</p>
                    </div>
                  </div>
    
            
                  {/* Late Chart */}
                  <div className="text-center">
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie
                          data={data3}
                          dataKey="value"
                          innerRadius={30}
                          outerRadius={55}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {data3.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS3[index % COLORS3.length]} />
                          ))}
                        </Pie>
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#E0D59A"
                          fontSize="14px"
                          fontWeight="semibold"
                        >
                          3 Days
                        </text>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="bg-[#F3F4F8] flex items-center justify-start gap-2 px-3 py-1 mt-2">
                        <p className="w-[12px] h-[12px] border bg-[#E0D59A]"></p>
                        <p className="leading-[18px] text-xs">Late</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-5">
                  {/* weekly hours Chart */}
                    <div className="text-center">
                      <ResponsiveContainer width={120} height={120}>
                        <PieChart>
                          <Pie
                            data={weeklyHoursData}
                            dataKey="value"
                            innerRadius={30}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                          >
                            {weeklyHoursData.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS4[index % COLORS4.length]} />
                            ))}
                          </Pie>
                          <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#3D5A8F"
                            fontSize="12px"
                            fontWeight="normal"
                          >
                            40 Hours
                          </text>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* <div className="bg-[#F3F4F8] flex items-center justify-start gap-2 px-3 py-1 mt-2">
                        <p className="w-[12px] h-[12px] bg-[#3D5A8F]"></p>
                        <p className="leading-[18px] text-xs">Completed</p>
                      </div> */}
                    </div>
                    {/* present Chart/ don't know why design this in figma */}
                     <div className="text-center">
                      <ResponsiveContainer width={120} height={120}>
                        <PieChart>
                          <Pie
                            data={data1}
                            dataKey="value"
                            innerRadius={30}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                          >
                            {data1.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                            ))}
                          </Pie>
                          <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#3D5A8F"
                            fontSize="14px"
                            fontWeight="semibold"
                          >
                            27 Days
                          </text>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                </div>

                {/* <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>       
        </div>
    );
};

export default AttendanceDetailsModal;