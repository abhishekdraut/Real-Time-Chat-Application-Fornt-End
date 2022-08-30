import {useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import axios from 'axios';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ImageIcon from '@mui/icons-material/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { updateFriendList } from '../features/friendsListReducer';

export default function CenteredTabs({socket}) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [searchText,setSearchText]=useState('');
  const [searchFriend,setSearchFriend]=useState([])
  const dispatch=useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSearchFriend([]);
  };
  const currentUser=JSON.parse(localStorage.getItem('userDetails'));
  const friendList=useSelector((state)=>state.friend.value);
  const darkMode=useSelector((state)=>state.darkMode.value);
  
  async function searchFreindHandler(searchTextFromForm){
          setSearchFriend([]);
          if(searchTextFromForm!==""){
              const seachFriendResultReponse= await axios.get(`http://localhost:3002/friends/searchFriend/${searchTextFromForm}`);
              const seachFriendResult=seachFriendResultReponse.data;
              setSearchFriend(seachFriendResult);
          }
          
          
        }
  async function addFriendHandler(friendId){
      let friendExist=false;
      friendList.forEach((item)=>{
          if(item._id===friendId){
            friendExist=true;
            alert(`You are already a friend with ${item.name}`);
            setSearchFriend([]);
          }
          
      })
      if (friendId===currentUser._id) {
          friendExist=true;
            alert(`You can't send a req to yourself`);
            setSearchFriend([]);
      }
      else if(friendExist===false){
        
        const response1=await axios.post(`http://localhost:3002/friends/addToFriendList/`,{user_id:currentUser._id,friend_id:friendId});
        const response2=await axios.post(`http://localhost:3002/friends/addToFriendList/`,{user_id:friendId,friend_id:currentUser._id})
        if(response1.status==200 && response2.status==200){
          setSearchFriend([]);
          dispatch(updateFriendList());
          socket.emit("friendAdded",{friendId:friendId});
          alert("friend added successfully");
          

        }

      }


  }

  function RenderFriends() {
    if (searchFriend.length > 0) {
      return(searchFriend.map((item) => {
        return (
          <ListItem key ={item._id} className="listItemOuter">
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.username}
              secondary={item.name}
            />
            <div className={`addFriendBtn`}  onClick={()=>addFriendHandler(item._id)}><AddCircleIcon/></div>  
          </ListItem>
        );
      }))
      
    } else {
    return (
      <div></div>
    )
    }
  }



  return (
    <>
      <Box
        sx={{
          width: "300px",
          bgcolor: "#f9f9f9",
          position: "fixed",
          top: "0px",
          left: "160px",
          zIndex: "2",
          display: "flex",
          alignItems: "center",
          bgcolor:`${darkMode? '#404040':'#f9f9f9'}`,
          color:`${darkMode? '#f9f9f9':null}`
          
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Chat" />
          <Tab label="Groups" />
        </Tabs>
        <div className="searhTab">
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              <SearchSharpIcon />
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              style={{ minWidth: "900px" }}
            >
              <DialogTitle id="responsive-dialog-title">
                {"Search the Friend here"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div className="searchField_outer">
                    <div className="searchFiledSearchBar">
                      <TextField
                        id="filled-search"
                        label="Search field"
                        type="search"
                        variant="filled"
                        onChange={(e) => searchFreindHandler(e.target.value)}
                      />
                    </div>
                    <div className="searchResultsContainer">
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "#fff",
                          display: "flex",
                          flexDirection: "column",
                          gap:'10px'
                        }}
                      >
                        <RenderFriends/>
                        
                      </List>
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </div>
        </div>
      </Box>
    </>
  );
}

