const db = require("../db")
const response = require("../helper/responses");



const isAuth = (req, res, next)=> {

    if(req.headers.authorization){
        const token = req.headers.authorization?.split("Bearer")[1]
        const json = JSON.parse(token)
        db.query(`SELECT * FROM users WHERE email='${json.email}' AND name='${json.name}' AND id='${json.id}'`, (err, result) =>{
            if(err)
                return response.failedWithMessage(res, "login first");

            if(result?.length > 0) {
                req.user = {
                    ...result[0]
                }
                next()
            }
            else 
                return response.failedWithMessage(res, "login first");
        })
        
    }else
        return response.failedWithMessage(res, "login first");
}


module.exports= {
    isAuth
}