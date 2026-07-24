 import AdminLayout from '../layouts/AdminLayout/index'
import AdminDashboard from '../pages/admin/dashboard/index';
 const adminRoutes=[{
    path:'/admin',
    element:<AdminLayout/>,
    children:[
        {
            path:'adminDashboard',
            element:<AdminDashboard/>
        }
    ]
  }];
  export default adminRoutes;