import express from "express";
import { deleteUser, getUser , updateUser, getOwnUser, updatePasswordUser} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getOwnUser)
router.get("/:userId", getUser)
router.put("/", updateUser)
router.put("/password", updatePasswordUser)
router.delete("/:userId", deleteUser)


export default router