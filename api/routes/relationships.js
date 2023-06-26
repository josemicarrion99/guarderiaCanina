import express from "express";
import {getRelationships, addRelationships, deleteRelationships, updateRelationship} from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationships);
router.delete("/", deleteRelationships);
router.put("/", updateRelationship);


export default router;