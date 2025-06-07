require('dotenv').config()
const authCheck = (req, res, next) => {
    const authHeader = req.headers['auth'];
    if(authHeader != process.env.auth)
    {
        return res.status(403).send({message:'Authentication Failed'})
    }
    next()
}
module.exports = authCheck;