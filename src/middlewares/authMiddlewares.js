
import responseHandler from "../helpers/responseHandlerHelper.js";
import { verifyToken } from "../utils/tokenGeneratorUtil.js";

const authMiddlewares = (req, res, next) => {
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

export default authMiddlewares;
