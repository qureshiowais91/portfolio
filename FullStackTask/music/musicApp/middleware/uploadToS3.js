const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadToS3 = (req, res, next) => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 20 * 1024 * 1024 }, 
    }).single('mp3');

    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: 'Error uploading file' });
        }

        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `mp3/${file.originalname}`, // Change the Key as needed
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Upload Error', err);
                return res.status(500).json({ error: 'Error uploading file to S3' });
            }

            console.log('Upload Success', data.Location);
            req.s3FileLocation = data.Location;
            console.log(req.s3FileLocation,"location") // Attach the S3 file location to the request object
        });
    });
};

module.exports = { uploadToS3 };