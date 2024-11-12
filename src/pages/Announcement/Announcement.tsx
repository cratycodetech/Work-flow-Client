/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAddAnnouncementMutation, useDeleteAnnouncementMutation, useGetAllAnnouncementQuery } from "@/redux/features/announcement/announcementApi";
import { useGetAllEmployeeQuery } from "@/redux/features/employee/employeeApi";
import { SelectContent } from "@radix-ui/react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaBullhorn, FaPaperPlane } from "react-icons/fa";
import { FaClipboardUser, FaTrashCan } from "react-icons/fa6";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import moment from "moment";
import Swal from 'sweetalert2'



type TFormData = {
  departmentName: string,
  description: string,
  employeeId?: string
}

const Announcement = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TFormData>();
  const {data: getAllEmployee} = useGetAllEmployeeQuery(undefined)
  const [addAnnouncement] = useAddAnnouncementMutation()
  const queryClient = useQueryClient();
  const {data: getAllAnnouncement} = useGetAllAnnouncementQuery(undefined)
  const [deleteAnnouncement] = useDeleteAnnouncementMutation()


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

  //handle delete
  const handleDelete = async(id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async(result) => {
      if (result.isConfirmed) {
        await deleteAnnouncement(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

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
                                onValueChange={(value) => setValue("departmentName", value)}
                              >
                                <SelectTrigger className="w-[128px] h-[45px] bg-[#F8F8F8] text-[#459895] font-normal text-sm">
                                  <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Department</SelectLabel>
                                    {/* Map over employee data to get unique department names */}
                                    {getAllEmployee?.data
                                      ?.map((item: TFormData) => item.departmentName) // Extract departments from employee data
                                      .filter((value: any, index: any, self: any) => self.indexOf(value) === index) // Remove duplicates
                                      .map((departmentName : string) => (
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
                            {errors.description && (
                              <p className="text-red-500 text-xs mt-1">{errors?.description?.message}</p>
                            )}
              
                          <Button type="submit" className="bg-[#F8F8F8] text-[#459895] text-xs mt-3">
                              <FaPaperPlane className="w-[18px] h-[18px]"></FaPaperPlane>
                              Send
                          </Button>
                        </form>
                    </Card>
                </div>
                <div className="w-full">
                    <Card className="bg-[#3D5A8F] text-[#F8F8F8] p-8">
                      <div className="flex items-center gap-3">
                        <FaBullhorn className="w-[35px] h-[30px] text-[#F8F8F8]" />
                        <h1 className="text-xl font-semibold leading-7">Employee Announcement</h1>
                      </div>
                    
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex items-center justify-between gap-8">
                          <div>
                            <p className="text-xs">Employee Details</p>
                          </div>
                    
                          <div className="flex items-center gap-2">
                            <div className="relative flex items-center rounded-lg bg-[#F8F8F8] text-[#459895]">
                              <FaClipboardUser className="absolute right-2" />
                              <input
                                className="shadow text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#459895]"
                                {...register("employeeId")}
                                name="employeeId"
                                placeholder="Employee ID"
                              />
                              {errors.employeeId && (
                                <p className="text-red-500 text-xs mt-1">{errors.employeeId.message}</p>
                              )}
                            </div>
                           
                            <div>
                              <Select
                                {...register("departmentName", { required: "Please select a department" })}
                                onValueChange={(value) => setValue("departmentName", value)}
                              >
                                <SelectTrigger className="w-[128px] h-[45px] bg-[#F8F8F8] text-[#459895] font-normal text-sm">
                                  <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Department</SelectLabel>
                                    {/* Map over employee data to get unique department names */}
                                    {getAllEmployee?.data
                                      ?.map((item: TFormData) => item.departmentName) // Extract departments from employee data
                                      .filter((value: any, index: any, self: any) => self.indexOf(value) === index) // Remove duplicates
                                      .map((departmentName : string) => (
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
                        </div>
                    
                        <div className="mt-5 flex items-center rounded-lg bg-[#3D5A8F] text-[#F8F8F8] ">
                          <textarea
                            {...register("description", { required: "description is required" })} // Register the textarea
                            className="w-full  bg-[#3D5A8F] text-[#F8F8F8] h-[150px] p-3 border rounded-md focus:outline-none focus:ring focus:ring-[#459895] text-sm"
                            placeholder="Write an announcement."
                          ></textarea>
                        </div>
                        {errors.description && (
                          <p className="text-red-500 text-xs mt-1">{errors?.description?.message}</p>
                        )}
                    
                        <Button type="submit" className="bg-[#F8F8F8] text-[#459895] text-xs mt-3">
                          <FaPaperPlane className="w-[18px] h-[18px]" />
                          Send
                        </Button>
                      </form>
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
                            {getAllAnnouncement?.data?.map((invoice: any) => (
                              <TableRow key={invoice.invoice} className="bg-[#FFFFFF01]">
                                <TableCell className="font-medium text-[#04080F] text-xs">
                                  {moment(new Date(`${invoice?.createdAt}`)).format('DD MMMM YYYY')}
                                </TableCell>
                                <TableCell className=" text-[#7C7C7C] font-bold text-xs">{invoice?.departmentName}</TableCell>
                                <TableCell className=" text-[#7C7C7C] text-xs text-justify">{invoice?.description}</TableCell>
                                <TableCell className=" text-[#7C7C7C] text-xs">
                                    <FaTrashCan onClick={() => handleDelete(invoice?._id)} className="text-[#E0D59A] w-[25px] h-[22px]"></FaTrashCan>
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