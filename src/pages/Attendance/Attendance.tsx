/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@/components/ui/table";
import AttendanceDetailsModal from "@/components/modals/AttendanceDetailsModal";
import UpperPart from "@/components/functionalities/UpperPart";
import { useGetAllEmployeeQuery } from "@/redux/features/employee/employeeApi";
import { useGetAllSalaryQuery } from "@/redux/features/salary/salaryApi";
import { useGetAllLeaveQuery } from "@/redux/features/leave/leaveApi";
import { useAppSelector } from "@/redux/hook";
import { selectFilter } from "@/redux/features/filters/filterSlice";
import { usePDF } from "react-to-pdf";

const Attendance = () => {
  const { data: GetAllEmployee } = useGetAllEmployeeQuery(undefined);
  const { data: GetAllSalary } = useGetAllSalaryQuery(undefined);
  const { data: GetAllLeave } = useGetAllLeaveQuery(undefined);
  //for filter
  const filters = useAppSelector(selectFilter);


  //get others data for show all table column
  const getEmployeeData = (employeeId: string) => {
    const salaryData = GetAllSalary?.data?.find(
      (salary: any) => salary.employeeId === employeeId
    );
    const leaveData = GetAllLeave?.data?.find(
      (leave: any) => leave.employeeId === employeeId
    );
    return { salaryData, leaveData };
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
      <UpperPart toPDF={toPDF}></UpperPart>
      <div ref={targetRef} className="mt-8 bg-[#F8F8F8] rounded-lg pb-3 pt-1">
        <Table className="border-separate border-spacing-2">
          <TableCaption>A list of your Employee Attendance.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">
                Employee ID
              </TableHead>
              <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">
                Employee Name
              </TableHead>
              <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">
                Department
              </TableHead>
              <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">
                Employee Salary
              </TableHead>
              <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">
                Employee Status
              </TableHead>
              <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">
                Salary Status
              </TableHead>
              <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees?.map((employee: any) => {
              const { salaryData, leaveData } = getEmployeeData(employee._id);
              return (
                <TableRow key={employee.employeeId}>
                  <TableCell className="font-medium bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                    {employee.employeeId}
                  </TableCell>
                  <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                    <div className="flex items-center justify-start gap-2">
                      <img
                        className="w-[18px] h-[18px] rounded-full"
                        src="https://i.ibb.co.com/fCx3Y8R/Ellipse-1.webp"
                        alt=""
                      />
                      <p className="leading-[18px] text-xs">
                        {employee.employeeName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] rounded-md">
                    <div className="flex items-center justify-start gap-2">
                      <FaBuilding className="w-[18px] h-[18px]" />
                      <p className="leading-[18px] text-xs">
                        {employee.departmentName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md leading-[18px]">
                    BDT {employee?.employeeSalary || "N/A"} TK
                  </TableCell>
                  <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                    <div className="flex items-center justify-start gap-2">
                      <p className="w-[12px] h-[12px] border bg-[#3D5A8F]"></p>
                      <p className="leading-[18px] text-xs">{leaveData?.status || "N/A"}</p>
                    </div>
                  </TableCell>
                  <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                    <div className="flex items-center justify-start gap-2">
                      <p className="w-[12px] h-[12px] border bg-[#3D5A8F]"></p>
                      <p className="leading-[18px] text-xs">
                        {salaryData?.salaryStatus || "N/A"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AttendanceDetailsModal employee={employee} ></AttendanceDetailsModal>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Attendance;
