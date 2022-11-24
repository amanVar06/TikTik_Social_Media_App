import sanityClient from "@sanity/client";
//to setup our sanity client

export const client = sanityClient({
  projectId: "7c2ybpjn",
  dataset: "production",
  apiVersion: "2022-08-09",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
