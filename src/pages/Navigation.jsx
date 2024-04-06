import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Container,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserContext from "../Contexts/UserContext";

const Navigation = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { userProfile, logoutUser } = useContext(UserContext);
  const [localUser, setLocalUser] = useState(null);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsAuth(true);
        const userData = localStorage.getItem("user");
        if (userData) {
          setLocalUser(JSON.parse(userData));
        }
      } else {
        // User is logged out
        setIsAuth(false);
        setLocalUser(null); // Ensure local user state is cleared on logout
        localStorage.removeItem("user"); // Optionally clear local storage here as well
      }
    });
  
    return () => unsubscribe();
  }, [auth, userProfile]);
  

  const handleToggleMenu = () => {
    setAnchorElNav(!anchorElNav);
  };

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = ["About"];
  const sawmillPages = ["home", "Stock", "Orders"];
  //   const settings = ['home_secure', 'Quick_Add', 'Trees', 'Logs', 'Planks', 'water_crud', 'Logout'];

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setIsAuth(false); // Update auth state on logout
        navigate("/loggedoutpage");
        handleCloseUserMenu(); // Close user menu
        logoutUser();
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: (theme) => theme.palette.white.main,
        boxShadow: "none",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <FingerprintIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "secondary.main",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "secondary.main",
              textTransform: "uppercase",
            }}
          >
            <>{localUser?.sawmillName || "SAWMILL GO"}</>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleToggleMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              getContentAnchorEl={null}
              sx={{
                display: { xs: "block", md: "none" },
                boxShadow: "none",
              }}
            >
              {isAuth ? (
                <>
                  {sawmillPages.map((page) => (
                    <MenuItem key={page} onClick={handleMenuClose}>
                      <Link
                        to={`/${page.toLowerCase()}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </>
              ) : (
                <>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleMenuClose}>
                      <Link
                        to={`/${page.toLowerCase()}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "secondary.main",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            <>{localUser?.sawmillName || "SAWMILL GO"}</>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuth ? (
              <>
                {sawmillPages.map((page) => (
                  <Button
                    key={page}
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  component={Link}
                  onClick={handleLogout}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {pages.map((page) => (
                  <Button
                    key={page}
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src={localUser?.imageUrl || "path_to_default_image.jpg"}
                />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuth ? (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Profile</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={handleLogout}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
