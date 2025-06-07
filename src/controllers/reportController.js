const { PrismaClient } = require("../generated/prisma");
const { cloudinary } = require("../utils/cloudinary");
const prisma = new PrismaClient();

exports.getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        images: false,
        author: {
          select: {
            name: true,
            polsek: { select: { name: true } },
          },
        },
      },
    });

    res.json({
      message: "Reports retrieved successfully",
      data: reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      message: "Error fetching reports",
      error: error.message,
    });
  }
};

exports.getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        images: true,
        author: {
          select: {
            name: true,
            email: true,
            polsek: { select: { name: true } },
          },
        },
        narrative: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({
      message: "Report retrieved successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    res.status(500).json({
      message: "Error fetching report",
      error: error.message,
    });
  }
};

exports.createReport = async (req, res) => {
  const { title, description, date, images } = req.body;
  try {
    const newReport = await prisma.report.create({
      data: {
        title,
        description,
        date: new Date(date),
        authorId: req.user.id,
        images: {
          create:
            images?.map((img) => ({
              url: img.url,
              filename: img.filename,
              alt: img.alt,
            })) || [],
        },
      },
      include: {
        images: true,
      },
    });

    res.status(201).json({
      message: "Report created successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({
      message: "Error creating report",
      error: error.message,
    });
  }
};

exports.updateReport = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const updatedReport = await prisma.report.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
      },
    });

    res.json({
      message: "Report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({
      message: "Error updating report",
      error: error.message,
    });
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const isOwner = report.authorId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    for (const img of report.images) {
      const publicId = img.filename.replace(/\.[^/.]+$/, "");
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.report.delete({ where: { id } });

    res.json({ message: "Report and associated images deleted" });
  } catch (error) {
    next(error);
  }
};
