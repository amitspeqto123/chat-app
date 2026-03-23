const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3");

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: "public-read", // ya private + signed URL
        key: (req, file, cb) => {
            const filename = Date.now() + "-" + file.originalname;
            cb(null, filename);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;