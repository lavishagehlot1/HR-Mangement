import { Container,Row,Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import '../AdminLayout/AdminLayout.css'
import SideBar from "../../components/admin/SideBar";
export default function AdminLayout(){
    return <>
    <div>
        <Container fluid>

                <Row className="min-vh-100">
                    {/**Left panel */}
                    <Col xs={12} md={6} lg={2} className="left-panel">
                    <SideBar className='mt-4'/>
                    </Col>
                    {/**Right panel */}
                    <Col xs={12} md={6} lg={10} className="right-panel px-0">
                    <Col xs={12} md={12} lg={12}>
                    <div className="navbar">
                        <div>Search</div>
                        <div>admin</div>
                    </div>

                    </Col>
                    <Col xs={12} md={12} lg={12}
                    className="main-content min-vh-100">
                      <Outlet/>
                    </Col>
                  
                    </Col>
                </Row>

        </Container>
    </div>
    </>
}