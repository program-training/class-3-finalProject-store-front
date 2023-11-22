import { useState, useEffect } from "react";
import { IProduct } from "../../types";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ProductsSkelton from "../Products/ProductsSkelton";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate()


const componentsArr: React.ReactNode[] = [];
for (let i = 0; i <= 6; i++) {
    componentsArr.push(<ProductsSkelton key={i} />);
}

const BannerProducts = (categoryName: string) => {
  const [bannerProducts, setBannerProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const getBannerProducts = async () => {
      try {
        const fetchBannerProducts = await axios(`//`, { params: categoryName });
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
            <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/product/${product.name}`)}>
                {/* באמצע לעבוד */}
              <CardMedia
                sx={{ height: 140 }}
                image={product.image.url}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );

  return (
    <>
      {bannerProducts === null ? (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {bannerProducts?.map(item => (
            <Card sx={{ maxWidth: 345 }} onClick={() => handelNavAndRedux}>
              <CardMedia
                sx={{ height: 140 }}
                image={item.image.url}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
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
};
