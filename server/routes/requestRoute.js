const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid/v4");
const script = require("../script/script")


module.exports = app => {
  // configure storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      //directory -> root is server
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      //to create a random filename
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, file.originalname);
    }
  });
  // create the multer instance that will be used to upload/save the file
  const upload = multer({ storage });

  //route
  app.post("/api/request", upload.any(), function(req, res) {
    console.log(req.body);

    //run script
    script.startScript(req.body);
  });
};
