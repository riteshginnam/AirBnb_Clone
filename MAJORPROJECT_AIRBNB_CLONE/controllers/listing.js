const Listing=require("../models/listing");
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
}
module.exports.renderNewForm=async(req, res) => {
    res.render("listings/new.ejs");
}
module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        res.redirect("/listings");
    }else{
        res.render("listings/show.ejs", { listing });
    }
}
module.exports.createListing=async (req, res,next) => {        
        const listing = req.body.listing;
        let url=req.file.path;
        let filename=req.file.filename;
        // console.log(listing);
        const newListing = new Listing(listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
}
module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
}
module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}
module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Deleted Listing!");
    res.redirect("/listings");
}