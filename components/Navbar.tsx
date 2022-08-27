import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
//using @react-ouath/google instead of react-google-login
//because react-google-login is deprecated, google
//urging us to using their new identity services
//now we implement how to use new google identity released in may 2022
//one additional package we need to install and that is jwt
//and the reason for that is that google identity services now only
//allows you to login but it doesn't allow you to get the profile
//image or username now we have to do that by decoding the json web token
//that we get back from the login
//now we will learn how to integrate our react application with google
//identity services
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  const {
    userProfile,
    addUser,
    removeUser,
  }: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();

  return (
    <div
      className="w-full flex justify-between items-center border-b-2 
      border-gray-200 py-2 px-4"
    >
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            layout="responsive"
          />
          {/* that images is an optimzed next jsImag component */}
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/upload">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            )}

            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser);
            }}
            onError={() => {
              console.log("Error");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
