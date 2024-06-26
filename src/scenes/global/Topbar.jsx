import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersoneOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { styled, alpha } from "@mui/material/styles";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {  Form, InputGroup } from "reactstrap";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Topbar = ({search,setSearch}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [userData, setUserData] = useState(null);
  const [isAdmin, setAdmin] = useState(null);
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  //Login Logout buttons

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  useEffect(() => {
    const token = cookies.get("jwt_auth");

    const fetchUserData = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
           const isAdmin=decoded ? decoded.isAdmin:null;
           setAdmin(isAdmin);
          const userId = decoded ? decoded.id : null;
          const dormId = decoded ? decoded.dormId : null;
          console.log(dormId);
          const res = await axios.get(`http://localhost:8800/users/${userId}`);

          setUserData(res.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, []); // Fetch user data when cookies change

  // Logout
  const handleLogout = async () => {
    try {
      cookies.remove("jwt_auth");
      if (userData) {
        setUserData(null);
      }

      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("There was an error logging out!", error);
    }
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search Bar */}
      {!isAdmin ? ( 

      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="10px"
        width="20%"
      >
               <Form >
          <InputBase
            sx={{ fontSize: 20, ml: 5, flex: 1, }}
            placeholder="Ara"
            value={search}
            onChange={handleSearchChange}
          />

          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Form>
       

      </Box>
       )
       :(
         <Box>
           
           </Box>
       )}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        {userData ? (
          <Box>
            <Typography
              style={{ fontSize: 20, cursor: "pointer" }}
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
            >
              <PersoneOutlinedIcon className="mx-2" style={{ fontSize: 40 }} />
              {userData.firstName} {""} {userData.lastName}
            </Typography>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                Profil
              </MenuItem>
              <MenuItem onClick={handleLogout} disableRipple>
                <LogoutOutlinedIcon />
                Çıkış Yap
              </MenuItem>
            </StyledMenu>
          </Box>
        ) : (
          <Link to="/login">
            <IconButton>
              <PersoneOutlinedIcon className="mx-0" style={{ fontSize: 50 }} />
              Giriş Yap
            </IconButton>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
