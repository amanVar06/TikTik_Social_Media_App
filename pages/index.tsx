import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

//whenever you are accepting some props inside your next js page
//we need to create a interface(also like an object)
//Iprops : interface props
interface Iprops {
  videos: Video[];
}

//from where we make real api calls

//now to render and fetch different videos
//fetch real videos from sanity and display there

//we are saying our home component will accept the array of videos
//video is going to a type of Iprops
//and now we know exactly what the video contains
const Home = ({ videos }: Iprops) => {
  // console.log(videos);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
};

// the way we fetch data in next js is by using getServerSideProps
//in our case we need to fetch new videos each time when we load the page
//see docs when to use this function
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  // so we are making some kind of a get call to a specific url
  // making a get request to our own backend, inside of next js we can
  // create our own fully fledged back-end

  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};

//we are going to make a call to sanity from our api request
export default Home;
