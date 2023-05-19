const jwt = require('jsonwebtoken'); 
const SECRET_KEY = "mayurkoli@@@@#$890"

const auth = (req, res, next)=>{

    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.id;
           
        }else{
            res.status(401).json({message: "Unauthorized User"});
        }
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }
}

module.exports = {auth};


// const authHeader = req.headers['authorization'];
// const token = authHeader && authHeader.split(' ')[1];
// if (token == null) return res.sendStatus(401);
// jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
// })