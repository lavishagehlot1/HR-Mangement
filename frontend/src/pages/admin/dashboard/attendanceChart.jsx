import { ResponsiveContainer, Bar, BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Cell } from 'recharts'
export default function AttendanceChart({ data }) {
    return (
        <>
            <div className='chart-card'>
                <h4 className='mb-3'>
                    Attendance Overview
                </h4>
                <ResponsiveContainer width="100%"  height={300}>
                    <BarChart data={data}>
                        <CartesianGrid vertical={false}
                            stroke="#f1f5f9" />
                        <XAxis dataKey="status" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />

                        <Bar dataKey="count" animationDuration={1200} radius={[8, 10, 0, 0]}>
                            <Cell fill="#22c55e" /> {/* Present */}
                            <Cell fill="#ef4444" /> {/* Absent */}
                            <Cell fill="#f59e0b" /> {/* Half Day */}
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}