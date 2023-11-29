import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayersHeader from "./components/Header/Layers";
import ProductPage from "./components/ProductPage/ProductPage";
import Home from "./components/Home/Home";
import PaymentForm from "./components/CartPage/PaymentForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayersHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<PaymentForm subtotal={30.72} shippingFee={12.33} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
