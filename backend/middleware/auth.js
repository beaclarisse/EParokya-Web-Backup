const User = require('../models/user')
const jwt = require("jsonwebtoken")

// exports.isAuthenticatedUser = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 

//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//         req.user = decoded; 
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid or expired token' });
//     }
// };

exports.isAuthenticatedUser = async (req, res, next) => {
    let token = ''
    if (req.cookies) {
        token = req.cookies.token
    }
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log('Extracted token:', token);

    // const jwtString = token.split(' ')[1]
    //  console.log("token", jwtString)

    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = await User.findById(decoded.id); // Find user by ID from token
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // req.user = await User.findById(decoded.id);
    // next()

};

// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//         console.log(roles, req.user, req.body);
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: `Role (${req.user.role}) is not allowed to acccess this resource` })

//         }
//         next()
//     }
// }
exports.authorizeAdmin = () => {
    return (req, res, next) => {
        console.log(req.user, req.body);
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: `Access denied. Admin privileges required.` });
        }
        next();
    };
};
