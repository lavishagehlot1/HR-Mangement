import { Legend, PieChart,Pie, ResponsiveContainer,Cell, Tooltip } from "recharts";

const COLORS = [
  "#f59e0b", //Amber/Yellow
  "#22c55e", //Green
  "#ef4444", //Red
];

export default function LeavePieChart({data}){
    return(
        <>
        <div className="chart-card">
            <h4 className="mb-3">Leave Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data}
                    dataKey="value"
                    nameKey="name"
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