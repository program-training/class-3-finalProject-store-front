import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayersHeader from "./components/Header/Layers";
import ProductPage from "./components/productPage/ProductPage";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/store" element={<LayersHeader />}>
            <Route path="/store" element={<Home />} />
            <Route path="/store/product/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
