const multer = require('multer');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads/img');

console.log('sciezka z multera', uploadDir);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
    console.log('do tej destynacji', uploadDir);
    
  },
  filename: (req, file, cb) => {
    console.log('cos tam tworze');
    
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Dozwolone są tylko pliki graficzne!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;