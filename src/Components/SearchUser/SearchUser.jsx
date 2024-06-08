import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";

const SearchUser = () => {
  const [username, setUsername] = useState("");

  const { auth, message } = useSelector((store) => store);
  // console.log("message store ", message);
  // console.log("auth store ", auth);

  const dispatch = useDispatch();

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    console.log("handle search user.... ", auth.searchUser);
    dispatch(searchUser(username));
  };

  const handleClick = (id) => {
    console.log(id);
    dispatch(createChat({userId : id }));
  };   

  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search User..."
          onChange={handleSearchUser}
          type="text"
        />

        {username &&
          auth.searchUser.map((item) => (
            <Card className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={
                  <Avatar src="https://media.istockphoto.com/id/1335845017/photo/pink-blooming-lotus-close-up.jpg?b=1&s=612x612&w=0&k=20&c=YPaaYHhamEtpDhNfV2cylLzyQqA_IJNy_36PdX_qO9g=" />
                }
                title={item.firstName + " " + item.lastName}
                subheader={
                  "@" +
                  item.firstName.toLowerCase() +
                  " " +
                  item.lastName.toLowerCase()
                }
              ></CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
