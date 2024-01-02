import express from "express";
const router = express.Router();


import { DocumentController } from "../controllers/document.controller.js";

router.post("/createDocument", DocumentController.createDocument);
router.get("/getDocumentById/:id", DocumentController.getDocumentById);
router.get("/getAllDocuments", DocumentController.getAllDocuments);
router.delete("/deleteDocument/:id", DocumentController.deleteDocument);
router.put("/updateDocument/:id", DocumentController.updateDocument);
export default router;