import CenteredTabs from './tabs'
import InsetDividers from './divider'
import {useSelector} from 'react-redux'

function ChatSectionCoponent({socket}) {
    const darkMode=useSelector((state)=>state.darkMode.value)



    return(

        <div className={`chatSectionOuter ${darkMode ? "darkChatSection" : ""}`}>
        <CenteredTabs socket={socket}/>
        <InsetDividers socket={socket}/>

        </div>
    )
}
export default ChatSectionCoponent