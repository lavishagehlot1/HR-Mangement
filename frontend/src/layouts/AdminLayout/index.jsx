import { Container,Row,Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import '../AdminLayout/AdminLayout.css'
import SideBar from "../../components/admin/SideBar";
import NavBar from "../../components/admin/NavBar";


export default function AdminLayout(){

    return <>
    <div>
        <Container fluid>

                <Row className="vh-100">
                    {/**Left panel */}
                    <Col xs={12} md={6} lg={2} className="left-panell">
                    <SideBar className='mt-4'/>
                    </Col>
                    {/**Right panel */}
                    <Col xs={12} md={6} lg={10} className="right-panel px-0">
                   
                  <NavBar/>
                    <div className="main-content">
                        <Outlet />
                    </div>
                    </Col>
                </Row>

        </Container>
    </div>
    </>
}