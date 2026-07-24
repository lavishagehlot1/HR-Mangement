import { Legend, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function DepartmentPieChart({}){
    return(
        <>
        <div>
            <h4 className="mb-3">Employee Distribution</h4>
            <ResponsiveContainer>
                <PieChart>
                    <Pie>
                        <Cell/>

                        <Tooltip/>
                        <Legend/>
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    
        </>
    );
};