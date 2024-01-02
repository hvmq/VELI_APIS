import Document from '../models/document.js';
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const DocumentController = {
    // Create document
    createDocument: async (req, res) => {
        try {
            const newDocument = new Document({
                school_id: req.body.school_id,
                subject: req.body.subject,
                name: req.body.name,
                description: req.body.description,
                is_free: req.body.is_free,
                price: req.body.price,
                image: req.body.image,
                address: req.body.address,
                created_by: req.body.created_by,
                created_at: req.body.created_at
            });

            const savedDocument = await newDocument.save();
            res.status(200).json(savedDocument);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get a single document by ID
    getDocumentById: async (req, res) => {
        try {
            const document = await Document.findById(req.params.id);
            if (document) {
                res.json(document);
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all documents
    getAllDocuments: async (req, res) => {
        try {
            const documents = await Document.find().populate("created_by").populate("school_id");
            res.json(documents);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a document
    updateDocument: async (req, res) => {
        try {
            const updatedDocument = await Document.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true } // Returns the updated document
            );

            if (updatedDocument) {
                res.json(updatedDocument);
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a document
    deleteDocument: async (req, res) => {
        try {
            const deletedDocument = await Document.findByIdAndDelete(req.params.id);

            if (deletedDocument) {
                res.json({ message: "Document successfully deleted" });
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

};
