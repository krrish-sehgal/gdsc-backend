const File = require("../models/File");
const fs = require("fs-extra");

// POST /files - Upload a file
exports.uploadFile = async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.filename,
      filePath: req.file.path,
    });
    await newFile.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error });
  }
};

// GET /files/:id - Retrieve a file by ID
exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.download(file.filePath, file.filename); // Use res.download to send the file
  } catch (error) {
    res.status(500).json({ message: "Error retrieving file", error });
  }
};

// PUT /files/:id - Update a file by replacing it with a new one
exports.updateFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete the old file from the server
    await fs.remove(file.filePath);

    // Update metadata and file path
    file.filename = req.file.filename;
    file.filePath = req.file.path;
    await file.save();

    res.status(200).json({ message: "File updated successfully", file });
  } catch (error) {
    res.status(500).json({ message: "File update failed", error });
  }
};

// DELETE /files/:id - Delete a file
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete the file from the server
    await fs.remove(file.filePath);

    // Remove metadata from the database
    await File.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "File deletion failed", error });
  }
};
