import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

// icon
import { FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { Settings } from "@mui/icons-material";
import { Button } from "@mui/material";

const information = [
  { id: 1, text: "Profile", Icon: <CgProfile /> },
  { id: 2, text: "My profile", Icon: <ImProfile /> },
  { id: 3, text: "Settings", Icon: <Settings /> },
];

function UserDropdown() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <span className="text-gray-400 cursor-pointer active:text-gray-500">
            <FaUser size={25} />
          </span>
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
        {information.map(({ id, text }) => (
          <MenuItem key={id} className="w-full">
            <Button className="w-full">
              <span className="capitalize">{text}</span>
            </Button>
          </MenuItem>
        ))}

        <MenuItem onClick={handleLogout}>
          <Button textAlign="center">LogOut</Button>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserDropdown;
