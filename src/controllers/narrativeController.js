const { PrismaClient } = require("../generated/prisma");
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
  const { title, content, status, publishedAt, reportId, images } = req.body;

  try {
    const newNarrative = await prisma.narrative.create({
      data: {
        title,
        content,
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
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
      },
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
    const updatedNarrative = await prisma.narrative.update({
      where: { id },
      data: {
        title,
        content,
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      },
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
  const { id } = req.params;

  try {
    await prisma.narrative.delete({
      where: { id },
    });

    res.json({
      message: "Narrative deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting narrative:", error);
    res.status(500).json({
      message: "Error deleting narrative",
      error: error.message,
    });
  }
};
