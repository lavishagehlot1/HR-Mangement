import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { menu } from "../../constants/SideBarMenu";
import { BsPeopleFill } from "react-icons/bs";

export default function SideBar() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-secondary mt-4">
                <BsPeopleFill size={28} color="white" className="me-2" />
                <h4 className="text-white fw-bold mb-0">HRMS</h4>
            </div>
            <Nav className="flex-column mt-5 gap-4">
                {menu.map((e) => {
                    const Icon = e.icon;

                    return (
                        <Nav.Link
                            key={e.name}
                            as={Link}
                            to={e.path}
                            className="text-white"
                        >
                            <Icon className="me-2" size={20} />
                            {e.name}
                        </Nav.Link>
                    );
                })}
            </Nav>
        </>

    );
}