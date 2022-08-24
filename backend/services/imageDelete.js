const aws = require("aws-sdk");
const fs = require('fs');

const BUCKET_NAME = 'green-discussions-post-images'

const deleteFile = (fileName) => {

    const params = {
        Bucket: "ExampleBucket", 
        Key: "HappyFace.jpg"
       };


       s3.deleteObject(params, function(err, data) {

            if (err) {
                throw err;
            }
            console.log(`File deleted successfully. ${data.Location}`);

       });
}



 module.exports = deleteFile;