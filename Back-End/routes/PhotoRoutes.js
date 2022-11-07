const express = require('express');
const router = express.Router();

//Controller
const {
    insertPhoto,
    deletePhoto, 
    getAllPhotos,
    getAllPhotosByUseId,
} = require("../controller/PhotoController");

//Middleswares
const {photoInsertValidation} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/AuthGuard");
const validate = require("../middlewares/handlerValidator");
const {imageUpload} = require("../middlewares/imageUpload");

//Routes
router.post("/", 
authGuard, 
imageUpload.single("image"),
photoInsertValidation(),
validate, 
insertPhoto );

router.delete("/:id", authGuard,deletePhoto);

router.get("/",authGuard,getAllPhotos);

router.get("/user",authGuard,getAllPhotosByUseId);

module.exports = router;