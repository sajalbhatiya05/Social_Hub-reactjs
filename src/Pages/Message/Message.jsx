import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../Components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Message = () => {
  const dispatch = useDispatch();
  const { auth, message } = useSelector((store) => store);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const stompClient = useRef(null);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  useEffect(() => {
    if (message.message && Array.isArray(messages)) {
      setMessages((prevMessages) => [...prevMessages, message.message]);
    }
  }, [message.message]);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    const newMessage = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message: newMessage, sendMessageToServer }));
    setSelectedImage("");
  };

  useEffect(() => {
    const sock = new SockJS(`http://localhost:6969/ws`);
    const stomp = Stomp.over(sock);
    stompClient.current = stomp;

    stomp.connect({}, onConnect, onError);

    // return () => {
    //   if (stompClient.current) {
    //     stompClient.current.disconnect();
    //   }
    // };
  }, []);

  const onConnect = () => {
    console.log("WebSocket connected");
  };

  const onError = (error) => {
    console.error("WebSocket error", error);
  };

  useEffect(() => {
    if (stompClient.current && auth.user && currentChat) {
      const subscription = stompClient.current.subscribe(
        `/user/${currentChat.id}/private`,
        (payload) => {
          const receivedMessage = JSON.parse(payload.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentChat, auth.user]);

  const sendMessageToServer = (newMessage) => {
    if (stompClient.current && newMessage) {
      stompClient.current.send(
        `/app/chat/${currentChat.id}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  // const onMessageReceive = (payload) => {
  //   const receivedMessage = JSON.parse(payload.body);
  //   setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  // };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <IconButton>
                  <WestIcon />
                </IconButton>
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div>
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message.chats.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(
                          Array.isArray(item.messages) ? item.messages : []
                        );
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=800" />
                  <p>
                    {auth.user.id === currentChat.users[0].id
                      ? `${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`
                      : `${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div
                ref={chatContainerRef}
                className="overflow-y-scroll h-[78vh] px-2 space-y-5 py-5"
              >
                {messages.map((item) => (
                  <ChatMessage key={item.id} item={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt="Selected"
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                        e.target.value = ""; // Clear the input field
                      }
                    }}
                    className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                    placeholder="Type message..."
                    type="text"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "10rem" }} />
              <p className="text-xl font-semibold"> No Chat Selected </p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
