import { Avatar } from '@mui/material';
import React from 'react'


const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "4.5rem", height: "4.5rem" }}
          src="https://cdn.pixabay.com/photo/2019/11/07/17/54/woman-4609514_1280.jpg"
        >
        </Avatar>
        <p>Taylor</p>
      </div>   
    </div>
  );
}

export default StoryCircle 