import { useState, useEffect } from "react";
import { IProduct } from "../../types";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ProductsSkelton from "../Home/ProductsSkelton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SIMILAR_PRODUCTS } from "../../graphqlQueries/queries";

const componentsArr: React.ReactNode[] = [];
for (let i = 0; i <= 4; i++) {
  componentsArr.push(<ProductsSkelton key={i} />);
}

const BannerProducts = (prop: { categoryName: string }) => {
  const navigate = useNavigate();
  const [bannerProducts, setBannerProducts] = useState<IProduct[] | null>(null);
  const { data, loading, error } = useQuery(SIMILAR_PRODUCTS, { variables: { categoryName: prop.categoryName, quantity: 5 } });

  useEffect(() => {
    setBannerProducts(data.similarProducts);
    if (error) {
      console.error(error);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {componentsArr}
        </Box>
      ) : (
        <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
          {bannerProducts?.map((product) => (
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
                  <Typography variant="h6" color="text.secondary" sx={{ textDecoration: `line-through`, padding: `0 10px 0 10px`, color: `#fd384f`, fontSize: `17px` }}>
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
