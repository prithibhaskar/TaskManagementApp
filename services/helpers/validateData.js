function validateUserData(req, res, next){
    const {userName, userEmail, userPassword} = req.body;
    if(! userName || ! userEmail || ! userPassword){
        return res.status(400).json({error: "Bad request. One or more of required fields missing"});
    }
    next();
}

export default validateUserData;