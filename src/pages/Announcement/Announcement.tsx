import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAddAnnouncementMutation } from "@/redux/features/announcement/announcementApi";
import { useGetAllEmployeeQuery } from "@/redux/features/employee/employeeApi";
import { SelectContent } from "@radix-ui/react-select";
import { doesNotMatch } from "assert";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaBullhorn, FaPaperPlane } from "react-icons/fa";
import { FaClipboardUser, FaTrashCan } from "react-icons/fa6";
import { useQueryClient } from "react-query";
import { toast } from "sonner";

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

type TFormData = {
  departmentName: string,
  description: string
}

const Announcement = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const {data: getAllEmployee} = useGetAllEmployeeQuery(undefined)
  const [addAnnouncement] = useAddAnnouncementMutation()
  const queryClient = useQueryClient();


  //handle form
  const onSubmit : SubmitHandler<TFormData> = async (data) => {
    const toastId = toast.loading("announcement in");
    try {
      const formInfo = {
        departmentName: data.departmentName,
        description: data.description,
      };

      addAnnouncement(formInfo)
      toast.success("Announcement Done.", { id: toastId, duration: 2000 });
      queryClient.invalidateQueries("announcement");
      
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

    return (
        <div>
            <div className="flex flex-col md:flex-row lg:flex-row gap-16 w-full">
                <div className="w-full">
                    <Card className=" bg-[#459895] text-[#F8F8F8] p-8">
        
                        <div className="flex items-center gap-4">
                        <FaBullhorn className="w-[35px] h-[30px] text-[#F8F8F8]"></FaBullhorn>
                        <h1 className="text-xl font-semibold leading-7">Announcement</h1> 
                        </div>                     

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="flex items-center justify-between gap-8">
                            <div>
                              <p className="text-xs">Select Department</p>
                            </div>
                            <div>
                              <Select
                                {...register("departmentName", { required: "Please select a department" })}
                                onValueChange={(value) => setValue("departmentName", value)} // Update the form value
                              >
                                <SelectTrigger className="w-[128px] h-[45px] bg-[#F8F8F8] text-[#459895] font-normal text-sm">
                                  <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Department</SelectLabel>
                                    {/* Map over employee data to get unique department names */}
                                    {getAllEmployee?.data
                                      ?.map((item) => item.departmentName) // Extract departments from employee data
                                      .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                                      .map((departmentName) => (
                                        <SelectItem key={departmentName} value={departmentName}>
                                          {departmentName}
                                        </SelectItem>
                                      ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                          
                              {/* Show validation error message if any */}
                              {errors.departmentName && (
                                <p className="text-red-500 text-xs mt-1">{errors?.departmentName?.message}</p>
                              )}
                            </div>
                          </div>
          
                          <div className="mt-5 flex items-center rounded-lg bg-[#F8F8F8] text-[#459895]">
                              <textarea
                                {...register("description", { required: "description is required" })} // Register the textarea
                                className="w-full bg-[#459895] text-[#F8F8F8] h-[150px] p-3 border rounded-md focus:outline-none focus:ring focus:ring-[#459895] text-sm"
                                placeholder="Write an announcement."
                              ></textarea>
                            </div>
                            {errors.message && (
                              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                            )}
              
                          <Button type="submit" className="bg-[#F8F8F8] text-[#459895] text-xs mt-3">
                              <FaPaperPlane className="w-[18px] h-[18px]"></FaPaperPlane>
                              Send
                          </Button>
                        </form>
                    </Card>


                </div>
                <div className="w-full">
                    <Card className=" bg-[#3D5A8F] text-[#F8F8F8]">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold leading-7">Employee Announcement</CardTitle>   
                        <CardDescription className="text-[#F8F8F8]">
                            <div className="flex items-center justify-between gap-8">
                                <div>
                                    <p className="text-xs">Employee  Details</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* <div className="relative">
                                        <span className="absolute inset-y-0 left-3 flex items-center text-[#459895]">
                                            <FaClipboardUser></FaClipboardUser>
                                        </span>
                                        <Input className="text-[#459895]" type="employeeId" placeholder="Employee ID" />
                                    </div> */}
                                    <div className="relative flex items-center rounded-lg bg-[#F8F8F8] text-[#459895]">
                                        <FaClipboardUser
                                          className="absolute right-2"
                                        />
                                      <input
                                        className="shadow text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#459895]"
                                        {...register("id")}
                                        name="EmployeeId"
                                        placeholder="Employee ID"
                                    
                                      />
                                    </div>
                                    <div>
                                        <Select>
                                          <SelectTrigger className="w-[128px] h-[45px] bg-[#F8F8F8] text-[#459895] font-normal text-sm">
                                            <SelectValue placeholder="Department" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>Department</SelectLabel>
                                              <SelectItem value="apple">Apple</SelectItem>
                                              <SelectItem value="banana">Banana</SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardDescription>                   
                        </CardHeader>
                      <CardContent>
                        <div className="border flex flex-col items-center justify-center rounded-lg py-10">
                            <FaBullhorn className="w-[40px] h-[36px]"></FaBullhorn>
                            <p className="text-sm mt-3">Write an announcement</p>
                        </div>    
                      </CardContent>
                      <CardFooter className="">
                            <Button className="bg-[#F8F8F8] text-[#459895] text-xs">
                                <FaPaperPlane className="w-[18px] h-[18px]"></FaPaperPlane>
                                Send
                            </Button>
                      </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="bg-white mt-1 pt-5 px-5 rounded-lg">
                <div className="flex flex-col md:flex-row lg:flex-row gap-5 bg-[#F8F8F8]">
                    <div className="md:w-2/12 lg::w-1/12 p-4 flex items-center justify-center">
                        <FaBullhorn className="w-[40px] h-[38px] text-[#F8F8F8] border rounded-full bg-[#463684] p-2"></FaBullhorn>
                    </div>
                    <div className="md:w-10/12 lg:11/12">
                        <Table className="">                          
                            <TableHeader>
                            <TableRow>
                              <TableHead className="bg-[#F3F4F8] text-[#54246D] text-xs">Date</TableHead>
                              <TableHead className="bg-[#F3F4F8] text-[#54246D] text-xs">Department Name</TableHead>
                              <TableHead className="bg-[#F3F4F8] text-[#54246D] text-xs">Announcement</TableHead>
                              <TableHead className="bg-[#F3F4F8] text-[#54246D] text-xs"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {invoices.map((invoice) => (
                              <TableRow key={invoice.invoice} className="bg-[#FFFFFF01]">
                                <TableCell className="font-medium text-[#04080F] text-xs">{invoice.invoice}</TableCell>
                                <TableCell className=" text-[#7C7C7C] font-bold text-xs">UI/UX</TableCell>
                                <TableCell className=" text-[#7C7C7C] text-xs text-justify">
                                    Lorem ipsum dolor sit amet consectetur. Purus enim leo adipiscing porttitor viverra arcu malesuada commodo consectetur. Malesuada non aenean in pharetra adipiscing.
                                </TableCell>
                                <TableCell className=" text-[#7C7C7C] text-xs">
                                    <FaTrashCan className="text-[#E0D59A] w-[25px] h-[22px]"></FaTrashCan>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Announcement;