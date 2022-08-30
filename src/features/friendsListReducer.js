import {createSlice} from '@reduxjs/toolkit';

const friendListSlice=createSlice({
    name:'friendList',
    initialState: {value: [],updated:0},
    reducers: {
        fetchFriends:function(state,action){
            
                state.value=action.payload
          
            
            
        },
        updateFriendList:function(state,action){
            state.updated=state.updated+1;
        }
    }
});

export const {fetchFriends,updateFriendList}=friendListSlice.actions;
export default friendListSlice.reducer;