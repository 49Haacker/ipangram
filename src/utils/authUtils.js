import jwt from "jsonwebtoken";

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

export function clearAuthCookies(response) {
  const isProd = process.env.NODE_ENV === "production";
  // console.log("from auth handler", process.env.NODE_ENV);

  const expired = {
    httpOnly: true,
    // secure: true,
    // sameSite: "Strict",
    // secure: isProd,
    // sameSite: isProd ? "none" : "lax",
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  };
  response.cookies.set("accessToken", "", expired);
  response.cookies.set("refreshToken", "", expired);
}
