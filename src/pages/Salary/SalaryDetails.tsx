/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { FaBuilding } from "react-icons/fa";
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
import { Link, useParams } from "react-router-dom";
import { useGetSingleSalaryQuery } from "@/redux/features/salary/salaryApi";
import { useGetSingleEmployeeQuery } from "@/redux/features/employee/employeeApi";
import { useGetAllLeaveQuery, useGetSingleLeaveQuery } from "@/redux/features/leave/leaveApi";
import moment from "moment";

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
// Define interfaces for your data
type TEmployeeData = {
  employeeId: string;
  employeeName: string;
  departmentName: string;
}

type TLeaveData = {
  status: string;
  leaveType: string;
}


const SalaryDetails = () => {
  const { id } = useParams();
  const {data: getSingleEmployee} = useGetSingleEmployeeQuery(id)
  
  const {data: getAllLeave} = useGetAllLeaveQuery(undefined)
  const employeeID = getSingleEmployee?.data?._id;
  const employeeLeaves = getAllLeave?.data?.find((leave: any) => leave.employeeId === employeeID);

   // Use conditional chaining to prevent errors
   const employeeId = getSingleEmployee?.data?.employeeId ?? "N/A";
   const employeeName = getSingleEmployee?.data?.employeeName ?? "N/A";
   const departmentName = getSingleEmployee?.data?.departmentName ?? "N/A";

    return (
        <div>
            <div>
                <Breadcrumb>
                  <BreadcrumbList className="text-xs text-[#000000]">
                    <BreadcrumbItem>
                        <BreadcrumbPage>Salary Details</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Employee</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="py-3 px-5 flex lg:flex-row gap-16">
                <div>
                    <img src="https://i.ibb.co.com/VLQJ6p4/Frame-75.webp" alt="" />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row gap-8">
                <div className="pt-2">
                    <p className="text-[#7C7C7C] text-xs py-3 px-2">Employee ID</p>
                    <p className="bg-[#F8F8F8] text-[#04080F] text-xs py-3 px-2 lg:w-[166px]">{employeeId}</p>
                </div>
                <div className="pt-2">
                    <p className="text-[#7C7C7C] text-xs py-3 px-2">Employee Name</p>
                    <div className="flex items-center justify-start gap-2 bg-[#F8F8F8] py-3 px-2 lg:w-[166px]">
                        <img className="w-[18px] h-[18px] rounded-full" src="https://i.ibb.co.com/fCx3Y8R/Ellipse-1.webp" alt="" />
                        <p className="text-[#04080F] text-xs">{employeeName}</p>
                    </div>
                </div>
                <div className="pt-2">
                    <p className="text-[#7C7C7C] text-xs py-3 px-2">Department</p>
                    <div className="flex items-center justify-start gap-2 bg-[#F8F8F8] py-3 px-2 lg:w-[166px]">
                        <FaBuilding className="w-[18px] h-[18px]"></FaBuilding>
                        <p className="text-[#04080F] text-xs">{departmentName}</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="mt-8 bg-[#F8F8F8] rounded-lg pb-3">
                <Table className="">
                  <TableCaption>A Salary Employees Details.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#F3F4F8] text-[#04080F] text-xs font-normal border border-gray-300">Date</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#04080F] text-xs font-normal border border-gray-300">Status</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#04080F] text-xs font-normal border border-gray-300">Leave Type</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#04080F] text-xs font-normal border border-gray-300">Info</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#04080F] text-xs font-normal border border-gray-300">Info</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#04080F] text-xs font-normal border border-gray-300">Info</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#04080F] text-xs font-normal border border-gray-300">Info</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                   
                      <TableRow className="bg-[#FFFFFF01]">
                        <TableCell className="font-medium text-[#7C7C7C] text-xs border border-gray-300">{moment(new Date(`${employeeLeaves?.createdAt}`)).format('DD MMMM YYYY') || "N/A"}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{employeeLeaves?.leaveStatus || "N/A"}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{employeeLeaves?.leaveType || "N/A"}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300"></TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300"></TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300"></TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300"></TableCell>                      </TableRow>

                  </TableBody>
                  <TableFooter>
                    <TableRow>
                    </TableRow>
                  </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default SalaryDetails;