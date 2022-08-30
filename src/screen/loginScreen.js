
import {useState,useContext, useEffect} from "react"
import axios from "axios";
import{useNavigate} from "react-router-dom";
import CopyrightIcon from '@mui/icons-material/Copyright';
import {Link} from "react-router-dom";
import jwtDecode from "jwt-decode";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { width } from "@mui/system";

function LoginComponent() {
    
    const[username,setUsername]=useState(null);
    const [password,setPasword]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const [msg ,setMsg]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('token')&& localStorage.getItem('userDetails')){
        navigate('/home')
      }
    },[navigate])
   


    async function handleSubmit(e) {
      console.log("ashvasvdvavsduivasuiv")
        e.preventDefault();

        if(username===null){
            setMsg("Email Field Could not be empty")
            
        }
        if (password==null){
            setMsg("Password Field Could not be empty")
        }
        else{
            try {
             
                setIsLoading(true);
                const response= await axios.post('http://localhost:3002/auth/login',{"email":`${username}`,"password":`${password}`});
                console.log(response.data);
                const userDetails=await jwtDecode(response.data)
                
                if(userDetails?._id){
                  const userObjectResponse= await axios.get(`http://localhost:3002/user/${userDetails._id}`);
                  const userObject=userObjectResponse.data
                  delete userObject.password;
                  localStorage.setItem('userDetails',JSON.stringify(userObject));
                  localStorage.setItem('token',response.data);
                  
                  setTimeout(() =>{
                    setIsLoading(false);
                    navigate("/home")
                  },2000)

                  
                }

                
                
                
            } catch (error) {
              setTimeout(() =>{
                setIsLoading(false);
                setMsg("Invalid Credentials");
              },2000)
                
               
                
                
            }
            
            
        }

    }
    
    
    

  return (
    <div className="startPage_container">
      <div className="startPage_navbar">
        <div className="startPage_logo">
          <Link to="#">
            {" "}
            <div className="header_logo"></div>
          </Link>
        </div>

        <div className="languae_btn btn">English</div>

        <div className="signin_btn btn">
          {" "}
          <Link to="/register">Sign Up</Link>{" "}
        </div>
      </div>
      <div className="hero_text_container_background">
        <div className="login_container">
          <form className="form login_form">
            <div className="email_conatainer input_container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="input"
                onChange={(e) => {
                  setMsg(null);
                  setUsername(e.target.value);
                }}
                name="username"
                placeholder="Enter your email"
              />
            </div>

            <div className="password_conatiner  input_container">
              <label htmlFor="password">password</label>
              <input
                type="password"
                onChange={(e) => {
                  setMsg(null);
                  setPasword(e.target.value);
                }}
                className="input"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            
            {isLoading ? (
              <Box sx={{ display: "flex"}} style={{width:"300px",justifyContent: "center"}}>
                <CircularProgress color="success"/>
              </Box>
            ) : <input
            className="submit_btn btn"
            onClick={(e)=>handleSubmit(e)}
            type="submit"
            value="Login"
          />}

            <div className="msg_container">{msg ? msg : ""}</div>
            <div className="copyrights login_form_copyrights">
              <CopyrightIcon /> 2022 Abhishek Raut.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
