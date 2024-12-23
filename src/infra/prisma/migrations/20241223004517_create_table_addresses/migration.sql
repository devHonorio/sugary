-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "surname" TEXT,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "complement" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
