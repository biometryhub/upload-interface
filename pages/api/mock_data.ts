import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getRandomString, prisma } from "../../src/api/utils";

type ResponseData = {};

const mockData = {
  region: {
    name: "SA",
  } as Prisma.RegionCreateInput,
  site: {
    name: getRandomString(),
  } as Prisma.SiteUncheckedCreateInput,
  plotGroup: {
    name: "G1",
  } as Prisma.PlotGroupUncheckedCreateInput,
  treatmentGroup: {
    name: "W",
    year: 2019,
  } as Prisma.TreatmentGroupUncheckedCreateInput,
  plot: {
    id: getRandomString(),
  } as Prisma.PlotUncheckedCreateInput,
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const region = await prisma.region.create({ data: mockData.region });
  const site = await prisma.site.create({
    data: { ...mockData.site, regionId: region.id },
  });
  const plotGroup = await prisma.plotGroup.create({
    data: { ...mockData.plotGroup, siteId: site.id },
  });
  const plot = await prisma.plot.create({
    data: { ...mockData.plot, plotGroupId: plotGroup.id },
  });
  const treatmentGroup = await prisma.treatmentGroup.create({
    data: { ...mockData.treatmentGroup, siteId: site.id },
  });
  const plotTreatmentGroup = await prisma.plotTreatmentGroup.create({
    data: {
      plotId: plot.id,
      treatmentGroupId: treatmentGroup.id,
    },
  });

  return res.status(200).json({
    message: `Success`,
  });
};
export default handler;
