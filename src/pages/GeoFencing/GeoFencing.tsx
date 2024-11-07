
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FaClipboardUser, FaFileLines } from "react-icons/fa6";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GeoFencingData = [
  { name: "Group A", value: 100 },
  { name: "Group B", value: 100 },
  { name: "Group C", value: 100 },
  { name: "Group D", value: 100 }
];
const GeoFencingCOLORS = ["#d4d4d8", "#459895", "#d4d4d8", "#459895"];

const violenceData = [
    { name: "Group A", value: 100 },
    { name: "Group B", value: 100 },
    { name: "Group C", value: 100 },
    { name: "Group D", value: 100 }
  ];
  const violenceCOLORS = ["#d4d4d8", "#C3190C", "#d4d4d8", "#C3190C"];


const GeoFencing = () => {
    const { register } = useForm();

    return (
        <div className="flex flex-col md:flex-row lg:flex-row gap-10">
            <div className="lg:w-2/5">
                <Card className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-2 items-center">
                    <div>
                        <PieChart width={200} height={200}>
                          <Pie
                            data={GeoFencingData}
                            cx={100}
                            cy={100}
                            labelLine={false}
                            // label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {GeoFencingData.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={GeoFencingCOLORS[index % GeoFencingCOLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                        <div className="bg-[#F3F4F8] flex items-center justify-start gap-2 px-3 py-1 mt-2 mx-3 mb-5">
                            <p className="w-[12px] h-[12px] border bg-[#459895]"></p>
                            <p className="leading-[18px] text-xs">Geo-Fancing Reports</p>
                        </div>
                    </div>
        
                    <div>
                        <PieChart width={200} height={200}>
                          <Pie
                            data={violenceData}
                            cx={100}
                            cy={100}
                            labelLine={false}
                            // label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {violenceData.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={violenceCOLORS[index % violenceCOLORS.length]} />
                            ))}
                          </Pie> 
                        </PieChart>
                        <div className="bg-[#F3F4F8] flex items-center justify-start gap-2 px-3 py-1 mt-2 mx-3 mb-5">
                            <p className="w-[12px] h-[12px] border bg-[#C3190C]"></p>
                            <p className="leading-[18px] text-xs text-[#04080F]">Violence Report</p>
                        </div>
                    </div>
                </Card>
                <Card className="mt-5 py-10">
                    <div className="relative flex items-center rounded-lg px-10">
                        <FaClipboardUser
                          className="absolute w-[40px] text-[#D3D3D3]"
                        />
                      <input
                        className="pl-10 border shadow text-xs rounded w-full py-3 px-3 text-[#D3D3D3]"
                        {...register("id")}
                        name="id"
                        placeholder="Employee ID"
                      />
                    </div>
                    <div className="relative flex items-center rounded-lg px-10">
                        <FaClipboardUser
                          className="absolute w-[40px] text-[#D3D3D3]"
                        />
                      <input
                        className="pl-10 my-4 border shadow text-xs rounded w-full py-3 px-3 text-[#D3D3D3]"
                        {...register("name")}
                        name="name"
                        placeholder="Employee Name"
                      />
                    </div>
                    <div className="relative flex items-center rounded-lg px-10">
                        <FaClipboardUser
                          className="absolute w-[40px] text-[#D3D3D3]"
                        />
                      <input
                        className="pl-10 border shadow text-xs rounded w-full py-3 px-3 text-[#D3D3D3]"
                        {...register("address")}
                        name="address"
                        placeholder="Employee Address"
                      />
                    </div>

                    <div className="flex gap-5 items-center justify-end mt-10 mr-10">
                        <Button className="text-xs rounded-md bg-[#3D5A8F] text-[#F8F8F8]">
                            <FaFileLines></FaFileLines>
                            <span>Generate reports</span>
                        </Button>
                        <Button className="text-xs rounded-md bg-[#459895] text-[#F8F8F8]">
                            <FaSearch></FaSearch>
                            <span>Search</span>
                        </Button>
                    </div>
                </Card>
            </div>
            <div className="lg:w-3/5">
                <div className="w-full h-72 md:h-[380px] border-0 overflow-hidden rounded-lg">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29199.778834555593!2d90.43375574430222!3d23.819582092385446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fce7d991f%3A0xacfaf1ac8e944c05!2sBasundhara%20Residential%20Area%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1730802618025!5m2!1sen!2sbd" 
                        className="w-full h-[400px] rounded-lg" 
                        // allowfullscreen="" 
                        loading="lazy" 
                        // referrerpolicy="no-referrer-when-downgrade"
                        >
                    </iframe>
                </div>
                <Card className="px-10 py-6 mt-5">
                    <h1 className="text-sm text-[#04080F]">History</h1>
                    <Card className="mt-5 bg-[#F8F8F8] flex flex-row items-center justify-center gap-5 py-2 px-2">
                        <div className="lg:w-2/12 md:w-2/12 w-1/12">
                            <FaMapMarkerAlt className="border rounded-full p-2 w-[30px] h-[30px] text-white bg-[#E0D59A]"></FaMapMarkerAlt>
                        </div>
                        <div className="lg:w-10/12 md:w-10/12 w-11/12">
                            <p className="text-xs text-[#04080F] text-justify">Lorem ipsum dolor sit amet consectetur. Est ornare sed vestibulum praesent aenean eu gravida adipiscing. Velit iaculis enim ac feugiat accumsan.</p>
                        </div>
                    </Card>

                </Card>
            </div>

           
        </div>
    );
};

export default GeoFencing;