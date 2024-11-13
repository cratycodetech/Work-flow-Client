/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaBuilding } from "react-icons/fa";

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

const LeaveDetails = ({selectedEmployee}: any) => {
    // console.log(selectedEmployee);

    return (
        <div className="lg:w-3/5 md:w-full w-full flex flex-col lg:flex-row md:flex-row gap-4 bg-[#F8F8F8] px-2 py-4 rounded-lg lg:h-[300px] ">
            <div className="lg:w-4/12 md:w-4/12 w-full">
                <p className="bg-[#D3D3D3] text-[#7C7C7C] font-normal text-xs py-2 px-4">Employee ID</p>
                <p className="bg-[#F3F4F8] text-[#7C7C7C] font-normal text-xs py-4 px-4">{selectedEmployee?.employeeId}</p>
                <p className="bg-[#D3D3D3] text-[#7C7C7C] font-normal text-xs py-2 px-4">Employee Name</p>
                <div className="bg-[#F3F4F8] text-[#7C7C7C] font-normal text-xs py-4 px-4 flex items-center justify-start gap-2">
                    <img className="w-[18px] h-[18px] rounded-full" src="https://i.ibb.co.com/fCx3Y8R/Ellipse-1.webp" alt="" />
                    <p className="leading-[18px] text-xs">{selectedEmployee?.employeeName}</p>
                </div>
                <p className="bg-[#D3D3D3] text-[#7C7C7C] font-normal text-xs py-2 px-4">Department</p>
                <div className="bg-[#F3F4F8] text-[#7C7C7C] font-normal text-xs py-4 px-4 flex items-center justify-start gap-2">
                    <FaBuilding className="w-[18px] h-[18px]"></FaBuilding>
                    <p className="leading-[18px] text-xs">{selectedEmployee?.departmentName}</p>
                </div>
            </div>
            <div className="lg:w-8/12 md:w-8/12 w-full">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <p className="text-[#7C7C7C] text-xs font-normal">Leave data</p>
                    </div>
                    {/* <div>
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
                    </div> */}
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
    );
};

export default LeaveDetails;