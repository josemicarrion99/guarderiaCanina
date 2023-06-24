import express from "express";
import { deleteUser, getUser , updateUser} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.delete("/", deleteUser)


export default router