
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
import AttendanceDetailsModal from "@/components/modals/AttendanceDetailsModal";
import UpperPart from "@/components/functionalities/UpperPart";
   
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
  
const Attendance = () => {
    // const [date, setDate] = useState<Date>()

    return (
        <div>
            <UpperPart/>
            <div className="mt-8 bg-[#F8F8F8] rounded-lg pb-3 pt-1">
                <Table className="border-separate border-spacing-2">
                  <TableCaption>A list of your Employee Attendance.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Employee ID</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Employee Name</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Department</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Employee Salary</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Employee Status</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal">Salary Status</TableHead>
                      <TableHead className="bg-[#7C7C7C] text-[#F8F8F8] rounded-md text-sm font-normal text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md ">{invoice.invoice}</TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                            <div className="flex items-center justify-start gap-2 ">
                                <img className="w-[18px] h-[18px] rounded-full" src="https://i.ibb.co.com/fCx3Y8R/Ellipse-1.webp" alt="" />
                                <p className="leading-[18px] text-xs">Rimon Ron</p>
                            </div>
                        </TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] rounded-md ">
                            <div className="flex items-center justify-start gap-2">
                            <FaBuilding className="w-[18px] h-[18px]"></FaBuilding>
                            <p className="leading-[18px] text-xs">Developer</p>
                            </div>
                        </TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md leading-[18px] ">BDT 8000 TK</TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md ">
                            <div className="flex items-center justify-start gap-2">
                                <p className="w-[12px] h-[12px] border bg-[#3D5A8F]"></p>
                                <p className="leading-[18px] text-xs">Present</p>
                            </div>
                        </TableCell>
                        <TableCell className="bg-[#F3F4F8] text-[#7C7C7C] text-xs rounded-md">
                            <div className="flex items-center justify-start gap-2 ">
                                <p className="w-[12px] h-[12px] border bg-[#3D5A8F]"></p>
                                <p className="leading-[18px] text-xs">Distribution</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            {/* <Button className="  h-[16px] text-xs rounded-md"> */}
                                {/* <FaFileLines></FaFileLines> */}
                               {/* </Button> */}
                            <AttendanceDetailsModal/>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default Attendance;