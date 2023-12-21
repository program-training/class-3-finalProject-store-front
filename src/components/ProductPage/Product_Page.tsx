import { useEffect, useState } from "react";
import { IProduct } from "../../helpers/types";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import BannerProducts from "./BannerProducts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../../graphqlQueries/queries";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { productId } = useParams();
  const { error, data, loading } = useQuery(GET_PRODUCT, { variables: { productId } });

  useEffect(() => {
    async function getProduct() {
      try {
        if (error) throw error;
        if (!loading && !error) {
          setProduct(await data.getProduct);
          console.log(data.getProduct);
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
    getProduct();
  }, [loading, data]);
  return (
    <>
      {product && <ProductCard product={product} />}
      {product && <BannerProducts categoryName={product.category} />}
    </>
  );
};

export default ProductPage;
