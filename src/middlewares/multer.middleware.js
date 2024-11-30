import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb is the callback function used by multer to specify the storage location
      cb(null, "./public/Temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ 
     storage,
   })