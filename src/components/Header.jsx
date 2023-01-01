import { Button, Menu, MenuItem, MenuList } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div>
        <div id="app-container">
          <div className="navbar">
            <div>
              <Link className="navbar-logo" to="/">
                <img
                  className="logo"
                  src="/assets/images/sidebar.png"
                  alt="logo"
                />
              </Link>
              <img
                className="pl30"
                src="/assets/images/sidebarItems.svg"
                alt=""
              />
            </div>
            <div className="dropdown_contain">
              <img src="/assets/images/notifcations.svg" alt="" />

              <Button
                style={{ backgroundColor: "#dce2ec", alignItems: "end" }}
                className="header_main_title"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <img
                  src="/assets/images/profile.png"
                  alt=""
                  className="header_profile"
                />
                <h3 className="profile_text">John Doe</h3>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <Link to="/account/login">
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Link>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
