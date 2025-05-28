const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  await prisma.narrativeImage.deleteMany();
  await prisma.narrative.deleteMany();
  await prisma.reportImage.deleteMany();
  await prisma.report.deleteMany();
  await prisma.user.deleteMany();
  await prisma.polsek.deleteMany();

  console.log("🧹 Cleaned existing data");

  const polsekData = await Promise.all([
    prisma.polsek.create({ data: { name: "Polsek Magelang Kota" } }),
    prisma.polsek.create({ data: { name: "Polsek Magelang Utara" } }),
    prisma.polsek.create({ data: { name: "Polsek Magelang Selatan" } }),
    prisma.polsek.create({ data: { name: "Polsek Borobudur" } }),
    prisma.polsek.create({ data: { name: "Polsek Mertoyudan" } }),
  ]);

  console.log("✅ Created Polsek data");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin System",
      email: "admin@polda.jateng.go.id",
      role: "ADMIN",
      password: hashedPassword,
    },
  });

  const humasUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: "Humas Polda Jateng",
        email: "humas@polda.jateng.go.id",
        role: "HUMAS",
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        name: "Humas Bidang Publikasi",
        email: "publikasi@polda.jateng.go.id",
        role: "HUMAS",
        password: hashedPassword,
      },
    }),
  ]);

  const polsekUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: "Kanit Reskrim Magelang Kota",
        email: "reskrim.magkot@polda.jateng.go.id",
        role: "POLSEK",
        password: hashedPassword,
        polsekId: polsekData[0].id,
      },
    }),
    prisma.user.create({
      data: {
        name: "Kanit Sabhara Magelang Kota",
        email: "sabhara.magkot@polda.jateng.go.id",
        role: "POLSEK",
        password: hashedPassword,
        polsekId: polsekData[0].id,
      },
    }),
    prisma.user.create({
      data: {
        name: "Kanit Reskrim Magelang Utara",
        email: "reskrim.magut@polda.jateng.go.id",
        role: "POLSEK",
        password: hashedPassword,
        polsekId: polsekData[1].id,
      },
    }),
    prisma.user.create({
      data: {
        name: "Kanit Lantas Borobudur",
        email: "lantas.borobudur@polda.jateng.go.id",
        role: "POLSEK",
        password: hashedPassword,
        polsekId: polsekData[3].id,
      },
    }),
    prisma.user.create({
      data: {
        name: "Kanit Intel Mertoyudan",
        email: "intel.mertoyudan@polda.jateng.go.id",
        role: "POLSEK",
        password: hashedPassword,
        polsekId: polsekData[4].id,
      },
    }),
  ]);

  console.log("✅ Created Users data");

  const reports = [];

  const report1 = await prisma.report.create({
    data: {
      title: "Penangkapan Pelaku Pencurian Sepeda Motor",
      description:
        "Tim Reskrim Polsek Magelang Kota berhasil menangkap pelaku...",
      date: new Date("2024-05-15T10:30:00Z"),
      authorId: polsekUsers[0].id,
      images: {
        create: [
          {
            url: "https://example.com/images/report1_evidence1.jpg",
            filename: "evidence1.jpg",
            alt: "Tersangka",
          },
          {
            url: "https://example.com/images/report1_evidence2.jpg",
            filename: "evidence2.jpg",
            alt: "Barang bukti",
          },
          {
            url: "https://example.com/images/report1_evidence3.jpg",
            filename: "evidence3.jpg",
            alt: "CCTV",
          },
        ],
      },
    },
  });
  reports.push(report1);

  const report2 = await prisma.report.create({
    data: {
      title: "Kecelakaan Lalu Lintas di Jalan Raya Borobudur",
      description:
        "Terjadi kecelakaan lalu lintas antara mobil dan sepeda motor...",
      date: new Date("2024-05-20T14:45:00Z"),
      authorId: polsekUsers[3].id,
      images: {
        create: [
          {
            url: "https://example.com/images/report2_accident1.jpg",
            filename: "accident1.jpg",
            alt: "Kendaraan",
          },
          {
            url: "https://example.com/images/report2_accident2.jpg",
            filename: "accident2.jpg",
            alt: "Olah TKP",
          },
        ],
      },
    },
  });
  reports.push(report2);

  const report3 = await prisma.report.create({
    data: {
      title: "Operasi Razia Narkoba di Wilayah Mertoyudan",
      description: "Satuan Intel Polsek Mertoyudan melakukan razia narkoba...",
      date: new Date("2024-05-25T20:00:00Z"),
      authorId: polsekUsers[4].id,
      images: {
        create: [
          {
            url: "https://example.com/images/report3_drugs1.jpg",
            filename: "drugs1.jpg",
            alt: "Barang bukti",
          },
          {
            url: "https://example.com/images/report3_drugs2.jpg",
            filename: "drugs2.jpg",
            alt: "Tersangka",
          },
          {
            url: "https://example.com/images/report3_drugs3.jpg",
            filename: "drugs3.jpg",
            alt: "Penggerebekan",
          },
        ],
      },
    },
  });
  reports.push(report3);

  console.log("✅ Created Reports with images");

  await prisma.narrative.create({
    data: {
      title: "Polsek Magelang Kota Bongkar Sindikat Pencurian Motor",
      content:
        "Tim Reskrim Polsek Magelang Kota kembali menunjukkan dedikasi...",
      status: "PUBLISHED",
      publishedAt: new Date("2024-05-16T08:00:00Z"),
      reportId: report1.id,
      authorId: humasUsers[0].id,
      images: {
        create: [
          {
            url: "https://example.com/images/narrative1_hero.jpg",
            filename: "hero.jpg",
            alt: "Press conference",
            caption: "Kapolsek memberikan keterangan",
            order: 1,
          },
          {
            url: "https://example.com/images/narrative1_evidence.jpg",
            filename: "evidence.jpg",
            alt: "Barang bukti",
            caption: "Sepeda motor curian",
            order: 2,
          },
        ],
      },
    },
  });

  await prisma.narrative.create({
    data: {
      title: "Polsek Borobudur Tangani Kecelakaan",
      content: "Unit Lalu Lintas Polsek Borobudur menunjukkan respon cepat...",
      status: "PUBLISHED",
      publishedAt: new Date("2024-05-21T09:00:00Z"),
      reportId: report2.id,
      authorId: humasUsers[1].id,
      images: {
        create: [
          {
            url: "https://example.com/images/narrative2_scene.jpg",
            filename: "scene.jpg",
            alt: "TKP",
            caption: "Lokasi kecelakaan",
            order: 1,
          },
          {
            url: "https://example.com/images/narrative2_officer.jpg",
            filename: "officer.jpg",
            alt: "Petugas",
            caption: "Petugas mengatur lalu lintas",
            order: 2,
          },
        ],
      },
    },
  });

  await prisma.narrative.create({
    data: {
      title: "Operasi Antik Polsek Mertoyudan Berhasil Sita Narkoba",
      content: "Draft artikel mengenai razia narkoba...",
      status: "DRAFT",
      reportId: report3.id,
      authorId: humasUsers[0].id,
      images: {
        create: [
          {
            url: "https://example.com/images/narrative3_operation.jpg",
            filename: "operation.jpg",
            alt: "Razia",
            caption: "Tim operasi narkoba",
            order: 1,
          },
        ],
      },
    },
  });

  console.log("✅ Created Narratives with images");

  console.log("\n🎉 Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`- Polsek: ${polsekData.length} records`);
  console.log(`- Users: ${1 + humasUsers.length + polsekUsers.length} records`);
  console.log(`- Reports: ${reports.length} records`);
  console.log(`- Narratives: 3 records`);
  console.log("\n👤 Login credentials (password: password123):");
  console.log("- Admin: admin@polda.jateng.go.id");
  console.log("- HUMAS: humas@polda.jateng.go.id");
  console.log("- POLSEK: reskrim.magkot@polda.jateng.go.id");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
