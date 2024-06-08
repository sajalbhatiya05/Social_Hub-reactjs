import { Avatar, Button, CardHeader } from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";

const PopularUserCard = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={<Button size="small">Follow</Button>}
        title={auth.user?.firstName + " " + auth.user?.lastName}
        subheader={
          "@" +
          auth.user?.firstName.toLowerCase() +
          " " +
          auth.user?.lastName.toLowerCase()
        }
      />
    </div>
  );
};

export default PopularUserCard;
