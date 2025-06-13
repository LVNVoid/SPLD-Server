const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const POLSEK_DATA = [
  { name: "Polsek Magelang Kota" },
  { name: "Polsek Magelang Utara" },
  { name: "Polsek Magelang Selatan" },
  { name: "Polsek Borobudur" },
  { name: "Polsek Mertoyudan" },
  { name: "Polsek Muntilan" },
  { name: "Polsek Tempuran" },
  { name: "Polsek Kajoran" },
];

const USER_DATA = {
  admin: {
    name: "Dr. Bambang Suryanto, S.H., M.H.",
    email: "admin@polda.jateng.go.id",
    role: "ADMIN",
  },
  humas: [
    {
      name: "AKBP Drs. Slamet Riyadi, M.Si.",
      email: "humas@polda.jateng.go.id",
      role: "HUMAS",
    },
    {
      name: "Kompol Sri Wahyuni, S.Sos., M.I.K.",
      email: "publikasi@polda.jateng.go.id",
      role: "HUMAS",
    },
    {
      name: "AKP Muhammad Fajar, S.I.K.",
      email: "media@polda.jateng.go.id",
      role: "HUMAS",
    },
  ],
  polsek: [
    {
      name: "IPDA Agus Setiawan, S.H.",
      email: "reskrim.magkot@polda.jateng.go.id",
      role: "POLSEK",
      polsekIndex: 0,
    },
    {
      name: "IPTU Suryadi Pratomo, S.I.K.",
      email: "sabhara.magkot@polda.jateng.go.id",
      role: "POLSEK",
      polsekIndex: 0,
    },
    {
      name: "IPDA Eko Prasetyo, S.H.",
      email: "reskrim.magut@polda.jateng.go.id",
      role: "POLSEK",
      polsekIndex: 1,
    },
    {
      name: "IPTU Dwi Hartono, S.I.K.",
      email: "lantas.borobudur@polda.jateng.go.id",
      role: "POLSEK",
      polsekIndex: 3,
    },
    {
      name: "IPDA Tri Budiman, S.I.K.",
      email: "intel.mertoyudan@polda.jateng.go.id",
      role: "POLSEK",
      polsekIndex: 4,
    },
    {
      name: "IPTU Wahyu Nugroho, S.H.",
      email: "reskrim.muntilan@polda.jateng.go.id",
      role: "POLSEK",
      polsekIndex: 5,
    },
    {
      name: "IPDA Budi Santoso, S.I.K.",
      email: "sabhara.tempuran@polda.jateng.go.id",
      role: "POLSEK",
      polsekIndex: 6,
    },
  ],
};

const REPORT_TEMPLATES = [
  {
    title: "Penangkapan Pelaku Pencurian Sepeda Motor dengan Kekerasan",
    description: `Tim Reskrim Polsek Magelang Kota berhasil menangkap tersangka pencurian sepeda motor dengan kekerasan yang telah meresahkan masyarakat selama 2 bulan terakhir. Tersangka dengan inisial AS (28) ditangkap di rumahnya di Jalan Veteran pada Selasa (15/05/2024) pukul 10.30 WIB.

Penangkapan dilakukan setelah tim melakukan penyelidikan intensif berdasarkan laporan korban dan analisis rekaman CCTV dari berbagai lokasi kejadian. Dari pengakuan tersangka, telah dilakukan 7 kali aksi pencurian motor di wilayah Magelang Kota dan sekitarnya.

Barang bukti yang diamankan antara lain: 2 unit sepeda motor Honda Beat dan Yamaha Mio, seperangkat alat pembuka kunci motor, dan uang tunai hasil penjualan motor curian sebesar Rp 15.000.000.`,
    date: new Date("2024-05-15T10:30:00Z"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800",
        filename: "tersangka_pencurian.jpg",
        alt: "Tersangka pencurian sepeda motor",
      },
      {
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
        filename: "barang_bukti_motor.jpg",
        alt: "Sepeda motor hasil pencurian",
      },
      {
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
        filename: "rekaman_cctv.jpg",
        alt: "Analisis rekaman CCTV",
      },
    ],
  },
  {
    title: "Kecelakaan Lalu Lintas Beruntun di Jalan Raya Borobudur KM 8",
    description: `Kecelakaan lalu lintas beruntun melibatkan 4 kendaraan terjadi di Jalan Raya Borobudur KM 8, Kecamatan Borobudur pada Minggu (20/05/2024) pukul 14.45 WIB. Kecelakaan bermula dari tabrakan antara truk pengangkut pasir dengan sepeda motor yang melaju dari arah berlawanan.

Dampak kecelakaan menyebabkan 3 orang luka ringan dan 1 orang luka berat yang langsung dirujuk ke RSUD Magelang. Jalur Borobudur-Yogyakarta sempat macet total selama 2 jam hingga proses evakuasi selesai.

Tim Unit Lalu Lintas Polsek Borobudur bersama Dinas Perhubungan melakukan olah TKP dan mengatur rekayasa lalu lintas. Kerugian material diperkirakan mencapai Rp 85.000.000 dari kerusakan 4 kendaraan yang terlibat.`,
    date: new Date("2024-05-20T14:45:00Z"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
        filename: "kecelakaan_beruntun.jpg",
        alt: "Lokasi kecelakaan beruntun",
      },
      {
        url: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800",
        filename: "evakuasi_korban.jpg",
        alt: "Proses evakuasi korban kecelakaan",
      },
      {
        url: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800",
        filename: "pengaturan_lalin.jpg",
        alt: "Petugas mengatur lalu lintas",
      },
    ],
  },
  {
    title: "Operasi Gabungan Anti Narkoba 'Candi Bersih' di Wilayah Mertoyudan",
    description: `Satuan Intel Polsek Mertoyudan bersama BNN Kabupaten Magelang melaksanakan Operasi Gabungan Anti Narkoba dengan sandi "Candi Bersih" di 5 lokasi berbeda di wilayah Mertoyudan pada Sabtu (25/05/2024) pukul 20.00-03.00 WIB.

Operasi ini berhasil mengamankan 4 tersangka dengan barang bukti 250 gram sabu-sabu, 150 butir pil ekstasi, dan 500 gram ganja kering. Total nilai barang bukti diperkirakan Rp 150.000.000 di pasaran gelap.

Keempat tersangka yang diamankan berinisial RD (35), ST (28), MN (42), dan DF (19). Mereka merupakan bagian dari jaringan pengedar narkoba yang beroperasi di wilayah Kabupaten Magelang dan sekitarnya. Kasus ini akan dilanjutkan ke tahap penyidikan untuk mengungkap jaringan yang lebih besar.`,
    date: new Date("2024-05-25T20:00:00Z"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800",
        filename: "operasi_narkoba.jpg",
        alt: "Tim operasi anti narkoba",
      },
      {
        url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
        filename: "barang_bukti_narkoba.jpg",
        alt: "Barang bukti narkoba yang diamankan",
      },
      {
        url: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800",
        filename: "tersangka_narkoba.jpg",
        alt: "Tersangka pengedar narkoba",
      },
    ],
  },
  {
    title: "Penyelesaian Kasus Penipuan Online Modus Investasi Bodong",
    description: `Polsek Muntilan berhasil membongkar modus penipuan online berkedok investasi cryptocurrency yang merugikan 23 korban dengan total kerugian Rp 2,3 miliar. Tersangka berinisial AP (32) dan RK (29) ditangkap di kediamannya di Perumahan Griya Muntilan pada Rabu (28/05/2024).

Modus yang digunakan adalah menawarkan investasi cryptocurrency dengan return tinggi melalui aplikasi palsu dan grup WhatsApp. Para korban diminta mentransfer uang dengan iming-iming keuntungan 20% per bulan.

Tim Cyber Crime Polres Magelang yang membantu penyelidikan berhasil melacak alur dana melalui 15 rekening bank berbeda. Selain kedua tersangka utama, penyidik masih memburu 3 orang lainnya yang diduga terlibat dalam sindikat ini.`,
    date: new Date("2024-05-28T09:15:00Z"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        filename: "penipuan_online.jpg",
        alt: "Ilustrasi penipuan online",
      },
      {
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
        filename: "aplikasi_palsu.jpg",
        alt: "Aplikasi investasi bodong",
      },
    ],
  },
  {
    title: "Pengamanan Acara Festival Borobudur 2024",
    description: `Polsek Borobudur mengerahkan 150 personel untuk mengamankan Festival Borobudur 2024 yang berlangsung selama 3 hari (30 Mei - 1 Juni 2024). Festival yang dihadiri lebih dari 50.000 pengunjung ini berjalan lancar tanpa gangguan keamanan berarti.

Pengamanan dilakukan secara berlapis mulai dari pos pemeriksaan, patrol keliling, hingga tim siaga di titik-titik strategis. Koordinasi juga dilakukan dengan TNI, Dishub, PMI, dan BPBD untuk memastikan keamanan dan kenyamanan pengunjung.

Selama festival, tercatat hanya 12 kasus kecil berupa kehilangan barang dan 3 kasus kesehatan ringan yang langsung ditangani tim medis. Lalulintas di sekitar Candi Borobudur juga dapat diatur dengan baik meski volume kendaraan meningkat drastis.`,
    date: new Date("2024-06-01T16:00:00Z"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800",
        filename: "festival_borobudur.jpg",
        alt: "Festival Borobudur 2024",
      },
      {
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
        filename: "pengamanan_festival.jpg",
        alt: "Petugas mengamankan festival",
      },
    ],
  },
];

const NARRATIVE_TEMPLATES = [
  {
    title:
      "Polsek Magelang Kota Bongkar Sindikat Pencurian Motor, Amankan Tersangka dan Barang Bukti Senilai Puluhan Juta",
    content: `MAGELANG - Tim Reskrim Polsek Magelang Kota kembali menunjukkan dedikasi tinggi dalam memberantas tindak kriminal di wilayahnya. Pada operasi yang dilakukan Selasa (15/5/2024), berhasil diungkap sindikat pencurian sepeda motor yang telah meresahkan masyarakat selama dua bulan terakhir.

Kapolsek Magelang Kota, AKBP Drs. Ahmad Fauzi, M.Si., dalam konferensi pers menyampaikan bahwa penangkapan tersangka AS (28) merupakan hasil kerja keras tim yang telah melakukan penyelidikan intensif sejak laporan pertama diterima.

"Kami berkomitmen penuh untuk memberantas segala bentuk kejahatan jalanan, khususnya pencurian kendaraan bermotor yang sangat meresahkan masyarakat," ujar Kapolsek.

Tersangka yang berhasil diamankan mengaku telah melakukan aksi pencurian sebanyak 7 kali di berbagai lokasi strategis, terutama di area parkir mall, rumah sakit, dan tempat ibadah. Modus yang digunakan adalah menggunakan kunci T dan obeng untuk membobol kunci kontak motor.

Dari hasil pengembangan, tim berhasil mengamankan barang bukti berupa 2 unit sepeda motor Honda Beat dan Yamaha Mio, seperangkat alat pembuka kunci motor, serta uang tunai hasil penjualan motor curian sebesar Rp 15 juta.

Kapolsek menambahkan bahwa pihaknya terus melakukan koordinasi dengan berbagai pihak, termasuk pengelola parkir dan masyarakat untuk mencegah tindak kejahatan serupa. "Kami mengimbau masyarakat untuk selalu waspada dan segera melaporkan jika melihat aktivitas mencurigakan," pungkasnya.

Tersangka saat ini ditahan di tahanan Polsek Magelang Kota dan dijerat dengan Pasal 363 KUHP tentang pencurian dengan ancaman hukuman maksimal 7 tahun penjara.`,
    status: "PUBLISHED",
    publishedAt: new Date("2024-05-16T08:00:00Z"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        filename: "konpers_kapolsek.jpg",
        alt: "Konferensi pers Kapolsek",
        caption: "Kapolsek Magelang Kota memberikan keterangan pers",
        order: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
        filename: "motor_curian.jpg",
        alt: "Sepeda motor hasil pencurian",
        caption: "Sepeda motor yang berhasil diamankan dari tersangka",
        order: 2,
      },
    ],
  },
  {
    title:
      "Respon Cepat Polsek Borobudur Tangani Kecelakaan Beruntun, 4 Kendaraan Terlibat",
    content: `BOROBUDUR - Unit Lalu Lintas Polsek Borobudur menunjukkan respons cepat dan profesional dalam menangani kecelakaan lalu lintas beruntun yang terjadi di Jalan Raya Borobudur KM 8, Minggu (20/5/2024) siang.

Kecelakaan yang melibatkan 4 kendaraan ini terjadi sekitar pukul 14.45 WIB, bermula dari tabrakan antara truk pengangkut pasir dengan sepeda motor yang kemudian menyeret kendaraan lain dalam insiden beruntun.

Kanit Lantas Polsek Borobudur, IPTU Dwi Hartono, S.I.K., langsung memimpin tim penanganan darurat yang terdiri dari 12 personel. "Begitu menerima laporan, tim langsung bergerak ke lokasi untuk melakukan pertolongan pertama dan mengatur lalu lintas," jelasnya.

Berkat koordinasi yang baik dengan RSUD Magelang dan tim medis PMI, keempat korban luka dapat segera mendapat penanganan medis. Tiga korban dengan luka ringan dirawat jalan, sementara satu korban dengan luka berat langsung dirujuk untuk perawatan intensif.

Proses evakuasi dan olah TKP diselesaikan dalam waktu 2 jam dengan melibatkan derek khusus dan tim forensik lalu lintas. Selama proses tersebut, diberlakukan sistem buka tutup jalur untuk meminimalkan kemacetan.

"Kami juga berkoordinasi dengan Dinas Perhubungan untuk melakukan rekayasa lalu lintas dan menyediakan jalur alternatif bagi pengguna jalan," tambah Kanit Lantas.

Penyebab kecelakaan masih dalam tahap penyelidikan, namun dugaan awal adalah faktor kelelahan pengemudi dan kondisi jalan yang licin pasca hujan. Kerugian material diperkirakan mencapai Rp 85 juta.

Polsek Borobudur mengimbau para pengemudi untuk selalu mematuhi rambu lalu lintas, menjaga kecepatan, dan tidak mengemudi dalam kondisi lelah, terutama saat melintas di jalur wisata yang ramai seperti kawasan Borobudur.`,
    status: "PUBLISHED",
    publishedAt: new Date("2024-05-21T09:00:00Z"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
        filename: "tkp_kecelakaan.jpg",
        alt: "Tempat kejadian perkara kecelakaan",
        caption: "Lokasi kecelakaan beruntun di Jalan Raya Borobudur",
        order: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800",
        filename: "petugas_lalin.jpg",
        alt: "Petugas lalu lintas",
        caption: "Petugas mengatur lalu lintas pasca kecelakaan",
        order: 2,
      },
    ],
  },
];

// Utility functions
const getRandomDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Seeding functions
async function clearDatabase() {
  console.log("🧹 Cleaning existing data...");

  const deleteOperations = [
    prisma.narrativeImage.deleteMany(),
    prisma.narrative.deleteMany(),
    prisma.reportImage.deleteMany(),
    prisma.report.deleteMany(),
    prisma.user.deleteMany(),
    prisma.polsek.deleteMany(),
  ];

  await Promise.all(deleteOperations);
  console.log("✅ Database cleaned successfully");
}

async function seedPolsek() {
  console.log("🏢 Creating Polsek data...");

  const polsekData = await Promise.all(
    POLSEK_DATA.map((polsek) => prisma.polsek.create({ data: polsek }))
  );

  console.log(`✅ Created ${polsekData.length} Polsek records`);
  return polsekData;
}

async function seedUsers(polsekData) {
  console.log("👥 Creating Users data...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      ...USER_DATA.admin,
      password: hashedPassword,
    },
  });

  // Create HUMAS users
  const humasUsers = await Promise.all(
    USER_DATA.humas.map((user) =>
      prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      })
    )
  );

  // Create POLSEK users
  const polsekUsers = await Promise.all(
    USER_DATA.polsek.map((user) =>
      prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          password: hashedPassword,
          polsekId: polsekData[user.polsekIndex].id,
        },
      })
    )
  );

  console.log(
    `✅ Created ${1 + humasUsers.length + polsekUsers.length} User records`
  );
  return { adminUser, humasUsers, polsekUsers };
}

async function seedReports(polsekUsers) {
  console.log("📄 Creating Reports data...");

  const reports = [];
  const shuffledTemplates = shuffleArray(REPORT_TEMPLATES);

  for (let i = 0; i < shuffledTemplates.length; i++) {
    const template = shuffledTemplates[i];
    const randomUser =
      polsekUsers[Math.floor(Math.random() * polsekUsers.length)];

    const report = await prisma.report.create({
      data: {
        title: template.title,
        description: template.description,
        date: getRandomDate("2024-05-01", "2024-06-10"),
        authorId: randomUser.id,
        images: {
          create: template.images,
        },
      },
    });

    reports.push(report);
  }

  console.log(`✅ Created ${reports.length} Report records with images`);
  return reports;
}

async function seedNarratives(reports, humasUsers) {
  console.log("📰 Creating Narratives data...");

  const narratives = [];

  // Create published narratives
  for (let i = 0; i < NARRATIVE_TEMPLATES.length; i++) {
    const template = NARRATIVE_TEMPLATES[i];
    const randomHumas =
      humasUsers[Math.floor(Math.random() * humasUsers.length)];

    const narrative = await prisma.narrative.create({
      data: {
        title: template.title,
        content: template.content,
        status: template.status,
        publishedAt: template.publishedAt,
        reportId: reports[i].id,
        authorId: randomHumas.id,
        images: {
          create: template.images,
        },
      },
    });

    narratives.push(narrative);
  }

  // Create additional draft narratives
  const additionalDrafts = [
    {
      title:
        "Operasi Antik Polsek Mertoyudan Berhasil Sita Narkoba Senilai Ratusan Juta",
      content: `Draft artikel mengenai operasi gabungan anti narkoba "Candi Bersih" yang berhasil mengamankan 4 tersangka dan barang bukti narkoba dengan nilai street value mencapai Rp 150 juta. Operasi ini merupakan bagian dari upaya pemberantasan peredaran narkoba di wilayah Kabupaten Magelang...

[DRAFT - Sedang dalam proses review dan verifikasi data]`,
      status: "DRAFT",
    },
    {
      title:
        "Polsek Muntilan Bongkar Sindikat Penipuan Online Berkedok Investasi",
      content: `Artikel mengenai pembongkaran kasus penipuan online modus investasi cryptocurrency yang merugikan puluhan korban. Tim Cyber Crime berhasil melacak alur dana dan mengamankan tersangka...

[DRAFT - Menunggu konfirmasi dari penyidik]`,
      status: "DRAFT",
    },
  ];

  for (let i = 0; i < additionalDrafts.length; i++) {
    const draft = additionalDrafts[i];
    const randomHumas =
      humasUsers[Math.floor(Math.random() * humasUsers.length)];
    const reportIndex = NARRATIVE_TEMPLATES.length + i;

    if (reports[reportIndex]) {
      const narrative = await prisma.narrative.create({
        data: {
          title: draft.title,
          content: draft.content,
          status: draft.status,
          reportId: reports[reportIndex].id,
          authorId: randomHumas.id,
          images: {
            create: [
              {
                url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
                filename: `draft_${i + 1}.jpg`,
                alt: "Draft image",
                caption: "Gambar draft artikel",
                order: 1,
              },
            ],
          },
        },
      });

      narratives.push(narrative);
    }
  }

  console.log(`✅ Created ${narratives.length} Narrative records with images`);
  return narratives;
}

async function printSummary(polsekData, users, reports, narratives) {
  console.log("\n🎉 Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`- Polsek: ${polsekData.length} records`);
  console.log(
    `- Users: ${
      users.adminUser
        ? 1
        : 0 + users.humasUsers.length + users.polsekUsers.length
    } records`
  );
  console.log(`  - Admin: 1 record`);
  console.log(`  - HUMAS: ${users.humasUsers.length} records`);
  console.log(`  - POLSEK: ${users.polsekUsers.length} records`);
  console.log(`- Reports: ${reports.length} records`);
  console.log(`- Narratives: ${narratives.length} records`);

  console.log("\n👤 Login credentials (password: password123):");
  console.log(`- Admin: ${USER_DATA.admin.email}`);
  console.log(`- HUMAS: ${USER_DATA.humas[0].email}`);
  console.log(`- POLSEK: ${USER_DATA.polsek[0].email}`);

  console.log("\n📱 Sample accounts for testing:");
  USER_DATA.humas.forEach((user) => console.log(`- HUMAS: ${user.email}`));
  USER_DATA.polsek
    .slice(0, 3)
    .forEach((user) => console.log(`- POLSEK: ${user.email}`));
}

// Main seeding function
async function main() {
  try {
    console.log("🌱 Starting enhanced database seeding...");

    await clearDatabase();

    const polsekData = await seedPolsek();
    const users = await seedUsers(polsekData);
    const reports = await seedReports(users.polsekUsers);
    const narratives = await seedNarratives(reports, users.humasUsers);

    await printSummary(polsekData, users, reports, narratives);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

// Execute seeder
main()
  .catch((e) => {
    console.error("❌ Fatal error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed");
  });
