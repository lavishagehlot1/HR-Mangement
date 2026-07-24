import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

const router=createBrowserRouter([
    ...authRoutes,
    ...adminRoutes
]);
export default router;