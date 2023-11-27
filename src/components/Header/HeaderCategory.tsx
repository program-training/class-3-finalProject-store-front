import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import { Tooltip, Box, IconButton, Menu } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { setSearch } from "../../redux/searchSlice";
import axios from "axios";
import { Category } from "../../types";

const HeaderCategory: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const dispatch = useAppDispatch();

  const openCategoryMenu = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/categories`);
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSearchUpdate = (newSearch: string) => {
    dispatch(setSearch(newSearch));
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open categories">
        <IconButton sx={{ p: 0 }} onClick={openCategoryMenu}>
          <CategoryIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <List component="div" disablePadding sx={{ mb: 2 }}>
          {categories?.map((category, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => handleSearchUpdate(category.id)}>
              <ListItemText primary={category.name} />
            </ListItemButton>
          ))}
        </List>
      </Menu>
    </Box>
  );
};

export default HeaderCategory;
