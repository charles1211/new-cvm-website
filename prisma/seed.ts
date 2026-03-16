import { PrismaClient, ProductCategory, ProductBadge } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Products ────────────────────────────────────────────────
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: "Pension Loan",
        subtitle: "For Government Pensioners",
        category: ProductCategory.Pension,
        badge: ProductBadge.FEATURED,
        num: "01",
        isEnabled: true,
        description1: "₱2,000,000",
        description2: "3–60 months",
        description3: "1.0–2.5% per month",
        imagePath: "/icons/pension.png",
        accentHex: "#FDDC00",
        extendedProperties: {
          "Who are Qualified": [
            "Government pensioners (GSIS/SSS)",
            "60 years old & above",
            "Must have an active pension",
          ],
          Requirements: [
            "Valid government-issued ID",
            "Latest pension voucher or ATM",
            "Proof of billing address",
            "1 x 1 and 2 x 2 ID photos",
            "Accomplished loan application form",
          ],
          "Loan Details": [
            "Loan amount based on net monthly pension",
            "Flexible payment terms up to 60 months",
            "Fast release within 1–2 banking days",
            "No collateral required",
          ],
        },
      },
      {
        id: 2,
        name: "Private Teacher's Loan",
        subtitle: "For Licensed Educators",
        category: ProductCategory.Employment,
        badge: ProductBadge.NEW,
        num: "02",
        isEnabled: true,
        description1: "₱500,000",
        description2: "6–36 months",
        description3: "1.5–2.5% per month",
        imagePath: "/icons/teacher.png",
        accentHex: "#3b82f6",
        extendedProperties: {
          "Who are Qualified": [
            "Licensed private school teachers",
            "At least 1 year of employment",
            "Regular / permanent employee status",
          ],
          Requirements: [
            "Valid government-issued ID",
            "Certificate of employment",
            "Latest 3 months payslip",
            "School ID",
            "Accomplished loan application form",
          ],
        },
      },
      {
        id: 3,
        name: "Sangla ORCR",
        subtitle: "Vehicle Document Collateral",
        category: ProductCategory.Collateral,
        badge: ProductBadge.NEW,
        num: "03",
        isEnabled: true,
        description1: "₱500,000",
        description2: "6–24 months",
        description3: "2.0–2.5% per month",
        imagePath: "/icons/orcr.png",
        accentHex: "#10b981",
        extendedProperties: {
          "Who are Qualified": [
            "Vehicle owners with clean OR/CR",
            "Must be a Filipino citizen",
            "Vehicle must be free from any lien",
          ],
          Requirements: [
            "Original OR/CR of the vehicle",
            "Valid government-issued ID",
            "Proof of income or employment",
            "Vehicle photos (front, back, sides)",
            "Accomplished loan application form",
          ],
        },
      },
      {
        id: 4,
        name: "Sangla Titulo",
        subtitle: "Real Estate Collateral",
        category: ProductCategory.Collateral,
        badge: ProductBadge.NEW,
        num: "04",
        isEnabled: true,
        description1: "₱2,000,000",
        description2: "12–60 months",
        description3: "1.5–2.5% per month",
        imagePath: "/icons/titulo.png",
        accentHex: "#a855f7",
        extendedProperties: {
          "Who are Qualified": [
            "Real property owners with clean title",
            "Must be a Filipino citizen",
            "Property must be free from encumbrance",
          ],
          Requirements: [
            "Original Transfer Certificate of Title (TCT)",
            "Tax Declaration and Real Property Tax receipts",
            "Valid government-issued ID",
            "Proof of income",
            "Accomplished loan application form",
          ],
        },
      },
    ],
  });

  console.log("✅ Products seeded (4 records)");

  // ─── Information (company details) ───────────────────────────
  await prisma.information.deleteMany();

  await prisma.information.createMany({
    data: [
      { type: "contact", name: "Head Office Phone", value: "(049) 501-0900" },
      { type: "contact", name: "Head Office Mobile", value: "0917-123-4567" },
      { type: "contact", name: "Head Office Email", value: "info@cvmfinance.com" },
      { type: "contact", name: "Head Office Address", value: "123 CVM Building, Sta. Cruz, Laguna 4009" },
      { type: "social", name: "Facebook", url: "https://www.facebook.com/CVMFinance" },
      { type: "social", name: "YouTube", url: "https://www.youtube.com/@CVMFinance" },
      { type: "company", name: "Founded", value: "1994" },
      { type: "company", name: "Branches", value: "56+" },
      { type: "company", name: "Clients", value: "30,000+" },
      { type: "company", name: "Employees", value: "288+" },
      { type: "company", name: "SEC Registration", value: "Registered" },
      { type: "company", name: "BSP Supervision", value: "Supervised" },
      { type: "company", name: "ISO Certification", value: "ISO 9001:2015" },
    ],
  });

  console.log("✅ Information seeded (13 records)");

  // ─── Admin user ───────────────────────────────────────────────
  // NOTE: Replace this with a hashed password in production
  // e.g., use bcrypt: await bcrypt.hash("your-password", 10)
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "CHANGE_ME_USE_HASHED_PASSWORD",
    },
  });

  console.log("✅ Admin user seeded");
  console.log("⚠️  IMPORTANT: Update admin password hash before going to production!");
  console.log("\n🎉 Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
