import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayersHeader from "./components/Header/Layers";
import ProductPage from "./components/ProductPage/Product_Page";
import Home from "./components/Home/Home";
import CartPage from "./components/CartPage/CartPage";
import Graph from "./components/graph/graph";

function App() {
  return (
    <>
      <BrowserRouter basename="/store">
        <Routes>
          <Route path="/" element={<LayersHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/graph" element={<Graph />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
