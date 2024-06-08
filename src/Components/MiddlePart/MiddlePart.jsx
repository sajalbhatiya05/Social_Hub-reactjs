import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import StoryCircle from "./StoryCircle";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";

const Story = [1, 1, 1, 1, 1];
// const Posts = [1, 1, 1, 1, 1];
const MiddlePart = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const dispatch = useDispatch();

  const { post } = useSelector((store) => store);
  // console.log("post store ", post);

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
  };

  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModal(true);
    // console.log("open post model");
  };

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.newComment]);

  return (
    <div className="px-20">
      <section className="flex p-5 items-center rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{ width: "4.5rem", height: "4.5rem" }}
            // src="https://cdn.pixabay.com/photo/2019/11/07/17/54/woman-4609514_1280.jpg"
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {Story.map((item) => (
          <StoryCircle />
        ))}
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handleOpenCreatePostModel}
            readOnly
            className="outline w-[90%] rounded-full  px-5 bg-transparent  border-[#3b4054]"
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>Media </span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <VideocamIcon />
            </IconButton>
            <span>Video </span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ArticleIcon />
            </IconButton>
            <span>Write Article </span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
        {post.posts.map((item) => (
          <PostCard item={item} />
        ))}
      </div>
      <div>
        <CreatePostModal
          open={openCreatePostModal}
          handleClose={handleCloseCreatePostModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
