import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayersHeader from "./components/Header/Layers";
import Home from "./components/Home/Home";
import PaymentForm from "./components/CartPage/PaymentForm";
import ProductPage from "./components/ProductPage/ProductPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/store" element={<LayersHeader />}>
            <Route path="/store" element={<Home />} />
            <Route path="/store/product/:productId" element={<ProductPage />} />
            <Route path="/store/cart" element={<PaymentForm subtotal={30.72} shippingFee={12.33} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
