import { useEffect, useState } from "react";
import { IProduct } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
// import BannerProducts from "./BannerProducts";

export default function ProductPage() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios(`${import.meta.env.VITE_BASE_URL}/api/products/product/${productId && productId}`);
        if (result.statusText === "OK") setProduct(result.data);
        else throw new Error(`data can't found`);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <>
      {product && <ProductCard product={product} />}
      {/* {product && <BannerProducts categoryName={product.category} />} */}
    </>
  );
}
