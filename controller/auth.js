const signup = (req,res)=>{
    const {user,authInfo:{message}} = req
    res.status(200).json({user, message})
 }


 module.exports = { signup }