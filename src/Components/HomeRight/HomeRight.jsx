import { Card } from "@mui/material";
import React from "react";
import PopularUserCard from "../PopularUserCard/PopularUserCard";
import SearchUser from "../SearchUser/SearchUser";

const PopularUser = [1, 1, 1, 1, 1];
const HomeRight = () => {
  return (
    <div className="pr-5">
      <SearchUser />

      <Card className="p-5">
        <div className="flex justify-between py-5 items-center  ">
          <p className=" font-semibold opacity-70">Suggestion for you </p>
          <p className="text-xs font-semibold opacity-95">Veiw All</p>
        </div>
  
        <div className=" ">
          {PopularUser.map((item) => (
            <PopularUserCard />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
