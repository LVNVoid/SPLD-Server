const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
exports.getStats = async (req, res) => {
  try {
    const [reportsCount, narrativesCount, usersCount, polseksCount] =
      await prisma.$transaction([
        prisma.report.count(),
        prisma.narrative.count(),
        prisma.user.count(),
        prisma.polsek.count(),
      ]);

    res.json({
      success: true,
      data: {
        reports: { total: reportsCount },
        narratives: { total: narrativesCount },
        polseks: { total: narrativesCount },
        users: { total: usersCount },
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};
