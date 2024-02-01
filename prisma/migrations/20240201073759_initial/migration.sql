-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('USER', 'RESEARCHER');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('HERBICIDE', 'FUNGICIDE', 'MOLLUSCICIDE', 'FERTILISER', 'INSECTICIDE');

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
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "region_id" INTEGER NOT NULL,
    "consultant_id" INTEGER,

    CONSTRAINT "site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "primary_user" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "consultant_id" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plot_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "site_id" INTEGER NOT NULL,

    CONSTRAINT "plot_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plot" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "plot_group_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "plot_treatment_group" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "plot_id" TEXT NOT NULL,
    "treatment_group_id" INTEGER,

    CONSTRAINT "plot_treatment_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "site_id" INTEGER NOT NULL,

    CONSTRAINT "treatment_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "region_id" INTEGER NOT NULL,
    "site_id" INTEGER NOT NULL,
    "plot_group_id" INTEGER NOT NULL,
    "plot_id" TEXT NOT NULL,
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

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "treatment_group_id" INTEGER NOT NULL,
    "plot_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "fert_n" DOUBLE PRECISION NOT NULL,
    "fert_p" DOUBLE PRECISION NOT NULL,
    "fert_k" DOUBLE PRECISION NOT NULL,
    "fert_s" DOUBLE PRECISION NOT NULL,
    "weed_disease_active_ingred_1" TEXT NOT NULL,
    "weed_disease_active_ingred_2" TEXT NOT NULL,
    "weed_disease_active_ingred_3" TEXT NOT NULL,
    "weed_disease_active_ingred_4" TEXT NOT NULL,
    "weed_disease_active_ingred_5" TEXT NOT NULL,
    "weed_disease_active_ingred_1_percent_by_weight" DOUBLE PRECISION NOT NULL,
    "weed_disease_active_ingred_2_percent_by_weight" DOUBLE PRECISION NOT NULL,
    "weed_disease_active_ingred_3_percent_by_weight" DOUBLE PRECISION NOT NULL,
    "weed_disease_active_ingred_4_percent_by_weight" DOUBLE PRECISION NOT NULL,
    "weed_disease_active_ingred_5_percent_by_weight" DOUBLE PRECISION NOT NULL,
    "application_rate" DOUBLE PRECISION NOT NULL,
    "application_unit" TEXT NOT NULL,
    "harvest_machine" TEXT NOT NULL,
    "harvest_crop_1" TEXT NOT NULL,
    "harvest_crop_2" TEXT NOT NULL,
    "harvest_crop_3" TEXT NOT NULL,
    "harvest_crop_1_yield" DOUBLE PRECISION NOT NULL,
    "harvest_crop_2_yield" DOUBLE PRECISION NOT NULL,
    "harvest_crop_3_yield" DOUBLE PRECISION NOT NULL,
    "sowing_crop_1" TEXT NOT NULL,
    "sowing_crop_2" TEXT NOT NULL,
    "sowing_crop_3" TEXT NOT NULL,
    "sowing_crop_1_density" DOUBLE PRECISION NOT NULL,
    "sowing_crop_2_density" DOUBLE PRECISION NOT NULL,
    "sowing_crop_3_density" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_type" "ProductType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "site_region_id_idx" ON "site"("region_id");

-- CreateIndex
CREATE INDEX "site_consultant_id_idx" ON "site"("consultant_id");

-- CreateIndex
CREATE INDEX "consultant_name_idx" ON "consultant"("name");

-- CreateIndex
CREATE INDEX "user_consultant_id_idx" ON "user"("consultant_id");

-- CreateIndex
CREATE INDEX "user_first_name_idx" ON "user"("first_name");

-- CreateIndex
CREATE INDEX "user_role_idx" ON "user"("role");

-- CreateIndex
CREATE INDEX "plot_group_site_id_idx" ON "plot_group"("site_id");

-- CreateIndex
CREATE INDEX "plot_group_name_idx" ON "plot_group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "plot_id_key" ON "plot"("id");

-- CreateIndex
CREATE INDEX "plot_plot_group_id_idx" ON "plot"("plot_group_id");

-- CreateIndex
CREATE INDEX "plot_treatment_group_plot_id_idx" ON "plot_treatment_group"("plot_id");

-- CreateIndex
CREATE INDEX "plot_treatment_group_treatment_group_id_idx" ON "plot_treatment_group"("treatment_group_id");

-- CreateIndex
CREATE INDEX "treatment_group_site_id_idx" ON "treatment_group"("site_id");

-- CreateIndex
CREATE INDEX "treatment_group_year_idx" ON "treatment_group"("year");

-- CreateIndex
CREATE INDEX "treatment_group_name_idx" ON "treatment_group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- CreateIndex
CREATE INDEX "product_product_type_idx" ON "product"("product_type");

-- AddForeignKey
ALTER TABLE "site" ADD CONSTRAINT "site_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site" ADD CONSTRAINT "site_consultant_id_fkey" FOREIGN KEY ("consultant_id") REFERENCES "consultant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_consultant_id_fkey" FOREIGN KEY ("consultant_id") REFERENCES "consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_group" ADD CONSTRAINT "plot_group_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot" ADD CONSTRAINT "plot_plot_group_id_fkey" FOREIGN KEY ("plot_group_id") REFERENCES "plot_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_treatment_group" ADD CONSTRAINT "plot_treatment_group_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot_treatment_group" ADD CONSTRAINT "plot_treatment_group_treatment_group_id_fkey" FOREIGN KEY ("treatment_group_id") REFERENCES "treatment_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_group" ADD CONSTRAINT "treatment_group_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_plot_group_id_fkey" FOREIGN KEY ("plot_group_id") REFERENCES "plot_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_treatment_group_id_fkey" FOREIGN KEY ("treatment_group_id") REFERENCES "treatment_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
