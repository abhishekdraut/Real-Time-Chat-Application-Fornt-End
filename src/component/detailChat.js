import{useNavigate} from "react-router-dom"
import {useEffect,useState,useMemo,useRef} from 'react';
import {useSelector,useDispatch} from "react-redux";
import allActions from '../features/actionsIndex';
import axios from 'axios'
import Avatar from "@mui/material/Avatar";
import TuneIcon from "@mui/icons-material/Tune";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

import Images from '../utils/imges'
import { css } from '@emotion/css';
import ScrollToBottom from 'react-scroll-to-bottom';
import { dark } from "@mui/material/styles/createPalette";


export default function DetailChatWindow({socket}) {
  const dispatch=useDispatch()
  const chatIndex=useSelector((state)=>state.chat.value.chatIndex);
  const chatUser=useSelector((state)=>state.chat.value.chatUser);
  const loadMessage=useSelector((state)=>state.message.value.savedMessage);
  const liveUnsavedMessage=useSelector((state)=>state.message.value.liveUnsavedMessage);
  const [msgText,setmsgText]=useState('');
  const darkMode=useSelector((state)=>state.darkMode.value);
  const navigate=useNavigate()
  const currentUser=JSON.parse(localStorage.getItem('userDetails'));
  const effectRan=useRef(false);
  
  const ROOT_CSS = css({
    height: '100%',
    width: '100%',
  });

  //I will have to otimize the way of constantly caling of function;

  useEffect(()=>{
        if(!localStorage.getItem('token')||!localStorage.getItem('userDetails')){
          navigate('/')
        }
      },[navigate])

  useEffect(()=>{
    async function fetchChatUserHandler(params) {
        const chatUserResponse=await axios.get(`http://localhost:3002/user/${chatIndex}`);
        const chatUser=chatUserResponse.data;
       
        dispatch(allActions.setChatUser(chatUser))
        
    }
    if(chatIndex){
      fetchChatUserHandler()
    } 
  },[chatIndex])

  useEffect(()=>{
    async function fetchChatMessagesForParticularUser(){
        const chatMessageForParticularUserReponse=await axios.get(`http://localhost:3002/message/individualsMessages/${currentUser._id}/${chatIndex}`);
        const chatMessageForParticularUser=chatMessageForParticularUserReponse.data;
        dispatch(allActions.loadMessage(chatMessageForParticularUser));
      }

    if(chatUser._id){
      fetchChatMessagesForParticularUser();
    }
    
  },[chatUser])
  
  useEffect(() => {
    if(effectRan.current===true){
      socket.on("recieveMessage", (data) => {
       
        dispatch(allActions.setLiveUnsavedMessage(data));
        
      });
    }
    return ()=>{
     
      if(effectRan.current===false){
        effectRan.current=true}
      else{effectRan.current=true}
    }
    
  },[socket]);
  



  

  




  function LoadMessageHandler() {
    if (loadMessage?.length > 0) {
      return loadMessage.map((item) => {
        return (
          <div
            className={`chatMessage  ${
              item.from == currentUser._id
                ? "sendedChatMessage"
                : "recievedChatMessage"
            }`}
          key ={item._id}>

            <div
              className={`message ${
                item.from == currentUser._id ? `${darkMode ? "darkTextMessage": null}` : "recieveMessage"
              }`}
            >
              {item.message}
            </div>
            <div className="metaDataBottom">{item.time}</div>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }
  function LiveUnsavedMessageHandler(){
    if (liveUnsavedMessage.length > 0) {
      return liveUnsavedMessage.map((item) => {
        return (
          <div
            className={`chatMessage  ${
              item.from == currentUser._id
                ? "sendedChatMessage"
                : "recievedChatMessage"
            }`}
          key ={item._id}>
            
            <div
              className={`message ${
                item.from == currentUser._id ? `${darkMode ? "darkTextMessage": null}` : "recieveMessage"
              }`}
            >
              {item.message}
            </div>
            <div className="metaDataBottom">{item.time}</div>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }
  async function sendMessageHandler(){
      if(msgText===""&& !chatIndex){
        console.log("empty text or chat Index error")

      }
      else{
        const textMsg={
          message:`${msgText}`,from:currentUser._id,to:`${chatIndex}`
        };
        setmsgText('');
        const mesasgeSubmitReposnseToDb= await axios.post('http://localhost:3002/message/postMessage',textMsg);

        if(mesasgeSubmitReposnseToDb?.data?._id){
          
          socket.emit('sendMessage',mesasgeSubmitReposnseToDb.data);
          dispatch(allActions.setLiveUnsavedMessage(mesasgeSubmitReposnseToDb.data))

          
          

        }
        else{
          console.log("message not saved to db and local state")
        }
        
        

      }
  }

  return (
    <div className={`detailChatWindowOuter ${darkMode ? 'darkChatOuter':null}`}>
      {chatIndex ?(<><div className={`detailChatNav ${darkMode ? 'darkChatNav':null}`}>
        <div className="detailChatNavLeft">
          <Avatar alt="Remy Sharp" src={chatUser.profile_picture} />
          <div className={`detailChatNavLeftName primaryText ${darkMode ? "darkText": null}`}>{chatUser? chatUser.username:""}</div>
        </div>
        <div className="detailChatNavRight">
          <TuneIcon />
        </div>
      </div>

      <div className={`detailChatBody ${darkMode ? 'darkChatBody':null}`}>
        
        <ScrollToBottom className={ROOT_CSS}>
        {loadMessage ? <LoadMessageHandler/>:<div></div>}
        
        <LiveUnsavedMessageHandler/>

        </ScrollToBottom>
        
      
    
      
      </div>
      <div className={`detailChatInputTextMessage ${darkMode ? 'darkInputSection':null}`}>
        
          <TextField 
          value={msgText}
          onChange={(e)=>setmsgText(e.target.value)}
          className="chatInputTextMessage"
          id="outlined-basic" 
          label="Type message here." 
          variant="outlined" 
          style={{
            overflowY: "scroll",
            maxHeight: "130px",
            width: "300px",
            borderColor: "#34ad46",
            backgroundColor:`${darkMode ? '#4b4b4b': '#ffffff'}`,
            
            
          }}/>
        <SendIcon className={`chatInputTextMessageSubmitButton ${darkMode? 'darkText':null}`} onClick={()=>sendMessageHandler()}/>
      </div></>): <img className="greetGif" src={darkMode? Images.twoWayTexting:Images.thankYou} alt="greetGif"/>}
      
        
    </div>
  );
}
