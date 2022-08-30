import {fetchFriends,updateFriendList} from './friendsListReducer'
import {chatActions} from './chatReducer';
import {toggleDarkMode} from './darkMode';


const allActions={
    fetchFriends,
    updateFriendList,
    toggleDarkMode,
    loadMessage:chatActions.loadMessage,
    setLiveUnsavedMessage:chatActions.setLiveUnsavedMessage,
    setLiveUnsavedMessageToEmpty:chatActions.setLiveUnsavedMessageToEmpty,
    setChatIndex :chatActions.setChatIndex,
    setChatUser:chatActions.setChatUser
}
export default allActions