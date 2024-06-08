import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateReelsFrom from "../../Components/Reels/CreateReelsForm";
import HomeRight from "../../Components/HomeRight/HomeRight";
import MiddlePart from "../../Components/MiddlePart/MiddlePart";
import Reels from "../../Components/Reels/Reels";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  // console.log("auth", auth);   

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, [jwt]);

  return (
    <div className="px-5">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid
          item
          className="flex px-5 justify-center"
          xs={12}
          lg={location.pathname === "/" ? 6 : 9}
        >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsFrom />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>

        {location.pathname === "/" && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
