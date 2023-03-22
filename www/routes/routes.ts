import express, { Request, Response } from "express";
import { UserRegistration } from "../middleware/UserRegistration";

router.get("/getprofilepic", async (req: Request, res: Response) => {
  GetProfilePicture(req, res);
})

export {router};
