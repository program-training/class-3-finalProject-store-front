import React, { useState, useEffect } from "react";
import {
  Box,
  Slider,
  Stack,
  Chip,
  Avatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { setSearch } from "../../redux/searchSlice";
import axios from "axios";
import { Category } from "../../types";

const HeaderCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number[]>([30, 150]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value}$`;
  }

  const handleApplyFilter = () => {
    applyFilter(value);
  };

  const applyFilter = (priceRange: number[]) => {
    dispatch(
      setSearch(`filter by price range: ${priceRange[0]} - ${priceRange[1]}`)
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products/categories`
        );
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
  };

  return (
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
              onClick={() => handleSearchUpdate(category.name)}
            />
          ))}
        </Stack>
      )}
      <Slider
        getAriaLabel={() => "price range"}
        max={1000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <ListItemButton sx={{ pl: 2 }} onClick={handleApplyFilter}>
        <ListItemText primary="Apply" />
      </ListItemButton>
    </Box>
  );
};

export default HeaderCategory;
