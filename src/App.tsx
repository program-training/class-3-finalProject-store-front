import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayersHeader from "./components/Header/Layers";
import ProductPage from "./components/ProductPage/ProductPage";
import Home from "./components/Home/Home";
import CartPage from "./components/CartPage/CartPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/store">
        <Routes>
          <Route path="/" element={<LayersHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
