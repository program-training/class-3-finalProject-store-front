import React, { useState, useEffect } from "react";
import { Box, Stack, Chip, Avatar } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { setSearch } from "../../redux/searchSlice";
import axios from "axios";
import { Category } from "../../types";
import Banners from "../Banners/Banners";

const HeaderCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [banner, setBanner] = useState<boolean>(false);
  const [bannerName, setBannerName] = useState<string>("");
  const dispatch = useAppDispatch();



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/categories`);
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchUpdate = (newSearch: string) => {
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
                  handleSearchUpdate(category.name);
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
