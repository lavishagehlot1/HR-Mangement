import { dashboardCards, employeeCardKeys } from "../dashboard/dashboardCardConfig";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AdminDashboardServices } from "../../../services/dashboardServices";
import './employee.css';
import SearchBar from "../../../components/common/SearchBar/SearchBar";

export default function Employee(){
    const cardToShow=dashboardCards.filter((card)=>employeeCardKeys.includes(card.key))
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
    
    return(
        <>
        <div className="ms-4 heading">
            <h2>Employees</h2>
            <p>Home</p>
        </div>
         <div className='ms-4'>
                <Row className="g-4">
                    {cardToShow.map((card) => (
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
            {/* employee section */}
            <div className="ms-4 mt-4 employee-section">
                <Row className="align-items-center g-3">
                    <Col md={4}>
                       <SearchBar  placeholder="Search employee..." className="w-75" />
                    </Col>

                    <Col md={2}>Department</Col>
                    <Col md={2}>Role</Col>
                    <Col md={2}>Status</Col>
                    <Col md={2}>Export</Col>
                </Row>

            </div>
        </>
    )
}