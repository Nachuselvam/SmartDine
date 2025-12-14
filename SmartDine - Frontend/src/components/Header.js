import React, { useContext, useState } from "react";
import { Box, Button, Typography, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Logo from "../assests/smartdine-logo.png";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  const handleHomeClick = () => navigate(user ? "/home" : "/about");

  return (
    <Box
      className="topbar"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "72px",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 2000,
      }}
    >
      {/* LEFT: Logo */}
      <Box
        onClick={handleHomeClick}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        role="button"
        aria-label="Go to home"
      >
        <img src={Logo} alt="SmartDine Logo" style={{ height: 48, width: 48, objectFit: "contain" }} />
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.25rem",
            marginLeft: 1,
            color: "#0A2533",
            userSelect: "none",
          }}
        >
          SmartDine
        </Typography>
      </Box>

      {/* RIGHT: Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!user && (
          <>
            <Button
              onClick={() => navigate("/about")}
              sx={{ color: "#0A2533", fontWeight: 600 }}
            >
              ABOUT
            </Button>
            <Button
              onClick={() => navigate("/login")}
              sx={{ color: "#0A2533", fontWeight: 600 }}
            >
              LOGIN
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                background: "#0A2533",
                fontWeight: 600,
                "&:hover": { background: "#071722" },
              }}
            >
              SIGN UP
            </Button>
          </>
        )}

        {user && (
          <>
            <Typography sx={{ fontWeight: 600, marginRight: 1, color: "#0A2533" }}>
              {user.name || user.username || user.email || "User"}
            </Typography>

            <IconButton onClick={handleProfileClick} size="small">
              <Avatar
                alt={user.name || "User"}
                src={user.avatar || ""}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
}
