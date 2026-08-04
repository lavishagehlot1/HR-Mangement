import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { menu } from "../../constants/SideBarMenu";
import { BsPeopleFill } from "react-icons/bs";
import "./SideBar.css";

export default function SideBar() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-secondary mt-4">
                <BsPeopleFill size={28} color="white" className="me-2" />
                <h4 className="text-white fw-bold mb-0">HRMS</h4>
            </div>

            <Nav className="flex-column mt-5 px-3">
                {menu.map((e) => {
                    const Icon = e.icon;

                    return (
                        <NavLink
                            key={e.name}
                            to={e.path}
                            className={({ isActive }) =>
                                `sidebar-item ${isActive ? "active-item" : ""}`
                            }
                        >
                            <Icon size={20} />
                            <span>{e.name}</span>
                        </NavLink>
                    );
                })}
            </Nav>
        </>
    );
}