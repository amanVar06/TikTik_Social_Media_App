import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// export const BASE_URL = "http://localhost:3000";

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  );

  console.log(response.credential);

  const { name, picture, sub } = decoded;
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);
  //when we reload the page the user is still going to be there

  await axios.post(`http://localhost:3000/api/auth`, user);

  // console.log(decoded);
};

// const handler = (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
//   return axios({
//     method: 'post',
//     headers : { 'Content-type': 'application/json' },
//     url: `${process.env.WEB_API_URL}/authentication/login`,
//     data: req.body,
//   })
//     .then((results) => {
//       res.status(results.status).json(results.data)
//     })
//     .catch((error) => {
//       res.status(error.status).json(error.response.data)
//     })
// }
