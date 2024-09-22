import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/users", UserController.createUser);

export default router