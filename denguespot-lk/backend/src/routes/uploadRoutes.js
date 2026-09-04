import express from 'express';
import upload from '../middleware/upload.js';

const router = express.Router();

// The field name 'image' must match the field name in your form/frontend
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // The Cloudinary URL of the uploaded image is available in req.file.path
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

export default router;
