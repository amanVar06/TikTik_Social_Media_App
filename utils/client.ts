import sanityClient from "@sanity/client";
//to setup our sanity client

export const client = sanityClient({
  projectId: "7c2ybpjn",
  dataset: "production",
  apiVersion: "2022-08-09",
  useCdn: true,
  token: "sk3zBfpj4fOLJYSzNlQvMW8cKAPqt8h9A90INZpyfmuNySCp6Ca4SxQwQX9r4CFqytpFivOW6ffOL7bHYc1QOeqNxEiDijZsHVqeKHVrq1NxuHI2CIPYxpzIFcJPpB4s5glvlXHoKHb0i9dOAUEi4aAstxULVxvOYa47RxqcSIwkiOByYuwl",
});
