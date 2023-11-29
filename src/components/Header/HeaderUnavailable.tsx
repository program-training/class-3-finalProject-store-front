import Menu from "@mui/material/Menu";

import {
  Avatar,
  Container,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Tooltip,
  MenuItem,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import HeaderCategory from "./HeaderCategory";
import { useState } from "react";

const settings = ["signUp", "signIn"];

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#5d64ed",
    color: "#5d64ed",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export function HeaderUnavailable() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [sumInCart, setSumInCart] = useState(0);

  const navigate = useNavigate();

  const handleHButtonHomeClick = () => {
    navigate("/");
  };
  const handleHButtonCartClick = () => {
    navigate("/cart");
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCategoryMenu = () => {
    setOpenCategoryMenu(!openCategoryMenu);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setIsSignedUp(false);
  };

  const handleSignUp = () => {
    setIsSignedUp(true);
    setIsSignedIn(false);
  };
  const handleClickPop = (setting: string) => {
    if (setting === "signUp") {
      handleSignUp();
    } else {
      handleSignIn();
    }
    handleCloseUserMenu();
  };

  // const sum = useAppSelector((state: RootState) => state.userCart.cart);
  // console.log(sum);
  // setSumInCart(sum.productsCart.length);
  // console.log(sumInCart);

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {isSignedIn && (
          <DialogContent>
            <SignIn
              setIsSignedIn={setIsSignedIn}
              setIsSignedUp={setIsSignedUp}
              setOpenDialog={setOpenDialog}
            />
          </DialogContent>
        )}
        {isSignedUp && (
          <DialogContent>
            <SignUp
              setIsSignedIn={setIsSignedIn}
              setIsSignedUp={setIsSignedUp}
              setOpenDialog={setOpenDialog}
            />
          </DialogContent>
        )}
      </Dialog>

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableGutters
          >
            <Box>
              <IconButton onClick={handleHButtonHomeClick}>
                <HomeIcon />
              </IconButton>

              <IconButton onClick={handleHButtonCartClick}>
                <Badge badgeContent={7} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenCategoryMenu} sx={{ p: 0 }}>
                  <HeaderCategory />
                </IconButton>
              </Box>
            </Box>
            {/* //------------------ */}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <StyledBadge>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                  </IconButton>
                </StyledBadge>
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleClickPop(setting);
                      handleClickOpen();
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
