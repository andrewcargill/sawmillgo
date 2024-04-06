import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, Tooltip, Menu, MenuItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FingerprintIcon from '@mui/icons-material/Fingerprint';



const Navigation = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const pages = ['About'];
  const settings = ['home_secure', 'Quick_Add', 'Trees', 'Logs', 'Planks', 'water_crud', 'Logout'];

  return (
    
      <AppBar position="fixed" sx={{ backgroundColor: theme => theme.palette.white.main, boxShadow: 'none' }}>
       <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <FingerprintIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'secondary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{

              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: 'secondary.main',
            }}
          >
            SAWMILL GO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              getContentAnchorEl={null}
              sx={{
                display: { xs: 'block', md: 'none' },
                boxShadow: 'none',
              }}

            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleMenuClose}>
                  <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'secondary.main',
              textDecoration: 'none',
            }}
          >
            SAWMILL GO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuth ? (
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Link to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
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
