import { dashboardCards, employeeCardKeys } from "../dashboard/dashboardCardConfig";
import { Row, Col ,Form,Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import { AdminDashboardServices, getAllEmployees, getDepartmentAndRoles } from "../../../services/dashboardServices";
import './employee.css';
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import EmployeeList from "./component/employeeList";

export default function Employee(){
    const cardToShow=dashboardCards.filter((card)=>employeeCardKeys.includes(card.key))
    const [dashboardData, setdashboardData] = useState({});
    const[departments,setDepartment]=useState([]);
    const[departmentRoles,setDepartmentRoles]=useState({});
    const[selectedDepartment,setSelectedDepartment]=useState("");
    const[selectedRole,setSelectedRole]=useState("");
    const[employees,setEmployees]=useState([]);

        useEffect(() => {
            fetchDashboard();
            fetchDepartmentAndRoles();
            fetchEmployees();
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
        const roles=selectedDepartment?departmentRoles[selectedDepartment]||[]:[];

    const fetchDepartmentAndRoles = async () => {
        try {
            const response = await getDepartmentAndRoles();

            console.log("response:", response);
            console.log("Department:", response.data.department);
            console.log("Roles:", response.data.roles);

            setDepartment(response.data.department);
            setDepartmentRoles(response.data.roles);

        } catch (err) {
            console.log(err, "error");
        }
    };

    const fetchEmployees=async()=>{
        try{
            const response=await getAllEmployees();
            console.log('Employee API Response:',response);
            setEmployees(response.data.data);
        }catch(err){
            console.log(err, "error");
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

                    <Col md={2}>
                        <Form.Select
                            value={selectedDepartment}
                            onChange={(e) => {
                                setSelectedDepartment(e.target.value);
                                setSelectedRole("");
                            }}
                        >
                            <option value="">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            disabled={!selectedDepartment}
                        >
                            <option value="">All Roles</option>

                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select>
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary">Export</Button>
                    </Col>
                </Row>
                            <EmployeeList employees={employees} selectedDepartment={selectedDepartment} selectedRole={selectedRole} />
            </div>
        </>
    )
}