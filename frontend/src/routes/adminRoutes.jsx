 import AdminLayout from '../layouts/AdminLayout/index'
import AdminDashboard from '../pages/admin/dashboard/index';
import Employee from '../pages/admin/Employee/index';
 const adminRoutes=[{
    path:'/admin',
    element:<AdminLayout/>,
    children:[
        {
            path:'adminDashboard',
            element:<AdminDashboard/>
        },
        {
            path:'employee',
            element:<Employee/>
        }
    ]
  }];
  export default adminRoutes;