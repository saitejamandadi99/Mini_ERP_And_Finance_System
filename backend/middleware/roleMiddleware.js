const checkRole = ((allowedRoles)=>{
    return (req, res, next)=>{
        const userRole = req.user.role_id
        if (!allowedRoles.includes(userRole)){
            return res.status(403).json({message:'Access denied insufficient role access'})
        }
        next();
    }
})

module.exports = checkRole