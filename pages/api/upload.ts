import type { NextApiRequest, NextApiResponse } from "next";
// import { objectstorage } from "oci-sdk";
// import path from "path";
import { UploadFile } from "../../src/api/schema";

import { prisma } from "../../src/api/utils";
// import { provider } from "../../src/api/utils";
import { ExcelContent, Row } from "../../src/utils/excel";

type ResponseData = {};

// const handler = async (
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) => {
//   const { name, body } = <UploadFile>req.body;
//   const storageClient = new objectstorage.ObjectStorageClient({
//     authenticationDetailsProvider: provider,
//   });
//   const prefix = "2023_final_workshop/plant";
//   const listObjectsPayload: objectstorage.requests.PutObjectRequest = {
//     namespaceName: process.env.NEXT_PUBLIC_NAMESPACE,
//     bucketName: process.env.NEXT_PUBLIC_BUCKET,
//     objectName: path.join(prefix, name),
//     putObjectBody: Buffer.from(
//       body.replace(/^data:\w+\/[\w\.\-]+;base64,/, ""),
//       "base64"
//     ),
//   };
//   const storageRes = await storageClient.putObject(listObjectsPayload);
//
//   return res.status(200).json({
//     message: `The object ${name} was successfully created at ${storageRes.lastModified}`,
//   });
// };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { body } = <UploadFile>req.body;
  const data = JSON.parse(body) as ExcelContent;

  let region = await prisma.region.findFirst();
  if (region == null) {
    region = await prisma.region.create({ data: { name: "SA" } });
  }
  await insertPlot(data["PLOTS"], region.id);

  return res.status(200).json({
    message: "success",
  });
};
export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // change this to a limit of your file size
    },
  },
};

const insertPlot = async (plots: Row[], regionId: number) => {
  // TODO: handle treatment groups
  const siteIds = {} as { [key: string]: number };
  const plotGroupIds = {} as { [key: string]: number };

  plots.forEach(
    async ({
      SITE: siteName,
      PLOT_ID: plotId,
      PLOT_location: plotLocation,
      TREATMENT_GROUP_2023: treatmentGroup2023,
      TREATMENT_GROUP_2024: treatmentGroup2024,
      TREATMENT_GROUP_2025: treatmentGroup2025,
      TREATMENT_GROUP_2026: treatmentGroup2026,
    }) => {
      const siteId = await getSiteId(
        siteName as string,
        regionId,
        siteIds[siteName]
      );

      const plotGroupId = await getPlotGroupId(
        plotLocation as string,
        siteId,
        plotGroupIds[plotLocation]
      );

      let plot = await prisma.plot.findFirst({
        where: { id: plotId as string },
      });
      if (plot == null) {
        plot = await prisma.plot.create({
          data: { id: plotId as string, plotGroupId: plotGroupId },
        });
      }
    }
  );
};

const getSiteId = async (
  siteName: string,
  regionId: number,
  siteId?: number
) => {
  let site;
  if (siteId == undefined) {
    site = await prisma.site.findFirst({
      where: { name: siteName },
    });
  }
  if (site == null) {
    site = await prisma.site.create({
      data: { name: siteName, regionId: regionId },
    });
  }

  return siteId || site.id;
};
const getPlotGroupId = async (
  plotLocation: string,
  siteId: number,
  plotGroupId?: number
) => {
  let plotGroup;
  if (plotGroupId == undefined) {
    plotGroup = await prisma.plotGroup.findFirst({
      where: { name: plotLocation },
    });
  }
  if (plotGroup == null) {
    plotGroup = await prisma.plotGroup.create({
      data: { name: plotLocation, siteId: siteId },
    });
  }

  return plotGroupId || plotGroup.id;
};
