import School from '../models/school.js';
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const SchoolController = {
    createSchool: async (req, res) => {
        try {
            const newSchool = new School({
                // Set properties from request body
                name: req.body.name,
                code: req.body.code,
                image: req.body.image
            });

            const savedSchool = await newSchool.save();
            res.status(201).json(savedSchool);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get a single school by ID
    getSchoolById: async (req, res) => {
        try {
            const school = await School.findById(req.params.id);
            if (school) {
                res.json(school);
            } else {
                res.status(404).json({ message: "School not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all schools
    getAllSchools: async (req, res) => {
        try {
            const schools = await School.find();
            res.json(schools);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Update a school
    updateSchool: async (req, res) => {
        try {
            const updatedSchool = await School.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true } // Returns the updated document
            );

            if (updatedSchool) {
                res.json(updatedSchool);
            } else {
                res.status(404).json({ message: "School not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Delete a school
    deleteSchool: async (req, res) => {
        try {
            const deletedSchool = await School.findByIdAndDelete(req.params.id);

            if (deletedSchool) {
                res.json({ message: "School successfully deleted" });
            } else {
                res.status(404).json({ message: "School not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


};
