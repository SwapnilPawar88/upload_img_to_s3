const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    "Location": String,
});

const Urlmodel = mongoose.model("urlaws", urlSchema);

module.exports = Urlmodel;