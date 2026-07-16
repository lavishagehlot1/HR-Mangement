import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import '../login/login.css';
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [err, setErr] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    let newErrors = {};
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Registered button clicked');
        //basic form validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        setErr(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setErr(newErrors);
            return; // Stop form submission if there are validation errors
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErr({ message: 'Invalid email address' });
            return; // Stop form submission if validation fails
        }
        if (formData.password.length < 6) {
            setErr('Password must be at least 6 characters long');
            return; // Stop form submission if validation fails 
        }

        console.log(formData);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        //after submit clear the form
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        })
        navigate('/login');
    }



    return (
        <div className="p-5">
            <div className="logo" style={{ color: '#D885A3' }}>
                <h3>Logo Here</h3>
            </div>
            <div>

                <h1>Register Here</h1>
            </div>

            <div style={{ maxWidth: "400px" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label className="text-secondary">First Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={formData.firstName} isInvalid={!!err.firstName} onChange={handleChange} placeholder="John" style={{ backgroundColor: '#C0DBEA' }} />
                        <Form.Control.Feedback type="invalid" className="text-danger">
                            {err.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label className="text-secondary">Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" value={formData.lastName} isInvalid={!!err.lastName} onChange={handleChange} placeholder="Doe" style={{ backgroundColor: '#C0DBEA' }} />
                        <Form.Control.Feedback type="invalid" className="text-danger">
                            {err.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-secondary">Email address</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} isInvalid={!!err.email} onChange={handleChange} placeholder="login@gmail.com" style={{ backgroundColor: '#C0DBEA' }} />
                        <Form.Control.Feedback type="invalid" className="text-danger">
                            {err.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="text-secondary d-flex justify-content-between w-100 align-items-center">
                            <span>Password</span>
                            <a href="#" className="float-end text-secondary text-decoration-none small">Forgot Password?</a>
                        </Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} isInvalid={!!err.password} onChange={handleChange} placeholder="******" style={{ backgroundColor: '#C0DBEA' }} />
                        <Form.Control.Feedback type="invalid" className="text-danger">
                            {err.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-center  mb-3">
                        <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#D885A3', border: 'none', borderRadius: '5px', padding: '10px 30px' }}>
                            Register
                        </Button>

                    </div>
                    <p className="text-secondary  mt-3">
                        Already have an account? <Link to="/login" className="text-decoration-none text-secondary">Login Here</Link>
                    </p>
                    <div className="divider">
                        <span>or</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3 gap-3">
                        <button className=" d-flex justify-content-center align-items-center btn btn-outline-secondary gap-2 button-google">
                            <FcGoogle size={20} />Continue with Google</button>
                        <button className=" d-flex justify-content-center align-items-center btn btn-outline-secondary gap-2 button-facebook">
                            <FaFacebook size={20} color="blue" />Continue with Facebook</button>
                    </div>
                </Form>

            </div>


        </div>
    )
}