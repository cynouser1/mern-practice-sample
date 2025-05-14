import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = (req, res, next) => {
  // const tokenn = req.header("Authorization")?.split(" ")[1];
  const token = req.header("Authorization");
  console.log("token", token);
  // console.log("tokenn", tokenn);
  // console.log("req.headers", req.headers);
  if (!token)
    // return res.status(401).json({ msg: "No token, authorization denied" });
    return res.status(401).json({ msg: "Unauthorized, JWT token is required" });

  try {
    // const decoded = jwt.verify(token, JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    console.log("JWT_SECRET", JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // res.status(401).json({ msg: "Invalid token" });
    res.status(401).json({ msg: "Unauthorized, JWT token is wrong or expired", err });
  }
};

// export default auth;
// module.exports = {
//   auth,
//   signupValidation,
//   signinValidation,
//   // other exports
// }
