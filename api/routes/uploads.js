import { Router } from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import cloudinary from "../utils/cloudinary.js";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return;
    }

    const result = cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        return res
          .status(200)
          .json({ url: result.secure_url, publicId: result.public_id });
      })
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/edit-profile",
  upload.fields([{ name: "profile" }, { name: "cover" }]),
  async (req, res) => {
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              reject(error);
            } else {
              resolve({ url: result.secure_url, publicId: result.public_id });
            }
          }
        );
        stream.end(fileBuffer);
      });
    };

    try {
      const profilePromise = req.files?.profile?.[0]
        ? uploadToCloudinary(req.files.profile[0].buffer)
        : null;

      const coverPromise = req.files?.cover?.[0]
        ? uploadToCloudinary(req.files.cover[0].buffer)
        : null;

      const [profileData, coverData] = await Promise.all([
        profilePromise,
        coverPromise,
      ]);

      return res.json({
        profile: profileData,
        cover: coverData,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
