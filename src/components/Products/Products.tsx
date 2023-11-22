import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../types";
import ProductsSkelton from "./ProductsSkelton";
// import { log } from 'console';

export default function Products() {
 const navigate = useNavigate();
 const [products, setProducts] = useState<IProduct[] | null>(null);
 const env = import.meta.env;
 const componentsArr: React.ReactNode[] = [];

 for (let i = 0; i <= 6; i++) {
  componentsArr.push(<ProductsSkelton key={i} />);
 }

 const getProducts = async () => {
  try {
   const productsResult = await axios.get(`${env.VITE_BASE_URL}/products/`);
   setProducts(productsResult.data);
   console.log(products);

  } catch (error) {
   console.log(error);

  }
 }

 useEffect(() => {
  getProducts();
 }, []);

 const handelNavAndRedux = () => {
  products && navigate("/product");
 }

 return (
  <>
   {products !== null ? (<Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
    {products?.map((item) => (
     <Card sx={{ maxWidth: 345 }} onClick={() => handelNavAndRedux}>
      <CardMedia sx={{ height: 140 }} image={item.image.url} title="green iguana" />
      <CardContent>
       <Typography gutterBottom variant="h5" component="div">
        {item.name}
       </Typography>
      </CardContent>
     </Card>
    ))}
   </Box>) : <Box width="100%" my={4} display="flex" alignItems="center" gap={4} >{componentsArr}</Box>}
  </>
 );
}