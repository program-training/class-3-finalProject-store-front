import { Menu, styled, DialogContent, Dialog, Badge, Avatar, Container, Typography, IconButton, Toolbar, Box, AppBar, Tooltip, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { HeaderAvailable } from "./AvatarAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";

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

export function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [sumInCart, setSumInCart] = useState<number>(0);

  const arrayProducts = useAppSelector((state: RootState) => state.userCart.cart);
  useEffect(() => {
    setSumInCart(arrayProducts.productsCart.length);
    const userToken = localStorage.getItem("token");
    userToken && setIsToken(true);
  }, [isToken]);

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

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {isSignedIn && (
          <DialogContent>
            <SignIn setIsSignedIn={setIsSignedIn} setIsSignedUp={setIsSignedUp} setOpenDialog={setOpenDialog} setIsToken={setIsToken} />
          </DialogContent>
        )}
        {isSignedUp && (
          <DialogContent>
            <SignUp setIsSignedIn={setIsSignedIn} setIsSignedUp={setIsSignedUp} setOpenDialog={setOpenDialog} setIsToken={setIsToken} />
          </DialogContent>
        )}
      </Dialog>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} disableGutters>
            <Box>
              <IconButton onClick={handleHButtonHomeClick}>
                <HomeIcon />
              </IconButton>
              <IconButton onClick={handleHButtonCartClick}>
                <Badge badgeContent={sumInCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                onClick={() => {
                  navigate("/graph");
                }}
              >
                <BarChartIcon />
              </IconButton>
            </Box>
            {isToken ? (
              <HeaderAvailable setIsToken={setIsToken} />
            ) : (
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
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
