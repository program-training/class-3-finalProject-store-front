import { useEffect, useState } from "react";
import { IProduct } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import BannerProducts from "./BannerProducts";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios(`${import.meta.env.VITE_BASE_URL}/products/product/${productId && productId}`);
        result && setProduct(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <>
      {product && <ProductCard product={product} />}
      {product && <BannerProducts categoryName={product.category} />}
    </>
  );
};

export default ProductPage;
