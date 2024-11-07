import { SalaryCOLORS } from "@/pages/Dashboard/Dashboard";

const CustomLegend = () => {
const legendData = [
  { name: 'Distribution', color: SalaryCOLORS[0] },
  { name: 'Pendings', color: SalaryCOLORS[1] },
  { name: 'Deductions', color: SalaryCOLORS[2] },
];

  return (
    <div className="flex items-center mb-5 gap-2">
      {legendData.map((item, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-1"
            style={{ backgroundColor: item.color }} // Use color from legendData
          ></div>
          <span className="text-gray-800 text-sm">{item.name}</span> {/* Display name from legendData */}
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
