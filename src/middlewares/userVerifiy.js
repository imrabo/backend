
import responseHandler from "../utils/responseHandler.js";
import { verifyToken } from "../utils/tokenGenerator.js";

const userVerifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responseHandler(res,401, false, "Access Denied. No token provided." )
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = verifyToken(token)
    req.user = decoded; 
    next();
  } catch (error) {
    return responseHandler(res, 403,false, "Invalid or expired token.")
  }
};

export default userVerifyJWT;
