const express = require("express");
const multer = require("multer");
const {
  uploadFile,
  getFileById,
  updateFile,
  deleteFile,
} = require("../controllers/file");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Protect all routes with authentication
router.use(authMiddleware);

// POST /files - Upload a file
router.post("/", upload.single("file"), uploadFile);

// GET /files/:id - Retrieve a file by ID
router.get("/:id", getFileById);

// PUT /files/:id - Update an existing file
router.put("/:id", upload.single("file"), updateFile);

// DELETE /files/:id - Delete a file
router.delete("/:id", deleteFile);

module.exports = router;
