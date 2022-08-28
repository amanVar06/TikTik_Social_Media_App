import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import axios from "axios";
import { Video } from "../../types";

import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";

import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface Iprops {
  postDetails: Video;
}

const Detail = ({ postDetails }: Iprops) => {
  const [post, setPost] = useState(postDetails);
  //because we want to manually change the post
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  // console.log(post);

  //for Like work
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const filterLikes = post.likes?.filter(
    (item) => item._ref === userProfile?._id
  );
  // // const findLike = likes?.find((item) => item._ref == userProfile._id);

  // // console.log(likes);

  useEffect(() => {
    // if (findLike) {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
    // }, [likes, findLike]);
  }, [filterLikes, post.likes]);

  // console.log(userProfile);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  //this is foe muting and unmuting of the video
  //we need to keep track of post also here
  //if we go to different detail page we want to rerun our
  //useEffect
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      //if we want to update something we will a put request
      const { data } = await axios.put("http://localhost:3000/api/like", {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      // console.log("data", data);
      // console.log("post", post);

      setPost({ ...post, likes: data.likes });
      // console.log(post);
      //see files [id].tsx LikeButton.tsx like.ts to fix like button issue also see commit
      // setPost((prevPost) => ({ ...prevPost, likes: data.likes }));
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      //put when we want to add something/or update something to the document
      const { data } = await axios.put(
        `http://localhost:3000/api/post/${post._id}`,
        {
          userId: userProfile._id,
          comment,
        }
      );

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        {/* setting up video view now  */}
        <div className="relative">
          <div className="lg:h-[100vh] h-[80vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>

          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          {/*copied frm video card*/}
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
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
              <Link href="/">
                <div className="mt-3 flex flex-col gap-2">
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

          <p className="px-10 text-lg text-gray-600">{post.caption}</p>

          <div className="mt-10 px-10">
            {/* we can only like if we are logged in  */}
            {userProfile && (
              <LikeButton
                likes={post.likes}
                isAlreadyLiked={alreadyLiked}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>

          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
