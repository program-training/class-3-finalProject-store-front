import React, { useState, useEffect } from "react";
import { Box, Stack, Chip, Avatar } from "@mui/material";
import { setSearch } from "../../redux/searchSlice";
import { Category } from "../../types";
import Banners from "../Banners/Banners";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphqlQueries/queries";
import { useAppDispatch } from "../../redux/hooks";

const HeaderCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [banner, setBanner] = useState<boolean>(false);
  const [bannerName, setBannerName] = useState<string>("");
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    loading ? setLoadingCategories(false) : setLoadingCategories(true);
    setCategories(data.getCategories);
  }, []);
  const handleProductByCategoryName = (newSearch: string) => {
    dispatch(setSearch(newSearch));
    setBanner(true);
  };
  return (
    <>
      {banner && <Banners categoryName={bannerName} />}
      <Box sx={{ margin: "7px" }}>
        {loadingCategories && <p>Loading categories...</p>}
        {categories && !loadingCategories && (
          <Stack direction="row" spacing={1}>
            {categories.map((category, index) => (
              <Chip
                key={index}
                avatar={<Avatar alt={category.name} src={category.img} />}
                label={category.name}
                variant="outlined"
                sx={{ height: "60px", margin: "10px" }}
                onClick={() => {
                  handleProductByCategoryName(category.name);
                  setBannerName("exampleCategory_a");
                }}
              />
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default HeaderCategory;
