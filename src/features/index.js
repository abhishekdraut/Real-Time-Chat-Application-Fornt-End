import chatReducer from './chatReducer';
import friendListReducer from './friendsListReducer';
import darkModeReducer from './darkMode'

const allReducer={
    message:chatReducer.message,
    chat:chatReducer.chat,
    friend:friendListReducer,
    darkMode:darkModeReducer
}
export default allReducer
