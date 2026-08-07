import { FiSearch, FiChevronDown } from "react-icons/fi";
import { InputGroup, Form, Dropdown } from "react-bootstrap";
import avtar from '../../assets/avtarImages/avtar.jpg';
import '../../layouts/AdminLayout/AdminLayout.css';
import SearchBar from "../common/SearchBar/SearchBar";

export default function NavBar(){
    const user=JSON.parse(localStorage.getItem('user'));
    return(
        <>
         <div className="navbar">
                        {/* <InputGroup className="search-box">
                        <InputGroup.Text className="search-icon">
                         <FiSearch />
                        </InputGroup.Text>

                        <Form.Control 
                        type="text" 
                        placeholder="Search anything..."
                        className="search-input"
                        ></Form.Control>
                        </InputGroup> */}
                        <SearchBar
                            placeholder="Search anything..."
                            className="search-box"
                        />

                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="div"
                                    id="profile-dropdown"
                                    className="profile-toggle"
                                >
                                    <div className="rightNav">
                                        <img src={avtar} alt="Admin" className="profileImg" />

                                        <div className="profileInfo">
                                            <h6>{user?.userFirstName} {user?.userLastName}</h6>
                                            <span>{user?.role}</span>
                                        </div>

                                        <FiChevronDown size={18} className="downItem" />
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>👤 My Profile</Dropdown.Item>
                                    <Dropdown.Item>⚙️ Settings</Dropdown.Item>
                                    <Dropdown.Item>🔑 Change Password</Dropdown.Item>

                                   
                                </Dropdown.Menu>
                            </Dropdown>

                    </div>
        </>
    )
}