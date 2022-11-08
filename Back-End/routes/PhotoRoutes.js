const express = require('express');
const router = express.Router();

//Controller
const {
    insertPhoto,
    deletePhoto, 
    getAllPhotos,
    getAllPhotosByUseId,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searcPhotoByTitle,
} = require("../controller/PhotoController");

//Middleswares
const {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidator,
} = require("../middlewares/photoValidation");
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

router.get("/search", authGuard, searcPhotoByTitle);

router.get("/:id",authGuard,getPhotoById);

router.put("/:id",authGuard,photoUpdateValidation(),validate,updatePhoto);

router.put("/like/:id", authGuard,likePhoto);

router.put("/comment/:id",authGuard,commentValidator(),validate,commentPhoto);

module.exports = router;