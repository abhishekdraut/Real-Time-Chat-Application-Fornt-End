import {useDispatch,useSelector} from 'react-redux';
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";
import allActions from '../features/actionsIndex';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {useNavigate} from 'react-router-dom'

function SidebarComponent(params) {
  const userDetails=JSON.parse(localStorage.getItem('userDetails'));
  const dispatch=useDispatch() ;
  const darkMode=useSelector((state)=>state.darkMode.value);
  const navigate=useNavigate()

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }
    
  return (
    <>
      <div className={`sidebarMenuOuter ${darkMode ?"darkSideNav":""}`}>
        <div className="sidebarMenu">
          <div className="sidebarTop"></div>
          
          <div className="sidebarMiddle">
            <PanoramaFishEyeIcon />
            <ChatRoundedIcon />
            <SignalCellularAltRoundedIcon />
            <Inventory2Icon />
            <SettingsRoundedIcon />
          </div>

          <div className="sidebarBottom">
            <LogoutRoundedIcon className="logout Btn" onClick={()=>handleLogout()}/>
            <Switch onClick={()=>dispatch(allActions.toggleDarkMode())}/>
            <Avatar alt="Cindy Baker" src={`${userDetails?.profile_picture ? userDetails.profile_picture:null}`} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarComponent;
