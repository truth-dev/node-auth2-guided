const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config')



// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization // this is the cookie we set in the login endpoint
  if(token){
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        next({status: 401, message: `token bad, you cant come in`})
      }else{
      req.decodedJwt = decoded
      console.log(req.decodedJwt)  
      }
  }) 
}else{
    next({status: 401, message: 'wtf, no token?!'})
  }
}

// AUTHORIZATION
const checkRole = role => (req, res, next) => {
  if(req.decodedJwt && req.decodedJwt.role === role){
    next()
  }else{
    next({status: 403, message:'you have no power here'})
  }
}

module.exports = {
  restricted,
  checkRole,
}
