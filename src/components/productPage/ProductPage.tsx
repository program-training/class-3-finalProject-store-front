import { useEffect, useState } from "react";
import { IProduct } from "../../types";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ProductPage() {
  const [product, setProduct] = useState<IProduct>();
  const [productId] = useSearchParams();

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${productId.get("productId")}`);
        if (result.statusText === "OK") {
          throw new Error(`data can't found`);
        }
        setProduct(result.data);
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return <></>;
}