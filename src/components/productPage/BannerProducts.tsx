import { useState, useEffect } from "react";
import { IProduct } from "../../types";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ProductsSkelton from "../Home/ProductsSkelton";
import { useNavigate } from "react-router-dom";

const componentsArr: React.ReactNode[] = [];
for (let i = 0; i <= 4; i++) {
  componentsArr.push(<ProductsSkelton key={i} />);
}

const BannerProducts = (prop: { categoryName: string }) => {
  const navigate = useNavigate();
  const [bannerProducts, setBannerProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const getBannerProducts = async () => {
      try {
        const fetchBannerProducts = await axios(`${import.meta.env.VITE_BASE_URL}/api/products/banners`, {
          params: { categoryName: prop.categoryName, quantity: 5 },
        });
        const bannerProductsList: IProduct[] = fetchBannerProducts.data;
        setBannerProducts(bannerProductsList);
      } catch (error) {
        console.error(error);
      }
    };
    getBannerProducts();
  }, []);

  return (
    <>
      {!bannerProducts ? (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {componentsArr}
        </Box>
      ) : (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {bannerProducts.map(product => (
            <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/product/${product._id}`)}>
              <CardMedia sx={{ height: 140 }} image={product.image.large} title="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom component="div" sx={{ display: `flex`, margin: `50px 0 0 0` }}>
                  <Typography variant="h6" sx={{ fontSize: `30px` }}>
                    ${(product.salePrice * ((100 - product.discountPercentage) / 100)).toFixed(2)}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: `line-through`, padding: `0 10px 0 10px`, color: `#fd384f`, fontSize: `17px` }}>
                    ${product.salePrice}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default BannerProducts;
