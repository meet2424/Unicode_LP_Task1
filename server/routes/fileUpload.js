const { singleFileUpload, getAllSingleFiles, multipleFilesUpload, getAllMultipleFiles } = require('../controllers/fileUploader')
const { protected } = require("../middleware/protected")

const { upload } = require("../config/multer");

const router = require('express').Router();

// ============================ARTIST ROUTE=======================
router.get('/artist', protected, (req, res) => {
    try {
        if (req.user.role === 'artist') {
            res.status(200).json({
                success: true,
                username: req.user.username
            })
        }
    } catch (error) {
        res.status(401).json({
            success: false,
        })
    }

})

//===========SINGEFILE===========
router.get('/getAllSingleFiles', getAllSingleFiles);

router.post('/singleFileUpload', upload.single("file"), singleFileUpload);

//===========MULTIPLEFILE=========
router.get('/getAllMultipleFiles', getAllMultipleFiles);

router.post('/multipleFilesUpload', upload.array("files"), multipleFilesUpload);

module.exports = router;