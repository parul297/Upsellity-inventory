import { Route, Routes } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails";
import Analytics from "../pages/Analytics";
import Products from "../pages/Products";


const AppRoutes = () => {
    return (
        <Routes >
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/analytics" element={<Analytics />} />
        </Routes>
    )
}

export default AppRoutes