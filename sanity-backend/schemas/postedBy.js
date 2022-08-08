export default {
  name: "postedBy",
  title: "Posted By",
  type: "reference",
  // type refernce meaning it is going to connect to
  // different document
  to: [{ type: "user" }],
  //it is a refernce to array of users
  //meaning one user can post multiple comments
  //and will keep track of which comments has the user posted
};
