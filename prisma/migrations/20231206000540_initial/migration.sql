-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('USER', 'RESEARCHER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('RAINFALL', 'HAIL');

-- CreateEnum
CREATE TYPE "Fertiliser" AS ENUM ('FERT1', 'FERT2');

-- CreateEnum
CREATE TYPE "CropStage" AS ENUM ('STAGE1', 'STAGE2');

-- CreateEnum
CREATE TYPE "Herbicide" AS ENUM ('HERB1', 'HERB2');

-- CreateEnum
CREATE TYPE "Reason" AS ENUM ('REASON1', 'REASON2');

-- CreateEnum
CREATE TYPE "Crop" AS ENUM ('CROP1', 'CROP2');

-- CreateEnum
CREATE TYPE "Weeds" AS ENUM ('WEED1', 'WEED2');

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "regionId" INTEGER NOT NULL,
    "consultantId" INTEGER NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultancies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "primaryUser" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consultantId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" INTEGER NOT NULL,

    CONSTRAINT "plots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subplots" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plotId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "subplots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" INTEGER NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "regionId" INTEGER NOT NULL,
    "siteId" INTEGER NOT NULL,
    "plotId" INTEGER NOT NULL,
    "subplotId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "rainfall" DOUBLE PRECISION,
    "windspeed" DOUBLE PRECISION,
    "pests" BOOLEAN,
    "temp_greater_than_30_degrees" BOOLEAN,
    "herbicide_spray_drift" BOOLEAN,
    "other_event" TEXT,
    "crops_lost_percent" DOUBLE PRECISION,
    "crop_damage_estimated_percent" DOUBLE PRECISION,
    "comments" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" INTEGER NOT NULL,
    "subplotId" INTEGER NOT NULL,
    "crop_stage" "CropStage" NOT NULL,
    "action_reason" "Reason",
    "fertiliser_name" "Fertiliser",
    "fertiliser_rate" DOUBLE PRECISION,
    "herbicide_name" "Herbicide",
    "herbicide_rate" DOUBLE PRECISION,
    "target_weeds" "Weeds"[],
    "crop_planted" "Crop",
    "density" DOUBLE PRECISION,
    "harvest_crop" "Crop",
    "yield" DOUBLE PRECISION,
    "area_cut" DOUBLE PRECISION,
    "biomass" DOUBLE PRECISION,
    "action_comments" TEXT,
    "general_comments" TEXT,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sites_regionId_key" ON "sites"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "sites_consultantId_key" ON "sites"("consultantId");

-- CreateIndex
CREATE UNIQUE INDEX "users_consultantId_key" ON "users"("consultantId");

-- CreateIndex
CREATE UNIQUE INDEX "plots_siteId_key" ON "plots"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "subplots_plotId_key" ON "subplots"("plotId");

-- CreateIndex
CREATE UNIQUE INDEX "subplots_groupId_key" ON "subplots"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "groups_siteId_key" ON "groups"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "events_regionId_key" ON "events"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "events_siteId_key" ON "events"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "events_plotId_key" ON "events"("plotId");

-- CreateIndex
CREATE UNIQUE INDEX "events_subplotId_key" ON "events"("subplotId");

-- CreateIndex
CREATE UNIQUE INDEX "Action_groupId_key" ON "Action"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Action_subplotId_key" ON "Action"("subplotId");

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "consultancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "consultancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plots" ADD CONSTRAINT "plots_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subplots" ADD CONSTRAINT "subplots_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "plots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subplots" ADD CONSTRAINT "subplots_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "plots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_subplotId_fkey" FOREIGN KEY ("subplotId") REFERENCES "subplots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_subplotId_fkey" FOREIGN KEY ("subplotId") REFERENCES "subplots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
