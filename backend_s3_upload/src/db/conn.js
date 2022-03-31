const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/aws_files",{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("Database Connected ! "))
.catch((err) => console.log(err));