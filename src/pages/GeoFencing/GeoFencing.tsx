/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAllGeoCodeLocationQuery, useGetSingleEmployeeLocationQuery } from "@/redux/features/geoFencing/geoFencingApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FaClipboardUser, FaFileLines } from "react-icons/fa6";
import { PieChart, Pie, Cell } from "recharts";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix for default marker icon not showing in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  type TFormData = {
    employeeId: string,
    employeeName: string,
    location: string,
  }

const GeoFencing = () => {
    const { register, handleSubmit } = useForm<TFormData>();
    const [formData, setFormData] = useState<TFormData | null>(null);
    const {data: GeoFencing} = useGetAllGeoCodeLocationQuery(undefined)
    //get single
    const { data: singleEmployeeFencing } = useGetSingleEmployeeLocationQuery(
      formData,
      { skip: !formData }
    );

    // State to store center latitude and longitude dynamically
  const [centerLatitude, setCenterLatitude] = useState<number | null>(null);
  const [centerLongitude, setCenterLongitude] = useState<number | null>(null);
  // console.log(singleEmployeeFencing?.employeeId);
  console.log(centerLatitude);
  console.log(centerLongitude);
    
    // // const { address, employeeId, employeeName, latitude, longitude } = singleEmployeeFencing
    console.log(singleEmployeeFencing);
    // console.log(singleEmployeeFencing?.latitude);
    // console.log(singleEmployeeFencing?.longitude);
   
    

  // Check and map over the data
  const geoLocations = GeoFencing?.data?.map((singleGeo: any) => {
    const { _id, location, radius } = singleGeo;
    const [long, lat] = location.coordinates;
    // Return the my required data
    return {
      _id,
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
      radius: parseInt(radius.replace('m', '')), // for ensure the radius is a number
    };
  });

  // Form submission handler
  const onSubmit: SubmitHandler<TFormData> = (data: TFormData) => {
    const newFormData = {
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      location: data.location,
    };
    setFormData(newFormData); 

    // Update the map center based on the selected employee location
    if (singleEmployeeFencing) {
      setCenterLatitude(singleEmployeeFencing?.latitude);
      setCenterLongitude(singleEmployeeFencing?.longitude);
    }
  };

    // Update the map center when formData or singleEmployeeFencing changes
    useEffect(() => {
      if (singleEmployeeFencing) {
        setCenterLatitude(singleEmployeeFencing.latitude);
        setCenterLongitude(singleEmployeeFencing.longitude);
      }
    }, [singleEmployeeFencing]);


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
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative flex items-center rounded-lg px-10">
                        <FaClipboardUser
                          className="absolute w-[40px] text-[#D3D3D3]"
                        />
                      <input
                        className="pl-10 border shadow text-xs rounded w-full py-3 px-3 text-[#D3D3D3]"
                        {...register("employeeId")}
                        name="employeeId"
                        placeholder="Employee ID"
                      />
                    </div>
                    <div className="relative flex items-center rounded-lg px-10">
                        <FaClipboardUser
                          className="absolute w-[40px] text-[#D3D3D3]"
                        />
                      <input
                        className="pl-10 my-4 border shadow text-xs rounded w-full py-3 px-3 text-[#D3D3D3]"
                        {...register("employeeName")}
                        name="employeeName"
                        placeholder="Employee Name"
                      />
                    </div>
                    <div className="relative flex items-center rounded-lg px-10">
                        <FaClipboardUser
                          className="absolute w-[40px] text-[#D3D3D3]"
                        />
                      <input
                        className="pl-10 border shadow text-xs rounded w-full py-3 px-3 text-[#D3D3D3]"
                        {...register("location")}
                        name="location"
                        placeholder="Employee Address"
                      />
                    </div>

                    <div className="flex gap-5 items-center justify-end mt-10 mr-10">
                        {/* <Button className="text-xs rounded-md bg-[#3D5A8F] text-[#F8F8F8]">
                            <FaFileLines></FaFileLines>
                            <span>Generate reports</span>
                        </Button> */}
                        <Button className="text-xs rounded-md bg-[#459895] text-[#F8F8F8]">
                            <FaSearch></FaSearch>
                            <span>Search</span>
                        </Button>
                    </div>

                    </form>
                </Card>
            </div>
            <div className="lg:w-3/5">
                <div className="w-full h-72 md:h-[380px] border-0 overflow-hidden rounded-lg">
                <MapContainer
                  center={
                    centerLatitude && centerLongitude
                      ? [centerLatitude, centerLongitude] // Use state values if available
                      : geoLocations?.[0] 
                      ? [geoLocations[0].latitude, geoLocations[0].longitude] // Use the first location from geoLocations if available
                      : [23.73929105, 90.40722897981641] // Default values if neither is available
                  }
                  zoom={15}
                  style={{ height: "380px", width: "100%" }}
                  className="rounded-lg"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                  {/* Render the employee's fencing marker first if available */}
                  {singleEmployeeFencing?.latitude && singleEmployeeFencing?.longitude ? (
                    <Marker
                      key="employee-marker" // Unique key for the employee marker
                      position={[singleEmployeeFencing.latitude, singleEmployeeFencing.longitude]}
                    >
                      <Circle
                        center={[singleEmployeeFencing.latitude, singleEmployeeFencing.longitude]}
                        radius={singleEmployeeFencing.radius || 100} // Use default radius if not available
                        pathOptions={{ fillColor: "#459895", color: "#459895" }}
                      />
                    </Marker>
                  ) : (
                    // Fallback to rendering markers from geoLocations if singleEmployeeFencing is not available
                    geoLocations?.map((location: any) => (
                      <Marker key={location._id} position={[location.latitude, location.longitude]}>
                        <Circle
                          center={[location.latitude, location.longitude]}
                          radius={location.radius}
                          pathOptions={{
                            color: "#459895",
                            fillColor: "#459895",
                            fillOpacity: 0.2,
                          }}
                        />
                      </Marker>
                    ))
                  )}
                </MapContainer>


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