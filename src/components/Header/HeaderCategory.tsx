import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import { Tooltip, Box, IconButton, Menu } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { setSearch } from "../../redux/searchSlice";

interface HeaderCategoryProps {}

const HeaderCategory: React.FC<HeaderCategoryProps> = () => {
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const openCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
      <Tooltip title="Open categorys">
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
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSearchUpdate("Item 1")}>
            <ListItemText primary="Item 1" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSearchUpdate("Item 2")}>
            <ListItemText primary="Item 2" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSearchUpdate("Item 3")}>
            <ListItemText primary="Item 3" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSearchUpdate("Item 4")}>
            <ListItemText primary="Item 4" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSearchUpdate("Item 5")}>
            <ListItemText primary="Item 5" />
          </ListItemButton>
        </List>
      </Menu>
    </Box>
  );
};

export default HeaderCategory;
