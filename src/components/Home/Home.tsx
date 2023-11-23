import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../types";
import ProductsSkelton from "./ProductsSkelton";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const env = import.meta.env;
  const componentsArr: React.ReactNode[] = [];

  for (let i = 0; i <= 6; i++) {
    componentsArr.push(<ProductsSkelton key={i} />);
  }

  const getProducts = async () => {
    try {
      const productsResult = await axios.get(`${env.VITE_BASE_URL}/api/products/`);
      setProducts(productsResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handelNavAndRedux = (productId: string) => {
    productId && navigate(`/product/${productId}`);
  };

  return (
    <>
      {products !== null ? (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {products?.map((product) => (
            <Card key={product._id} sx={{ maxWidth: 345 }} onClick={() => handelNavAndRedux(products && products[0]?._id)}>
              <CardMedia sx={{ height: 140 }} image={product.image.large} title={product.image.alt} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  quantity:{product.quantity}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {componentsArr}
        </Box>
      )}
    </>
  );
}
