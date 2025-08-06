import jwt from "jsonwebtoken";

export const getDataFromToken = async (request) => {
  // console.log("request", request.cookies.get("accessToken"));
  const token = request.cookies.get("accessToken")?.value || "";
  // console.log("token", token);
  if (!token) {
    throw new Error("Access token is missing");
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decodedToken;
};
