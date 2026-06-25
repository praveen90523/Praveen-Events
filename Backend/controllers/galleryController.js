import Gallery from "../models/Gallery.js";
import path from "path";
import fs from "fs";

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res, next) => {
  try {
    const galleryItems = await Gallery.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: galleryItems.length,
      gallery: galleryItems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a gallery image
// @route   POST /api/gallery
// @access  Private (Admin)
export const createGallery = async (req, res, next) => {
  try {
    let imageUrl = "";

    // If file was uploaded via Multer
    if (req.file) {
      // Store relative path (e.g. /uploads/filename.jpg)
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      // Use raw image URL if provided
      imageUrl = req.body.image;
    } else {
      res.status(400);
      return next(new Error("Please upload an image file or provide an image URL"));
    }

    const newImage = await Gallery.create({
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      gallery: newImage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
export const deleteGallery = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      res.status(404);
      return next(new Error("Gallery item not found"));
    }

    // If file is stored locally, delete it from the filesystem
    if (item.image.startsWith("/uploads/")) {
      const filename = item.image.split("/uploads/")[1];
      const filePath = path.join(process.cwd(), "uploads", filename);
      
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error("Error deleting local file:", unlinkErr.message);
          });
        }
      });
    }

    await item.deleteOne();
    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
