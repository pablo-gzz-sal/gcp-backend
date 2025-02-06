import jwt from "jsonwebtoken"

const verifyJWT = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization || req.header.Authorization

    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({error: "Unauthorized: Missing or invalid authorization header"})

    const token = authHeader.split(' ')[1]

    


}