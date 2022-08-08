import React from "react";
import { Video } from "../types";
import { NextPage } from "next";

interface Iprops {
  post: Video;
}

//using tyescript (for more complicated types)see video here again
const VideoCard: NextPage<Iprops> = ({ post }) => {
  return <div>VideoCard</div>;
};

export default VideoCard;
