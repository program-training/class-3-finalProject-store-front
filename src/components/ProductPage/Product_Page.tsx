import { useEffect, useState } from "react";
import { IProduct } from "../../types";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import BannerProducts from "./BannerProducts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../../graphqlQueries/queries";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { productId } = useParams();
  const { error, data } = useQuery(GET_PRODUCT, { variables: { productId: productId } });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    setProduct(data.getProduct);
  }, []);
  return (
    <>
      {product && <ProductCard product={product} />}
      {product && <BannerProducts categoryName={product.category} />}
    </>
  );
};

export default ProductPage;
