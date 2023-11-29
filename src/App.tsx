import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayersHeader from "./components/Header/Layers";
import Home from "./components/Home/Home";
import ProductCart from "./components/Cart/Cart";
import PaymentForm from "./components/CartPage/PaymentForm";
import ProductPage from "./components/ProductPage/ProductPage";g

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
