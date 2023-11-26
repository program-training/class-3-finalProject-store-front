import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayersHeader from "./components/Header/Layers";
import ProductPage from "./components/productPage/ProductPage";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayersHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
