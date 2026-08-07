import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import GoogleButton from "../../../components/GoogleButton";
import './login.css';
import { useState } from "react";
import { loginServices } from "../../../services/authServices";
export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState({});
    const navigate=useNavigate()

    const handleSubmit= async(e)=>{
            e.preventDefault();

    let newErrors={};
        if(!email.trim()){
            newErrors.email='Email is required';
        }
        if(!password.trim()){
            newErrors.password='Password is required';
        }else if(password.length<6){
            newErrors.password='Password must be at least 6 characters long';
        }
        setErr(newErrors);
        if(Object.keys(newErrors).length>0){
            setErr(newErrors);
            return; // Stop form submission if there are validation errors
        }
        if(!/\S+@\S+\.\S+/.test(email)){
            setErr({email:'Invalid email address'});
            return; // Stop form submission if validation fails
        }
        if(password.length<6){
            setErr({password:'Password must be at least 6 characters long'});
            return; // Stop form submission if validation fails
        }
        console.log('Login button clicked');
        console.log('Email:', email);
        console.log('Password:', password);
        // const users=JSON.parse(localStorage.getItem('users'))||[];
        // const emailExists=users.some((user)=>user.email===email);
        // if(!emailExists){
        //     setErr({email:'Email does not exist.Register first'});
        //     console.log('Login failed');
        //     return; // Stop form submission if validation fails
        // }
        // const user=users.find((user)=>user.email===email && user.password===password);
        // if(!user){
        //     setErr({password:'Invalid email or password'});
        //     console.log('Login failed');
        //     return; // Stop form submission if validation fails

        // }else{
        //     console.log('Login successful');

        // }
        try{
            const response=await loginServices({
                userEmail:email,
                password,
            });
            console.log('Login sucessfull',response);

            const token = response.data.token;
            const user = response.data.user;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));

            if(user.role==='admin'){
                navigate('/admin/admindashboard');
            }else if(user.role==='HR'){
                navigate('/hr/dashboard');
            }else if(user.role==='employee'){
                navigate('/employee/dashboard')
            }

        }catch(err){
            console.log(err);
            setErr({
                password:err.response?.data?.message||   err.message ||'Login failed. Please try again.'
            })
        }

    }
    return (
        <>
         

             <div className="p-5">
            <div className="logo" style={{ color: '#D885A3' }}>
                <h3>HR Management</h3>
            </div>
            <div>
                <p>Welcome Back!</p>
                <h1>Log In</h1>
            </div>

            <div style={{ maxWidth: "400px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-secondary">Email address</Form.Label>
                        <Form.Control type="email" value={email} isInvalid={!!err.email} onChange={(e)=>setEmail(e.target.value)} placeholder="login@gmail.com" style={{ backgroundColor: '#C0DBEA' }} />
                        <Form.Control.Feedback type="invalid" className="text-danger">
                            {err.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="text-secondary d-flex justify-content-between w-100 align-items-center">
                            <span>Password</span>
                            <a href="#" className="float-end text-secondary text-decoration-none small">Forgot Password?</a>
                        </Form.Label>
                        <Form.Control type="password" value={password} isInvalid={!!err.password} onChange={(e)=>setPassword(e.target.value)} placeholder="******" style={{ backgroundColor: '#C0DBEA' }} />
                        <Form.Control.Feedback type="invalid" className="text-danger">
                            {err.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-center  mb-3">
                        <Button type="submit"   style={{ backgroundColor: '#D885A3', border: 'none', borderRadius: '5px', padding: '10px 30px' }}>
                            Login
                        </Button>

                    </div>
                    <p className="text-secondary  mt-3">
                Don't have an account? <Link to="/register" className="text-decoration-none text-secondary">Register Here</Link>
            </p>
            <div className="divider">
                <span>or</span>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3 gap-3">
           <GoogleButton/>
            <button className=" d-flex justify-content-center align-items-center btn btn-outline-secondary gap-2 button-facebook">
                <FaFacebook size={20} color="blue"/>Continue with Facebook</button>
            </div>
                </Form>

            </div>
            

        </div>
        </>
       
    
    )
}