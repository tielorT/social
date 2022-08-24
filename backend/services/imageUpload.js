const aws = require("aws-sdk");
const fs = require('fs');

const BUCKET_NAME = 'green-discussions-post-images'

const uploadFile = (fileName) => {

  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = { 
      Bucket: BUCKET_NAME,
      Key: fileName, // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
}


module.exports = uploadFile;