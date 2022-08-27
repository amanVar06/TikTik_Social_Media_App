import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "../store/authStore";

interface Iprops {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[]; //an array of objects
  isAlreadyLiked: boolean;
}

const LikeButton = ({
  isAlreadyLiked,
  likes,
  handleLike,
  handleDislike,
}: Iprops) => {
  // const [alreadyLiked, setAlreadyLiked] = useState(false);
  // const { userProfile }: any = useAuthStore();

  // const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
  // const findLike = likes?.find((item) => item._ref == userProfile._id);

  // console.log(likes);

  // useEffect(() => {
  //   // if (findLike) {
  //   if (filterLikes?.length > 0) {
  //     setAlreadyLiked(true);
  //   } else {
  //     setAlreadyLiked(false);
  //   }
  //   // }, [likes, findLike]);
  // }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {isAlreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
