/* eslint-disable @typescript-eslint/no-explicit-any */
import UpperPart from "@/components/functionalities/UpperPart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts';
import { FaBuilding} from "react-icons/fa";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { FaEllipsis } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaCalendarDays } from "react-icons/fa6";
import { useState } from "react";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { useGetAllEmployeeQuery } from "@/redux/features/employee/employeeApi";
import { useGetAllLeaveQuery } from "@/redux/features/leave/leaveApi";
import { useAppSelector } from "@/redux/hook";
import { selectFilter } from "@/redux/features/filters/filterSlice";


  //for graph
const data = [
  { name: 'Leave 1', value: 21, color: '#E0D59A' },  // Beige color
  { name: 'Leave 2', value: 70, color: '#3D5A8F' },  // Dark blue color
  { name: 'Leave 3', value: 9, color: '##459895' },   // Teal color
];

//for table
const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
  ]

const Leave = () => {
    const [date, setDate] = useState<Date>()
    const { data: GetAllEmployee } = useGetAllEmployeeQuery(undefined);
    const { data: GetAllLeave } = useGetAllLeaveQuery(undefined);
    //for filter
  const filters = useAppSelector(selectFilter);

  //get others data for show all table column
    const getLeaveData = (employeeId: string) => {
      const leaveData = GetAllLeave?.data?.find(
        (leave: any) => leave.employeeId === employeeId
      );
      return { leaveData };
    };

  // Apply filters to the employees
 const filteredEmployees = GetAllEmployee?.data.filter((employee: any) => {
  const isDepartmentMatch = filters.department ? employee.departmentName === filters.department : true;
  const isEmployeeIDMatch = filters.employeeID ? employee.employeeId === filters.employeeID : true;

  // Normalize both the joiningDate and the selected date to YYYY-MM-DD format for comparison
  const employeeJoiningDate = employee.joiningDate ? employee.joiningDate.split('T')[0] : null;
  const isDateMatch = filters.date ? employeeJoiningDate === filters.date : true;

  return isDepartmentMatch && isEmployeeIDMatch && isDateMatch;
});


    return (
        <div>
            <UpperPart/>
            <div className="flex flex-col lg:flex-row gap-10 mt-5">
                <div className="lg:w-2/5">
                    <Card className="h-[300px] ">
                        <CardHeader>
                          <CardTitle className="text-[#04080F] text-xl font-semibold leading-7">Total Leave Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={data}
                                    margin={{
                                        top: 0,
                                        right: 20,
                                        left: 20,
                                        bottom: 90,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis ticks={[0, 20, 40, 60, 80,]} domain={[0, 80]} />
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    {/* <Bar dataKey="value" fill="#4B6DAA" barSize={40} /> */}
                                    {/* Single Bar component with dynamic colors */}
                                    <Bar dataKey="value" barSize={40}>
                                      {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                      <LabelList dataKey="value" position="top" formatter={(value: any) => `${value}%`} /> 
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:w-3/5 md:w-full w-full flex flex-col lg:flex-row md:flex-row gap-4 bg-[#F8F8F8] px-2 py-4 rounded-lg lg:h-[300px] ">
                    <div className="lg:w-4/12 md:w-4/12 w-full">
                        <p className="bg-[#D3D3D3] text-[#7C7C7C] font-normal text-xs py-2 px-4">Employee ID</p>
                        <p className="bg-[#F3F4F8] text-[#7C7C7C] font-normal text-xs py-4 px-4">C1024</p>
                        <p className="bg-[#D3D3D3] text-[#7C7C7C] font-normal text-xs py-2 px-4">Employee Name</p>
                        <div className="bg-[#F3F4F8] text-[#7C7C7C] font-normal text-xs py-4 px-4 flex items-center justify-start gap-2">
                            <img className="w-[18px] h-[18px] rounded-full" src="https://i.ibb.co.com/fCx3Y8R/Ellipse-1.webp" alt="" />
                            <p className="leading-[18px] text-xs">Nitta  Ranjan Sarker</p>
                        </div>
                        <p className="bg-[#D3D3D3] text-[#7C7C7C] font-normal text-xs py-2 px-4">Department</p>
                        <div className="bg-[#F3F4F8] text-[#7C7C7C] font-normal text-xs py-4 px-4 flex items-center justify-start gap-2">
                            <FaBuilding className="w-[18px] h-[18px]"></FaBuilding>
                            <p className="leading-[18px] text-xs">Developer</p>
                        </div>
                    </div>
                    <div className="lg:w-8/12 md:w-8/12 w-full">
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <p className="text-[#7C7C7C] text-xs font-normal">Leave data</p>
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
                                      {date ? format(date, "PPP") : <span className="text-[#F8F8F8]">Date</span>}
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
                        </div>
                        <div className="mt-5 bg-[#F8F8F8] rounded-lg pb-3 pt-1">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="bg-[#0000000F] text-[#7C7C7C] text-[10px] font-normal border border-gray-300">Sick Leave</TableHead>
                                  <TableHead className="bg-[#0000000F] text-[#7C7C7C] text-[10px] font-normal border border-gray-300">Paid Leave</TableHead>
                                  <TableHead className="bg-[#0000000F] text-[#7C7C7C] text-[10px] font-normal border border-gray-300">Non Leave</TableHead>
                                  <TableHead className="bg-[#0000000F] text-[#7C7C7C] text-[10px] font-normal border border-gray-300"></TableHead>
                                  <TableHead className="bg-[#0000000F] text-[#7C7C7C] text-[10px] font-normal border border-gray-300"> </TableHead>
                                  <TableHead className="bg-[#0000000F] text-[#7C7C7C] text-[10px] font-normal border border-gray-300"></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody className="bg-[#FFFFFF01] border">
                                {invoices.map((invoice) => (
                                  <TableRow key={invoice.invoice} className="border bg-white">
                                    <TableCell className="border border-gray-300">2</TableCell>
                                    <TableCell className="border border-gray-300">4</TableCell>
                                    <TableCell className="border border-gray-300">28</TableCell>
                                    <TableCell className="border border-gray-300"></TableCell>
                                    <TableCell className="border border-gray-300"></TableCell>
                                    <TableCell className="border border-gray-300"></TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </div>
    
                    </div>
                </div>
            </div>

            <div className="mt-5 bg-[#F8F8F8] rounded-lg pb-3 pt-1">
                <Table className="border-separate border-spacing-2">
                  <TableCaption>A list of your Employee Leave.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Employee ID</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Employee Name</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Department</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Status</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Leave Status</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Leave Type</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                      {filteredEmployees?.map((employee: any) => {
                      const { leaveData } = getLeaveData(employee._id);
                      return (
                      <TableRow key={employee.employeeId}>
                        <TableCell className="font-medium bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md ">{employee?.employeeId}</TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                            <div className="flex items-center justify-start gap-2 ">
                                <img className="w-[18px] h-[18px] rounded-full" src="https://i.ibb.co.com/fCx3Y8R/Ellipse-1.webp" alt="" />
                                <p className="leading-[18px] text-xs">{employee?.employeeName}</p>
                            </div>
                        </TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] rounded-md ">
                            <div className="flex items-center justify-start gap-2">
                            <FaBuilding className="w-[18px] h-[18px]"></FaBuilding>
                            <p className="leading-[18px] text-xs">{employee?.departmentName}</p>
                            </div>
                        </TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md leading-[18px] ">{leaveData?.status || "N/A"}</TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md ">
                            <div className="flex items-center justify-start gap-2">
                                <p className="w-[12px] h-[12px] border bg-[#3D5A8F]"></p>
                                <p className="leading-[18px] text-xs">{leaveData?.leaveStatus || "N/A"}</p>
                            </div>
                        </TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                            <div className="flex items-center justify-start gap-2 ">
                                <p className="w-[12px] h-[12px] border bg-[#3D5A8F]"></p>
                                <p className="leading-[18px] text-xs">{leaveData?.leaveType || "N/A"}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            {/* <Button className="  h-[16px] text-xs rounded-md"> */}
                                {/* <FaFileLines></FaFileLines> */}
                               {/* </Button> */}
                               <FaEllipsis className="h-[20px] w-[20px] text-[#7C7C7C] mx-auto"></FaEllipsis>
                        </TableCell>
                      </TableRow>
                       );
                      })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      {/* <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell> */}
                    </TableRow>
                  </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default Leave;