import { useEffect, useState } from "react";
import { IProduct } from "../../types";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import BannerProducts from "./BannerProducts";

export default function ProductPage() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [productId] = useSearchParams();

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL_DEPLOYMENT}/products/${productId.get("productId")}`);
        if (result.statusText === "OK") setProduct(result.data);
        else throw new Error(`data can't found`);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return <>{product && <BannerProducts categoryName={product.category} />}</>;
}
