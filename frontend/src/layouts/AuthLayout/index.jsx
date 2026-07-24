import { Container, Row, Col } from "react-bootstrap";
import '../AuthLayout/AuthLayout.css';
import girl from '../../assets/images/girl.png';
import cactus from '../../assets/images/cactus.png';
import { Outlet } from "react-router-dom";
export default function AuthLayout(){
return (
    <>
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-warning grad1">
            <Container className="py-4">
                <div className=" authCard rounded-5 shadow-lg overflow-hidden bg-white"
                >
                    <Row className="g-0 flex-grow-1">
                        {/* Left Panel */}
                        <Col xs={12} md={6} lg={8} className="bg-white p-5"
                        >
                            <Outlet />

                        </Col>

                        {/* Right Panel */}
                        <Col xs={12} md={6} lg={4} className="right-panel rounded-5 text-white p-5 position-relative">
                            <img src={girl} alt="Girl" className="girl-img" />
                            <img src={cactus} alt="Cactus" className="cactus-img"></img>

                        </Col>
                    </Row>
                </div>

            </Container>
        </div>
    </>
)
}