const { PrismaClient } = require("../generated/prisma");
const { cloudinary } = require("../utils/cloudinary");
const prisma = new PrismaClient();

exports.getAllNarratives = async (req, res) => {
  try {
    const narratives = await prisma.narrative.findMany({
      include: {
        images: true,
        author: { select: { name: true, email: true } },
        report: { select: { title: true } },
      },
    });

    res.json({
      message: "Narratives retrieved successfully",
      data: narratives,
    });
  } catch (error) {
    console.error("Error fetching narratives:", error);
    res.status(500).json({
      message: "Error fetching narratives",
      error: error.message,
    });
  }
};

exports.getNarrativeById = async (req, res) => {
  const { id } = req.params;

  try {
    const narrative = await prisma.narrative.findUnique({
      where: { id },
      include: {
        images: true,
        author: { select: { name: true, email: true } },
        report: { select: { title: true } },
      },
    });

    if (!narrative) {
      return res.status(404).json({ message: "Narrative not found" });
    }

    res.json({
      message: "Narrative retrieved successfully",
      data: narrative,
    });
  } catch (error) {
    console.error("Error fetching narrative:", error);
    res.status(500).json({
      message: "Error fetching narrative",
      error: error.message,
    });
  }
};

exports.createNarrative = async (req, res) => {
  const {
    title,
    content,
    publishedAt,
    reportId,
    images,
    status = "DRAFT",
  } = req.body;

  try {
    const dataToCreate = {
      title,
      content,
      status,
      publishedAt: null,
      reportId,
      authorId: req.user.id,
      images: {
        create:
          images?.map((img) => ({
            url: img.url,
            filename: img.filename,
            alt: img.alt,
            caption: img.caption,
            order: img.order || 0,
          })) || [],
      },
    };

    if (status === "PUBLISHED" && !publishedAt) {
      dataToCreate.publishedAt = new Date();
    } else if (publishedAt) {
      dataToCreate.publishedAt = new Date(publishedAt);
    }

    const newNarrative = await prisma.narrative.create({
      data: dataToCreate,
      include: {
        images: true,
      },
    });

    res.status(201).json({
      message: "Narrative created successfully",
      data: newNarrative,
    });
  } catch (error) {
    console.error("Error creating narrative:", error);
    res.status(500).json({
      message: "Error creating narrative",
      error: error.message,
    });
  }
};

exports.updateNarrative = async (req, res) => {
  const { id } = req.params;
  const { title, content, status, publishedAt } = req.body;

  try {
    const dataToUpdate = {
      title,
      content,
      status,
    };

    if (status === "PUBLISHED" && !publishedAt) {
      dataToUpdate.publishedAt = new Date();
    } else if (publishedAt) {
      dataToUpdate.publishedAt = new Date(publishedAt);
    }

    const updatedNarrative = await prisma.narrative.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json({
      message: "Narrative updated successfully",
      data: updatedNarrative,
    });
  } catch (error) {
    console.error("Error updating narrative:", error);
    res.status(500).json({
      message: "Error updating narrative",
      error: error.message,
    });
  }
};

exports.deleteNarrative = async (req, res) => {
  try {
    const { id } = req.params;

    const narrative = await prisma.narrative.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!narrative) {
      return res.status(404).json({ message: "Narrative not found" });
    }

    const isOwner = narrative.authorId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    for (const img of narrative.images) {
      const publicId = img.filename.replace(/\.[^/.]+$/, "");
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.narrative.delete({ where: { id } });

    res.json({
      message: "Narrative and associated images deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting narrative:", error);
    res.status(500).json({
      message: "Error deleting narrative",
      error: error.message,
    });
  }
};

exports.getPublishedNarratives = async (req, res) => {
  try {
    const publishedNarratives = await prisma.narrative.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        images: { take: 1 },
        author: { select: { name: true } },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    if (!publishedNarratives || publishedNarratives.length === 0) {
      return res
        .status(404)
        .json({ message: "Published narratives not found" });
    }

    res.json({
      message: "Published narratives retrieved successfully",
      data: publishedNarratives,
    });
  } catch (error) {
    console.error("Error fetching narratives:", error);
    res.status(500).json({
      message: "Error fetching narratives",
      error: error.message,
    });
  }
};

exports.getPublishedNarrativesById = async (req, res) => {
  const { id } = req.params;

  try {
    const narrative = await prisma.narrative.findUnique({
      where: { id, status: "PUBLISHED" },
      select: {
        title: true,
        content: true,
        publishedAt: true,
        images: true,
        author: { select: { name: true } },
      },
    });

    if (!narrative) {
      return res.status(404).json({ message: "Published narrative not found" });
    }

    res.status(200).json({
      message: "Published narrative retrieved successfully",
      data: narrative,
    });
  } catch (error) {
    console.error("Error fetching narrative:", error);
    res.status(500).json({
      message: "Error fetching narrative",
      error: error.message,
    });
  }
};
