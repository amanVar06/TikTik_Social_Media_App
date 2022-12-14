import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { NextPage } from "next";

interface Iprops {
  post: Video;
}

//using tyescript (for more complicated types)see video here again

//Invalid Src prop error, in next js you have to configure your
//image's hostname
const VideoCard: NextPage<Iprops> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  //we can attach this video ref to our video
  //we are essentially saying here to typescript and react that
  //hey this video ref is going to be attached to the html video element
  //which then has a pause and play properties

  //we are getting red underline error on vidoRef.current
  //which is saying that this element can possibly be null
  //because in start we do set to  null using useRef
  //thats why it better to use TypeScript
  //to fix that we are using ? before .
  //this is to make sure our application wont crash if it doesnt work
  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  //this is foe muting and unmuting of the video
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 items-center p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              {/* you cant put an image as a child componentof link  */}
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                {/* this div for the username and the actual name  */}
                <p className="flex gap-2 items-center lg:text-lg md:text-md font-bold text-primary">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>

                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="font-semibold capitalize p-2 flex flex-wrap
      w-[200px] lg:w-[600px] lg:ml-20 text-lg mb-2"
      >
        {post.caption}
      </div>

      {/* now for the actual video part  */}
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              //   it is just same as the manipulating the element using getElementById in plain html
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-200"
              src={post.video.asset.url}
            ></video>
          </Link>

          {/* do this block of code when isHover is true  */}
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {/* for button to do something we have to change the state of the video play or pause on click using useRef hook */}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
