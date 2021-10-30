const { singleFileUpload, getAllSingleFiles, multipleFilesUpload, getAllMultipleFiles } = require('../controllers/fileUploader')
const { upload } = require("../config/multer");

const router = require('express').Router();

// ============================ARTIST ROUTE=======================

//===========SINGEFILE===========
router.get('/getAllSingleFiles', getAllSingleFiles);

router.post('/singleFileUpload', upload.single("file"), singleFileUpload);

//===========MULTIPLEFILE=========
router.get('/getAllMultipleFiles', getAllMultipleFiles);

router.post('/multipleFilesUpload', upload.array("files"), multipleFilesUpload);

module.exports = router;