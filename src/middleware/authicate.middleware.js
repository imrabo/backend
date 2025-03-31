import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  console.log('is the token',token)

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.userId = decoded.userId; // Attach user ID to request
    // console.log(userId)
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
