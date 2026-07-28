import { Legend, PieChart,Pie, ResponsiveContainer,Cell, Tooltip } from "recharts";

const COLORS=[
     "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export default function DepartmentPieChart({data}){
    return(
        <>
        <div className="chart-card">
            <h4 className="mb-3">Employee Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data}
                    dataKey="count"
                    nameKey="department"
                    innerRadius={60}
                    outerRadius={90}
                    label>
                        {data.map((entry,index)=>(
                        <Cell
                        key={index}
                        fill={COLORS[index%COLORS.length]}/>
                        ))}


                        <Tooltip/>
                        <Legend/>
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    
        </>
    );
};