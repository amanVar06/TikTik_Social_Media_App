import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { render } from "react-dom";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";

  return (
    <div>
      {/* This sidebar is only for mobile devices for now 
      this sidebar contain a button to close and open the sidebar */}
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {/* this is the right way to do it in react 
        dont do like this setShowSidebar(!showSidebar) */}
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>

      {showSidebar && (
        <div
          className="xl:w-400 w-20 flex flex-col justify-start mb-10 
        border-r-2 border-gray-100 xl:border-0 p-3"
        >
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {/* // is usernot logged in then we want to render something */}
          {/* {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                Log in to like and comment on videos
              </p>

              <div className="pr-4">
                <GoogleLogin
                  clientId="400889397306-3he1sfdcrnauv7bb3ms3go2ur8ice2np.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className="bg-white text-lg text-[#f51997] border-[1px] 
                      border-[#f51997] font-semibold px-6 py-3 rounded-md 
                      outline-none w-full mt-3 hover:text-white hover:bg-[#f51997] 
                      cursor-pointer"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log in
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          )} */}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
