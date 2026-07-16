
import AuthLayout from "../layouts/AuthLayout";
import Login  from "../pages/auth/login/login";
import Register from "../pages/auth/register/register";
    const authRoutes=[
        {
            path:'/',
            element:<AuthLayout/>,
            children: [
                {
                    path:'/login',
                    element:<Login/>,
                },
                {
                    path:'/register',
                    element:<Register/>,
                }
            ]
        }
    ];
export default authRoutes;