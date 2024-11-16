/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import CustomLegend from "@/components/charts/SalaryChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetTotalEmployeeQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
import { useGetLatestAnnouncementQuery } from "@/redux/features/announcement/announcementApi";
import { useGetTodayAbsentCountEmployeeQuery, useGetTodayPresentCountEmployeeQuery, useGetTodayTotalAbsentEmployeeQuery, useGetTodayTotalLateEmployeeQuery, useGetTodayTotalPresentEmployeeQuery } from "@/redux/features/attendance/attendanceApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { FaBullhorn, FaCalendarCheck, FaClock, FaUserClock } from "react-icons/fa"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import moment from "moment";
import { useGetTodayLeaveStatusCountQuery } from "@/redux/features/leave/leaveApi";
import { useGetCountDeductionSalaryQuery, useGetCountDistributionSalaryQuery, useGetCountPendingSalaryQuery } from "@/redux/features/salary/salaryApi";

// Define the data for the pie chart
// const PieData = [
//   { name: 'Approved', value: 100 },
//   { name: 'Pending', value: 10 },
//   { name: 'Denied', value: 20 },
// ];
// Define colors for the pie chart slices
const COLORS = ['#3D5A8F', '#459895', '#E0D59A'];

// //dummy data for Attendance Summary but did not use
// const data = [
//     { name: 'Present', value: 21 },
//     { name: 'Absent', value: 79 },
// ];

// const salaryData = [
//   { name: "Salary Overview", Distribution: 80, Pendings: 60, Deductions: 20 },
// ];
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
  const {data: getLatestAnnouncement} = useGetLatestAnnouncementQuery(undefined)
  const {data: getTodayTotalPresentEmployees} = useGetTodayTotalPresentEmployeeQuery(undefined)
  const {data: getTodayTotalLateEmployees} = useGetTodayTotalLateEmployeeQuery(undefined)
  const {data: getTodayTotalAbsentEmployees} = useGetTodayTotalAbsentEmployeeQuery(undefined)

  //for attendance summary graph
  const {data: getPresentCount} = useGetTodayPresentCountEmployeeQuery(undefined)
  const {data: getAbsentCount} = useGetTodayAbsentCountEmployeeQuery(undefined)
  // Fallback to dummy data if count is 0
  const presentData = getPresentCount?.count > 0 ? getPresentCount : { name: "Absent", count: 79 }; // Replace with a dummy value
  const absentData = getAbsentCount?.count > 0 ? getAbsentCount : { name: "Absent", count: 21 }; // Replace with a dummy value
  const chartData = [presentData, absentData];

  //for leave status graph
  const {data: getTodayLeaveStatusCount} = useGetTodayLeaveStatusCountQuery(undefined)
  // Fallback to dummy values if API data has zero or undefined values
    const leaveChartData = [
      {
        name: "Approved",
        value: getTodayLeaveStatusCount?.approved > 0 ? getTodayLeaveStatusCount.approved : 100,
      },
      {
        name: "Pending",
        value: getTodayLeaveStatusCount?.pending > 0 ? getTodayLeaveStatusCount.pending : 10,
      },
      {
        name: "Denied",
        value: getTodayLeaveStatusCount?.denied > 0 ? getTodayLeaveStatusCount.denied : 20,
      },
    ];

  //for salary overview graph
  const {data: getCountDistributionSalary} = useGetCountDistributionSalaryQuery(undefined)
  const {data: getCountDeductionSalary} = useGetCountDeductionSalaryQuery(undefined)
  const {data: getCountPendingSalary} = useGetCountPendingSalaryQuery(undefined)
  // Fallback to dummy data if count is 0 or the data is undefined
  const distributionValue = getCountDistributionSalary?.count > 0 ? getCountDistributionSalary.count : 80;
  const deductionValue = getCountDeductionSalary?.count > 0 ? getCountDeductionSalary.count : 20;
  const pendingValue = getCountPendingSalary?.count > 0 ? getCountPendingSalary.count : 60;
  // Prepare the data for the chart
  const salaryChartData = [
    {
      name: "Salary Overview",
      Distribution: distributionValue,
      Pendings: pendingValue,
      Deductions: deductionValue,
    },
  ];

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
                            <h1 className="text-[#E0D59A] font-bold text-2xl">{getTodayTotalPresentEmployees?.count}</h1>
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
                            <h1 className="text-[#459895] font-bold text-2xl">{getTodayTotalAbsentEmployees?.count}</h1>
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
                            <h1 className="text-[#54246D] font-bold text-2xl">{getTodayTotalLateEmployees?.count}</h1>
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
                                    data={chartData}
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
                                    <Tooltip formatter={(count) => `${count}%`} />
                                    <Bar dataKey="count" fill="#4B6DAA" barSize={40} />
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
                                    payload={leaveChartData?.map((entry, index) => ({
                                      id: entry.name,
                                      type: 'circle',
                                      value: entry.name,
                                      color: COLORS[index % COLORS.length],
                                    }))}
                                  />
                            
                                  <Pie
                                    data={leaveChartData}
                                    cx={-30}
                                    cy={85}
                                    innerRadius={50}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    // paddingAngle={0}
                                    dataKey="value"
                                  >
                                    {leaveChartData?.map((_entry, index) => (
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
                                data={salaryChartData}
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
                    <div className="mt-2 flex flex-col md:flex-row lg:flex-row gap-5 bg-[#F8F8F8]">
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
                                  <TableRow key={getLatestAnnouncement?._id} className="bg-[#FFFFFF01]">
                                    <TableCell className="font-medium text-[#04080F] text-xs">
                                      {moment(new Date(`${getLatestAnnouncement?.createdAt}`)).format('DD MMMM YYYY')}
                                    </TableCell>
                                    <TableCell className=" text-[#7C7C7C] font-bold text-xs">{getLatestAnnouncement?.departmentName}</TableCell>
                                    <TableCell className=" text-[#7C7C7C] text-xs text-justify">{getLatestAnnouncement?.description}</TableCell>
                                  </TableRow>
                              </TableBody>
                            </Table>
                        </div>
                    </div>

           
                </div>

            </div>
        </div>
    );
};

export default Dashboard;