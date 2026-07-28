import { dashboardCards } from './dashboardCardConfig'
import '../dashboard/admin.css'
import { useEffect, useState } from 'react';
import { AdminDashboardServices } from '../../../services/dashboardServices';
import DepartmentPieChart from './DepartmentPieChart';
import { Row, Col } from 'react-bootstrap';
import AttendanceChart from './attendanceChart';
export default function AdminDashboard() {
    const [dashboardData, setdashboardData] = useState({});
    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await AdminDashboardServices("test");
            console.log('response:', response);
            setdashboardData(response.data);
        } catch (err) {
            console.log(err, 'error')
        }
    }

    // const attendanceData=[
    //     {
    //         status:'Present',
    //         count:dashboardData.presentToday??0,
    //     },
    //     {
    //         status:'Absent',
    //         count:dashboardData.absentToday??0,
    //     },
    //     {
    //         status:'Half Day',
    //         count:dashboardData.halfdayToday??0,
    //     }
    // ]

    const attendanceData =
            dashboardData.presentToday === 0 &&
            dashboardData.absentToday === 0 &&
            dashboardData.halfDayToday === 0
            ? [
                { status: "Present", count: 50 },
                { status: "Absent", count: 4 },
                { status: "Half Day", count: 2 },
            ]
            : [
                { status: "Present", count: dashboardData.presentToday },
                { status: "Absent", count: dashboardData.absentToday },
                { status: "Half Day", count: dashboardData.halfDayToday },
            ];
    console.log('attendanceData', attendanceData);

    const departmentData=dashboardData.DeparmentDistribution||[];
    console.log('departmentData',departmentData);
    return (
        <>
            <div className=" ms-4 heading">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin</p>
            </div>
            <div className='ms-4'>
                <Row className="g-4">
                    {dashboardCards.map((card) => (
                        <Col
                            key={card.key}
                            xs={12}
                            sm={6}
                            lg={4}
                            xl={3}
                        >
                            <div className="card h-100 p-3">
                                <div className="d-flex  align-items-center gap-5">
                                    <span className="icon-circle">
                                        {card.icon}
                                    </span>

                                    <div>
                                        <p>{card.title}</p>
                                        <h2>{dashboardData[card.key] ?? 0}</h2>
                                        <p>{card.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <Row className="mt-4 gx-4">
                <Col lg={4} className="d-flex justify-content-center">
                    <AttendanceChart data={attendanceData} />
                </Col>

                <Col lg={4} className="d-flex justify-content-center">
                    <DepartmentPieChart data={departmentData} />
                </Col>
                <Col lg={4} className="d-flex justify-content-center">
                    <DepartmentPieChart data={departmentData} />
                </Col>
            </Row>
           


        </>
    )
}