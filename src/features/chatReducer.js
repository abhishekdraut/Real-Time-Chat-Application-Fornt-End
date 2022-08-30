import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: { value:{savedMessage:[],liveUnsavedMessage:[]} },
  reducers: {
    loadMessage: function (state, action) {
      state.value.savedMessage = action.payload;
    },

    setLiveUnsavedMessage:function(state,action){
      const userArray=[...state.value.liveUnsavedMessage,action.payload];
      console.log("++++++",userArray)
      state.value.liveUnsavedMessage=userArray;
      
    },
    setLiveUnsavedMessageToEmpty:function(state,action){
      state.value.liveUnsavedMessage=[];
    }

  },
});

const chatSlice = createSlice({
  name: "chat",
  initialState: { value: {chatIndex:null,chatUser:{}} },
  reducers: {
    setChatIndex: function (state, action) {
        
      state.value.chatIndex = action.payload;
    },
    setChatUser: function (state, action) {
      
      state.value.chatUser = action.payload;
  },
  },
});

const chatReducers={
    message:messageSlice.reducer,
    chat:chatSlice.reducer
}
export const chatActions={
    loadMessage:messageSlice.actions.loadMessage,
    setLiveUnsavedMessage:messageSlice.actions.setLiveUnsavedMessage,
    setLiveUnsavedMessageToEmpty:messageSlice.actions.setLiveUnsavedMessageToEmpty,
    setChatIndex:chatSlice.actions.setChatIndex,
    setChatUser:chatSlice.actions.setChatUser
}

export default chatReducers;
