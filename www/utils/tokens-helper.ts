import JWT from 'jsonwebtoken'
require("dotenv").config({ path: '../../.env' })

export const jwtManager = (data:any, source_id: 1 | 2)=>{
    return new Promise( (resolve) => {
        if(source_id == 1){
            let jwtSecretKey = process.env.JWT_TOKEN_KEY
            let createJwtData = data
            if(typeof(jwtSecretKey) === "string"){
                resolve(JWT.sign(createJwtData, jwtSecretKey))
                return
            }
            console.log("JWT Token Key Error")
            resolve(0)
        }
        else if(source_id == 2){
            let jwtSecretKey = process.env.JWT_TOKEN_KEY
            if(typeof(jwtSecretKey) === "string"){
                const decodedData = JWT.verify(data, jwtSecretKey)
                if(typeof(decodedData) === "object"){
                    resolve(decodedData);
                    return
                }
                console.log("JWT Token Decoding Failed")
                resolve(0)
                return
            }
            console.log("JWT Token Key Error")
            resolve(0)
        }
    })
}
