import express from 'express';
import { query, pool } from '../db.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Upload file
router.post('/upload', authenticate, authorizeRoles('lab','doctor','patient','superadmin'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { patient_id, category = 'general' } = req.body;
    const uploaded_by = req.user.id;

    if (!patient_id) {
      // Delete the uploaded file if no patient_id
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    // Save file metadata to database
    const result = await query(
      `INSERT INTO lab_reports (patient_id, uploaded_by, file_name, metadata, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [patient_id, uploaded_by, req.file.filename, JSON.stringify({
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        category,
        filePath: req.file.path
      })]
    );

    res.status(201).json({
      id: result.rows[0].id,
      file_name: req.file.filename,
      original_name: req.file.originalname,
      patient_id,
      uploaded_by,
      created_at: result.rows[0].created_at
    });
  } catch (err) {
    console.error('File upload error', err);
    res.status(500).json({ error: 'Could not upload file' });
  }
});

// Get file
router.get('/:filename', authenticate, async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
  } catch (err) {
    console.error('File download error', err);
    res.status(500).json({ error: 'Could not download file' });
  }
});

// Get file info
router.get('/info/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM lab_reports WHERE id = $1', [id]);
    
    if (!result.rows.length) {
      return res.status(404).json({ error: 'File not found' });
    }

    const file = result.rows[0];
    const filePath = path.join(uploadsDir, file.file_name);
    
    res.json({
      id: file.id,
      file_name: file.file_name,
      original_name: file.metadata?.originalName,
      patient_id: file.patient_id,
      uploaded_by: file.uploaded_by,
      metadata: file.metadata,
      created_at: file.created_at,
      exists: fs.existsSync(filePath)
    });
  } catch (err) {
    console.error('Get file info error', err);
    res.status(500).json({ error: 'Could not get file info' });
  }
});

// Delete file
router.delete('/:id', authenticate, authorizeRoles('lab','superadmin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get file info
    const result = await query('SELECT * FROM lab_reports WHERE id = $1', [id]);
    if (!result.rows.length) {
      return res.status(404).json({ error: 'File not found' });
    }

    const file = result.rows[0];
    const filePath = path.join(uploadsDir, file.file_name);

    // Delete file from disk
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await query('DELETE FROM lab_reports WHERE id = $1', [id]);

    res.json({ message: 'File deleted', id });
  } catch (err) {
    console.error('File delete error', err);
    res.status(500).json({ error: 'Could not delete file' });
  }
});

export default router;
