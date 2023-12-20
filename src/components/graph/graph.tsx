import { Box } from "@mui/material";
import UsersGraph from "./UsersGraph";
import ProductsGraph from "./productsGraph";

export default function Graph() {
  return (
    <Box sx={{ display: "flex" }}>
      <ProductsGraph />
      <UsersGraph />
    </Box>
  );
}
