import User from "@/backend/models/Users.models";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { ApiError } from "./ApiError";
import { handleApiError } from "./handleApiError";

export function authHandler(handler) {
  return async (request, context) => {
    try {
      // console.log("request", request.cookies);
      const decodedTokenData = await getDataFromToken(request);
      // console.log("decodedTokenData", decodedTokenData);

      const validUser = await User.findOne({
        where: { id: decodedTokenData.id },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "password",
            "refresh_token",
            "refresh_token_expires",
          ],
        },
        raw: true,
      });
      if (!validUser) throw new ApiError(401, "User not found or deleted");

      return await handler(request, context, validUser);
    } catch (error) {
      return handleApiError(error, request);
    }
  };
}
