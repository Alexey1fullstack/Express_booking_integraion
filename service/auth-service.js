const jwt = require('jsonwebtoken');

/**
 * Role: Handling all authentication
 * Package: jsonwebtoken
 */
const AuthService = {
    /**
     * Role: generating the token for identify the users.
     * Param: user.
     * If this function is called, the token is genterate using the parameter based on the jsonwebtoken package. So, the user will have the unique identifer.
     */
    generateJWT(user){
        const tokenData = {
            username : user.username,
            id : user._id
        };
        return jwt.sign({ user : tokenData }, process.env.TOKEN_SECRET);
    },
    /**
     * Role: decode the token
    */
    decodeToken(req){
        const token = req.headers.authorization || req.headers['authorization'];
    
        if(!token){
            return null;
        }
    
        try{
            return jwt.verify(token, process.env.TOKEN_SECRET);
        }
        catch(error){
            return null;
        }
    },
    /**
     * Role: If there is no token, can be guess this user is not verified, so we can ask the login.
     * 
     */
    requireLogin(req, res, next){
        const token = this.decodeToken(req);
        if(!token){
            res.status(401).json();
        }
        next();
    },
    /**
     * 
     * Role: getting the username from the parameter
     */
    getUsername(req){
        const token = this.decodeToken(req);
        if(!token){
            return null;
        }
        return token.user.username;
    },
    /**
     * 
     * Role: getting the userid from the parameter
     */
    getUserId(req){
        const token = this.decodeToken(req);
        if(!token){
            return null;
        }
        return token.user.id;
    }
};


module.exports = AuthService;