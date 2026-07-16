import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";

const router=createBrowserRouter([
    ...authRoutes
]);
export default router;