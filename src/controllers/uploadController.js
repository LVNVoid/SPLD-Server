const { PrismaClient } = require("../generated/prisma");
const { cloudinary } = require("../utils/cloudinary");
const prisma = new PrismaClient();

exports.uploadReportImages = async (req, res, next) => {
  try {
    const { reportId } = req.params;

    const report = await prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report || report.authorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to upload to this report" });
    }

    await prisma.reportImage.createMany({
      data: req.files.map((file) => ({
        reportId,
        url: file.path,
        filename: file.filename,
        alt: file.originalname,
      })),
    });

    res.status(201).json({
      message: "Images uploaded and linked to report",
      urls: req.files.map((f) => f.path),
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadNarrativeImages = async (req, res, next) => {
  try {
    const { narrativeId } = req.params;
    const { captions = [] } = req.body;

    const narrative = await prisma.narrative.findUnique({
      where: { id: narrativeId },
    });

    if (!narrative || narrative.authorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to upload to this narrative" });
    }

    const captionsArray = Array.isArray(captions) ? captions : [captions];

    await prisma.narrativeImage.createMany({
      data: req.files.map((file, index) => ({
        narrativeId,
        url: file.path,
        filename: file.filename,
        alt: file.originalname,
        caption: captionsArray[index] || null,
        order: index,
      })),
    });

    res.status(201).json({
      message: "Images uploaded and linked to narrative",
      urls: req.files.map((f) => f.path),
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteNarrativeImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;

    const image = await prisma.narrativeImage.findUnique({
      where: { id: imageId },
      include: { narrative: true },
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const isOwner = image.narrative.authorId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const publicId = image.filename.replace(/\.[^/.]+$/, "");
    await cloudinary.uploader.destroy(publicId);

    await prisma.narrativeImage.delete({
      where: { id: imageId },
    });

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    next(err);
  }
};
