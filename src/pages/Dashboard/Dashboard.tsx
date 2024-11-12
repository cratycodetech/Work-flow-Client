/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import CustomLegend from "@/components/charts/SalaryChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetAllEmployeeQuery, useGetTotalEmployeeQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
import { useGetTodayTotalLateEmployeeQuery, useGetTodayTotalPresentEmployeeQuery } from "@/redux/features/attendance/attendanceApi";

import { FaCalendarCheck, FaClock, FaUserClock } from "react-icons/fa"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell, Label } from 'recharts';

// Define the data for the pie chart
const PieData = [
  { name: 'Approved', value: 100 },
  { name: 'Pending', value: 10 },
  { name: 'Denied', value: 20 },
];
// Define colors for the pie chart slices
const COLORS = ['#3D5A8F', '#459895', '#E0D59A'];

const data = [
    { name: 'Present', value: 21 },
    { name: 'Absent', value: 79 },
];

export const salaryData = [
  { name: "Salary Overview", Distribution: 80, Pendings: 60, Deductions: 20 },
];
 export const SalaryCOLORS = ['#3D5A8F', '#459895', '#E0D59A'];


 // Define the data for the pie chart
const geoFencingData = [
  { name: 'geofencing zone', value: 79 },
  { name: 'violating the geofencing', value: 21 },
];
// Define colors for the pie chart slices
const geoFencingCOLORS = ['#3D5A8F', '#E0D59A'];


const Dashboard = () => {
  const {data: GetTotalEmployee} = useGetTotalEmployeeQuery(undefined)
  const {data: getTodayLateArrivalEmployees} = useGetTodayTotalLateEmployeeQuery(undefined)
  const {data: getTodayPresentEmployees} = useGetTodayTotalPresentEmployeeQuery(undefined)
    // console.log(getTodayPresentEmployees);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-between">
                <div className="">
                    <Card className="bg-[#3D5A8F] w-[250px] h-[140px] flex items-center justify-center">
                        <div className=" bg-[#F8F8F8] w-[188px] py-4 rounded-lg flex items-center justify-center">
                            <h1 className="text-[#3D5A8F] font-bold text-2xl">{GetTotalEmployee?.data}</h1>
                        </div>
                    </Card>
                </div>
                <div className="">
                    <Card className="bg-[#E0D59A] w-[250px] h-[140px] flex items-center justify-center gap-5">
                        <div>
                            <FaCalendarCheck className="text-[#F8F8F8] w-[22px] h-[25px]"></FaCalendarCheck>
                            <h1 className="font-normal text-sm text-[#F8F8F8] mt-5">Attendance</h1>
                        </div>
                        <div className=" bg-[#F8F8F8] w-[90px] h-[86px] rounded-lg flex items-center justify-center">
                            <h1 className="text-[#E0D59A] font-bold text-2xl">124</h1>
                        </div>
                    </Card>
                </div>
                <div className="">
                    <Card className="bg-[#459895] w-[250px] h-[140px] flex items-center justify-center gap-5">
                        <div>
                            <FaClock className="text-[#F8F8F8] w-[22px] h-[25px]"></FaClock>
                            <h1 className="font-normal text-sm text-[#F8F8F8] mt-5">Leave Count</h1>
                        </div>
                        <div className=" bg-[#F8F8F8] w-[90px] h-[86px] rounded-lg flex items-center justify-center">
                            <h1 className="text-[#459895] font-bold text-2xl">16</h1>
                        </div>
                    </Card>
                </div>
                <div className="">
                    <Card className="bg-[#54246D] w-[250px] h-[140px] flex items-center justify-center gap-5">
                        <div>
                            <FaUserClock className="text-[#F8F8F8] w-[22px] h-[25px]"></FaUserClock>
                            <h1 className="font-normal text-sm text-[#F8F8F8] mt-5">Late Arrival</h1>
                        </div>
                        <div className=" bg-[#F8F8F8] w-[90px] h-[86px] rounded-lg flex items-center justify-center">
                            <h1 className="text-[#54246D] font-bold text-2xl">{getTodayLateArrivalEmployees?.count}</h1>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 justify-between mt-8">
                <div className="">
                    <Card className="h-[300px] ">
                        <CardHeader>
                          <CardTitle className="text-[#04080F] text-xl font-semibold">Attendance Summary</CardTitle>
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
                                    <YAxis ticks={[0, 20, 40, 60, 80]} domain={[0, 80]} />
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    <Bar dataKey="value" fill="#4B6DAA" barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="">
                    <Card className="h-[300px] ">
                        <CardHeader>
                          <CardTitle className="text-[#04080F] text-xl font-semibold">Leave Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PieChart width={350} height={300}>
                                  <Legend className="rounded-full"
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="left"
                                    wrapperStyle={{
                                        marginTop: '-100px',
                                        marginLeft: '200px',
                                      }}
                                    payload={PieData.map((entry, index) => ({
                                      id: entry.name,
                                      type: 'circle',
                                      value: entry.name,
                                      color: COLORS[index % COLORS.length],
                                    }))}
                                  />
                            
                                  <Pie
                                    data={PieData}
                                    cx={-30}
                                    cy={85}
                                    innerRadius={50}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    // paddingAngle={0}
                                    dataKey="value"
                                  >
                                    {PieData?.map((_entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                </PieChart>
                        </CardContent>
                    </Card>
                </div>

                <div className="">
                    <Card className="h-[300px]">
                        <CardHeader>
                          <CardTitle className="text-[#04080F] text-xl font-semibold">Salary Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CustomLegend />
                            <ResponsiveContainer width="100%" height={150}>
                              <BarChart
                                layout="vertical"
                                data={salaryData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                barSize={20}
                              >
                                <XAxis
                                  type="number"
                                  domain={[0, 100]}
                                  ticks={[0, 20, 40, 60, 80, 100]}
                                  tickFormatter={(tick) => `${tick}K`}
                                />
                                <YAxis type="category" dataKey="name" />
                                <Tooltip formatter={(value) => `${value}K`} />
                                
                                {/* Separate Bars for each category */}
                                <Bar dataKey="Distribution" fill={SalaryCOLORS[0]} radius={[0, 10, 10, 0]}/>
                                <Bar dataKey="Pendings" fill={SalaryCOLORS[1]} radius={[0, 10, 10, 0]}/>
                                <Bar dataKey="Deductions" fill={SalaryCOLORS[2]} radius={[0, 10, 10, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

            </div>

            <div className="lg:flex gap-8 mt-8">
            <div className="lg:w-6/12 xl:w-4/12">
                    <Card className="">
                        <CardHeader>
                          <CardTitle className="text-[#04080F] text-xl font-semibold">Geo-Fencing Summary</CardTitle>
                            </CardHeader>
                                <PieChart width={350} height={200} className="px-3">
                                  <Legend className="rounded-full"
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="left"
                                    wrapperStyle={{
                                        marginTop: '-55px',
                                        marginLeft: '220px',
                                      }}
                                    payload={geoFencingData?.map((entry, index) => ({
                                      id: entry.name,
                                      type: 'square',
                                      value: entry.name,
                                      color: geoFencingCOLORS[index % geoFencingCOLORS.length],
                                    }))}
                                  />
                            
                                  <Pie
                                    data={geoFencingData}
                                    cx={-20}
                                    cy={85}
                                    innerRadius={50}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ value }) => `${((value / geoFencingData.reduce((acc, entry) => acc + entry.value, 0)) * 100).toFixed(0)}%`}
                                      labelLine={true}
      
                                  >
                                    {geoFencingData?.map((_entry, index) => (
                                      <Cell key={`cell-${index}`} fill={geoFencingCOLORS[index % geoFencingCOLORS.length]} />
                                    ))}
                                  </Pie>
                                </PieChart>
                    </Card>
                </div>

                <div className="lg:w-6/12 xl:w-8/12">
                    <Card className="bg-[#54246D] text-[#F8F8F8]">
                        <CardHeader>
                          <p className="text-xs font-normal">Upcoming</p>
                          <CardTitle className="text-xl font-semibold">Announcement</CardTitle>
                            </CardHeader>
                            <CardContent>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;