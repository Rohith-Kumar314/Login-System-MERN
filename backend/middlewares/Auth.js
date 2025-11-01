const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  try {
    // ✅ 1. Get the Authorization header
    const authHeader = req.headers['authorization'];
    console.log(req.headers);
    // ✅ 2. Check if it exists
    if (!authHeader) {
      return res
        .status(403)
        .json({ message: "Unauthorized: JWT token is required" });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

      
    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Invalid token format" });
    }

    // ✅ 4. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 5. Attach decoded user data to request
    req.user = decoded;

    // ✅ 6. Proceed to next middleware / route
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ message: "Unauthorized or invalid token" });
  }
};

module.exports = ensureAuthenticated;



// const ensureAuthenticated = (req,res,next)=>{
//     const auth = req.headers['authorization'];
//     if(!auth){
//         return res.status(403).json({message:"Unauthorized , JWT token is require"});
//     }
//     try{
//         const decoded = jwt.verify(auth,process.env.JWT_SECRET);
//         req.user = deccoded;
//         next();
        
//     }catch(err){
//         return res.status(403).json({
//             message:"Unauthorized"
//         })
//     }
// }

// module.exports = ensureAuthenticated;