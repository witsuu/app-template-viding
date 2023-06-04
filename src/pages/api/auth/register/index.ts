import { registerUtils } from "@/lib/registerUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const data = await registerUtils(req.body)

            return res.status(200).json({
                status: 200,
                message: "User Created Succesfully!",
                user: data
            })
        } catch (error: any) {
            return res.status(403).json({
                status: 403,
                message: error?.code === "P2002" ? "Email already exist!" : `Error Code = "${error?.code}". Please contact developer!`
            })
        }
    }

    return res.status(404)
}