import "../styles/globals.css";
import type { AppProps } from "next/app";
//coming from AppProps type(syntax type script) predefined by next/app
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";

//what kind of props we are passing to each and every componennt
const MyApp = ({ Component, pageProps }: AppProps) => {
  //nextjs application can be ran on backend and on front end
  //so one thing for us to make sure our app works well
  const [isSSR, setIsSSR] = useState(true); //server side rendering

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null; //this is for smoother workflow in the future

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      {/* whenever you change the environment variable you need to reload the server  */}
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        {/* on medius devices gap 20 */}
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
