import {useEffect,useState} from 'react'
import SidebarComponent from '../component/sidebar';
import ChatSectionComponent from '../component/chatSection';
import DetailChatWindow from '../component/detailChat'
import{useNavigate} from "react-router-dom";
function MainScreen({socket}) {
    const navigate=useNavigate()
    const [socketAuth, setSocketAuth] = useState(false);
    const currentUser=JSON.parse(localStorage.getItem('userDetails'))
    
    useEffect(()=>{
        if(!localStorage.getItem('token')||!localStorage.getItem('userDetails')){
          navigate('/')
        }
      },[navigate]);

    // useEffect(() => {
    //     socket.on("connect_error", (err) => {
    //     if (err.message === "invalid username") {
    //         console.log(err);
    //     }
    //     console.log(err);
    //     });
    // }, [socket]);
    
    

    function functionAuthForSocket() {
    
        console.log("socketAuthAttemp try");
        setSocketAuth(true);
        socket.auth = { userId:currentUser._id };
        socket.connect();
 
        
  
    }
    if(!socketAuth){
        functionAuthForSocket();
    }
     console.log(socketAuth)

    return(
        <div className="mainScreenOuter">

        <SidebarComponent/>
        <ChatSectionComponent socket={socket}/>
        <DetailChatWindow socket={socket}/>
        
        
        </div>
    )
}

export default MainScreen