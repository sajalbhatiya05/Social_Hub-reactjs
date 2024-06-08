import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../../Components/Post/PostCard";
import UserReelsCard from "../../Components/Reels/UserReelsCard";
import ProfileModal from "./ProfileModal";

const tabs = [
  { value: "Post", name: "Post" },
  { value: "Reels", name: "Reels" },
  { value: "Saved", name: "Saved" },
  { value: "Repost", name: "Repost" },
];

const posts = [1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedPosts = [1, 1, 1, 1];

const Profile = () => {
  //ProfileModel EDIT PROFILE button
  const [open, setOpen] = useState(false);
  const handleOpenProfileModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { post, auth } = useSelector((store) => store);
  console.log("post store ", post )
  const [value, setValue] = React.useState("Post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="my-5 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md "
            src="https://cdn.pixabay.com/photo/2021/11/27/18/28/candles-6828695_1280.jpg"
            alt=""
          />
        </div>
        <div className=" px-5 flex justify-between items-start  mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem " }}
            src="https://cdn.pixabay.com/photo/2017/12/01/08/02/paint-2990357_1280.jpg"
          />

          {true ? (
            <Button onClick={handleOpenProfileModel} sx={{ borderRadius: "20px" }} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined">Follow</Button>
          )}
        </div>
        <div className="py-3 px-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p className="">
              @
              {auth.user?.firstName.toLowerCase() +
                "_" +
                auth.user?.lastName.toLowerCase()}
            </p>
          </div>
          <div className=" flex gap-x-5 items-center py-3">
            <span>41 Post </span>
            <span>35 Follower</span>
            <span>50 Following</span>
          </div>
          <div>
            <p>bio discription</p>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 2, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab value={item.value} label={item.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "Post" ? (
              <div className="space-y-5 w-[70%] my-10 ">
                {post.posts.map((item) => (
                  <div className="border border-slate-100">
                    <PostCard item ={item}/>
                  </div>
                ))}
              </div>
            ) : value === "Reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((item) => (
                  <UserReelsCard />
                ))}
              </div>
            ) : value === "Saved" ? (
              <div className="space-y-5 w-[70%] my-10 ">
                {savedPosts.map((item) => (
                  <div className="border border-slate-100">
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default Profile;
