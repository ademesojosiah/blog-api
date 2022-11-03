const signup = (req,res)=>{
    const {user,authInfo:{message}} = req
    res.status(200).json({user, message})
 }


const login = (req,res)=>{
    const {user} = req
    res.status(200).json({user})
}


 module.exports = { signup , login}