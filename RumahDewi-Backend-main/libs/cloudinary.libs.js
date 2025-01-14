const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

exports.uploader = (file) => {
  return new Promise(function (resolve, reject) {
    if (!file || !file.data) {
      return reject(new Error('No file provided'));
    }

    cloudinary.uploader
      .upload_stream(
        { 
          resource_type: "auto",
          public_id: file.publicId 
        }, 
        function (error, result) {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        }
      )
      .end(file.data);
  });
};
