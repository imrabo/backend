import jsonwebtoken from "jsonwebtoken";

const SECRET_KEY = process.env.Key;

function generateToken(payload) {
  return jsonwebtoken.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  if (!token) return null;
  try {
    return jsonwebtoken.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export { generateToken, verifyToken };
