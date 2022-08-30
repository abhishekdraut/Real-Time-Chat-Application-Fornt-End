import {useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import allActions from '../features/actionsIndex'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import axios from 'axios'
import{useNavigate} from "react-router-dom";
import avatar from '../utils/avatar';


export default function InsetDividers({socket}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const friendList=useSelector((state)=>state.friend.value);
  const friendListUpdated=useSelector((state)=>state.friend.updated);
  const chatIndex=useSelector((state)=>state.chat.value.chatIndex);
  const currentUser=JSON.parse(localStorage.getItem('userDetails'));
  const darkMode=useSelector((state)=>state.darkMode.value);
  useEffect(()=>{
    if(!localStorage.getItem('token')||!localStorage.getItem('userDetails')){
      navigate('/')
    }
  },[navigate])

  useEffect(() => {
    async function fetchFriendsHandler(params) {
      const friendListResponse = await axios.get(
        `http://localhost:3002/friends/friendsList/${currentUser._id}`
      );
      if (friendListResponse.statusText == "OK") {
        const friendList = friendListResponse.data;
        dispatch(allActions.fetchFriends( friendList ));
      }
    }
    fetchFriendsHandler();
  }, [dispatch,friendListUpdated]);

  useEffect(()=>{
    socket.on('friendListUpdated',(data)=>{
     
      dispatch(allActions.updateFriendList());
    })
  },[socket])


  function handleChatIndex(itemId){
    if(itemId !== chatIndex ){
      dispatch(allActions.setChatIndex(itemId));
      dispatch(allActions.setLiveUnsavedMessageToEmpty());
    }
    
  }

  function ListLoaderHandle(params) {
    if(friendList.length>0){
      return(
        friendList.map((item)=>{
          return (
            <div key={item._id}>
              <ListItem >
                <ListItemAvatar>
                  <Avatar>
                    <img className="avatarImg"src={`${item ? item.profile_picture ? item.profile_picture : null : null}`}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.username} secondary={item.name} onClick={()=>handleChatIndex(item._id)}/>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        })
      )
    }
    else{
      return(
        <div>
        </div>
      )
    }


  }
  
  

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor:`${darkMode? '#404040':'#f9f9f9'}`,
        color:`${darkMode? '#4076af':''}`
      
      }}
    >
      {friendList ? <ListLoaderHandle/>:<div></div>}
      
    </List>
  );
}
