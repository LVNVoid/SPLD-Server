const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const getAllPolsek = async (req, res) => {
  try {
    const polseks = await prisma.polsek.findMany({
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    res.json({
      message: "polseks retrieved successfully",
      data: polseks,
    });
  } catch (error) {
    console.error("Error fetching polseks:", error);
    res.status(500).json({
      message: "Error fetching polseks",
      error: error.message,
    });
  }
};

const getPolsekById = async (req, res) => {
  const { id } = req.params;

  try {
    const polsek = await prisma.polsek.findUnique({
      where: { id },
      include: {
        users: {
          select: { name: true, email: true },
        },
        _count: {
          select: { users: true },
        },
      },
    });

    if (!polsek) {
      return res.status(404).json({ message: "Polsek not found" });
    }

    res.json({ message: "Polsek retrieved successfully", data: polsek });
  } catch (error) {
    console.error("Error fetching polsek:", error);
    res.status(500).json({
      message: "Error fetching polsek",
      error: error.message,
    });
  }
};

const createPolsek = async (req, res) => {
  const { name } = req.body;

  try {
    const newPolsek = await prisma.polsek.create({
      data: { name },
    });

    res.json({ message: "Polsek created successfully", data: newPolsek });
  } catch (error) {
    console.error("Error creating polsek:", error);
    res.status(500).json({
      message: "Error creating polsek",
      error: error.message,
    });
  }
};

const updatePolsek = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedPolsek = await prisma.polsek.update({
      where: { id },
      data: { name },
    });

    res.json({ message: "Polsek updated successfully", data: updatedPolsek });
  } catch (error) {
    console.error("Error updating polsek:", error);
    res.status(500).json({
      message: "Error updating polsek",
      error: error.message,
    });
  }
};

const deletePolsek = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.polsek.delete({ where: { id } });

    res.status(200).json({ message: "Polsek deleted successfully" });
  } catch (error) {
    console.error("Error deleting polsek:", error);
    res.status(500).json({
      message: "Error deleting polsek",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPolsek,
  getPolsekById,
  createPolsek,
  updatePolsek,
  deletePolsek,
};
