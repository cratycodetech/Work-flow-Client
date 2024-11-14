/* eslint-disable @typescript-eslint/no-explicit-any */
import UpperPart from "@/components/functionalities/UpperPart";
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
import { useGetAllEmployeeQuery } from "@/redux/features/employee/employeeApi";
import { selectFilter } from "@/redux/features/filters/filterSlice";
import { useGetAllSalaryQuery } from "@/redux/features/salary/salaryApi";
import { useAppSelector } from "@/redux/hook";
import { FaEllipsis } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { usePDF } from "react-to-pdf";

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

const Salary = () => {
  const { data: GetAllEmployee } = useGetAllEmployeeQuery(undefined);
  const { data: GetAllSalary } = useGetAllSalaryQuery(undefined);
  //for filter
  const filters = useAppSelector(selectFilter);

  //get others data for show all table column
  const getEmployeeData = (employeeId: string) => {
    const salaryData = GetAllSalary?.data?.find(
      (salary: any) => salary.employeeId === employeeId
    );
    return { salaryData };
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

  //for export data in pdf
  const { toPDF, targetRef } = usePDF({filename: 'report.pdf'});


    return (
        <div>
            <UpperPart toPDF={toPDF}/>
            <div ref={targetRef} className="mt-8 bg-[#F8F8F8] rounded-lg pb-3">
                <Table className="">
                  <TableCaption>A list of your Employees Salary.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Employee ID</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Name</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Department</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Contact Info</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Base Salary</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Deductions</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Bonus</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300">Salary(Overall)</TableHead>
                      <TableHead className="bg-[#F3F4F8] text-[#7C7C7C] text-xs font-normal border border-gray-300 text-center">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees?.map((employee: any) => {
                    const { salaryData } = getEmployeeData(employee._id);
                    return (
                      <TableRow key={employee.employeeId} className="bg-[#FFFFFF01]">
                        <TableCell className="font-medium text-[#7C7C7C] text-xs border border-gray-300">{employee?.employeeId}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{employee?.employeeName}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{employee?.departmentName}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{employee?.employeeNumber}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{salaryData?.baseSalary || "N/A"}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{salaryData?.deductions || "N/A"}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{salaryData?.bonus || "N/A"}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">{salaryData?.totalSalary || "N/A"}</TableCell>
                        <TableCell className="border border-gray-300">
                            {/* <Button className="  h-[16px] text-xs rounded-md"> */}
                                {/* <FaFileLines></FaFileLines> */}
                               {/* </Button> */}
                               <Link to={`/salaryDetails/${employee?._id}`}>
                                    <FaEllipsis className="h-[20px] w-[20px] text-[#463684] mx-auto "></FaEllipsis>
                               </Link>
                        </TableCell>
                      </TableRow>
                     );
                    })}
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

export default Salary;