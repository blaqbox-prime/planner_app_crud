import React from 'react'
// import {io} from "socket.io-client";
import AddButton from './../components/AddButton';
import {useMessage} from '../zustand/store';
import MessageForm from './../components/MessageForm';
import Message from '../components/Message';


function Messages() {

    // const [socket, setSocket] = useState();
    const showForm = useMessage(state => state.showForm)
    const messages = useMessage(state => state.messages)
    



    // connect to socket server
    // useEffect(() => {
    //     const s = io('http://localhost:3005');
    //     setSocket(s);
    //     return () => {
    //         s.disconnect();
    //     }
    // }, [])




    return (
        <div className="Messages main-container">
            <div className="Messages__heading page_header">
            <h1 className="Messages__title page_title">Messages</h1>
            </div>

            <AddButton type="message"/>
            {showForm && <MessageForm />}
            {messages && messages.map(function(message) {
                return <Message message={message.message}  date={message.date.toLocaleString()}/>
            })}
        </div>
    )
}

export default Messages
