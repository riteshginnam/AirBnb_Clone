const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");

const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
const reveiwController=require("../controllers/review.js");

router.post("/",isLoggedIn,validateReview,wrapAsync(reveiwController.createReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reveiwController.destroyReview));
module.exports=router;