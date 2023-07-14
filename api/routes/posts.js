import express from "express";
import {getPosts, addPost, deletePost, updatePinPost} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePinPost)



export default router