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
import { FaEllipsis } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
    return (
        <div>
            <UpperPart/>
            <div className="mt-8 bg-[#F8F8F8] rounded-lg pb-3">
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
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice} className="bg-[#FFFFFF01]">
                        <TableCell className="font-medium text-[#7C7C7C] text-xs border border-gray-300">{invoice.invoice}</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">Rimon Ron</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">UI/UX</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">01398746</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">15000</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">500</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">620</TableCell>
                        <TableCell className=" text-[#7C7C7C] text-xs border border-gray-300">8120</TableCell>
                        <TableCell className="border border-gray-300">
                            {/* <Button className="  h-[16px] text-xs rounded-md"> */}
                                {/* <FaFileLines></FaFileLines> */}
                               {/* </Button> */}
                               <Link to="/salaryDetails/1">
                                    <FaEllipsis className="h-[20px] w-[20px] text-[#463684] mx-auto "></FaEllipsis>
                               </Link>
                        </TableCell>
                      </TableRow>
                    ))}
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