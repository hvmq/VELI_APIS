import express from "express";
const router = express.Router();


import { SchoolController } from "../controllers/school.controller.js";

router.post("/createSchool", SchoolController.createSchool);
router.get("/getSchoolByIdd/:id", SchoolController.getSchoolById);
router.get("/getAllSchools", SchoolController.getAllSchools);
router.delete("/deleteSchool/:id", SchoolController.deleteSchool);
router.put("/updateSchool/:id", SchoolController.updateSchool);
export default router;