import type { NextApiRequest, NextApiResponse } from "next";
import { objectstorage } from "oci-sdk";
import path from "path";
import { UploadFile } from "../../src/api/schema";

import { provider } from "../../src/api/utils";

type ResponseData = {};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { name, body } = <UploadFile>req.body;
  const storageClient = new objectstorage.ObjectStorageClient({
    authenticationDetailsProvider: provider,
  });
  const prefix = "2023_final_workshop/plant";
  const listObjectsPayload: objectstorage.requests.PutObjectRequest = {
    namespaceName: process.env.NEXT_PUBLIC_NAMESPACE,
    bucketName: process.env.NEXT_PUBLIC_BUCKET,
    objectName: path.join(prefix, name),
    putObjectBody: Buffer.from(
      body.replace(/^data:\w+\/[\w\.\-]+;base64,/, ""),
      "base64"
    ),
  };
  const storageRes = await storageClient.putObject(listObjectsPayload);

  return res.status(200).json({
    message: `The object ${name} was successfully created at ${storageRes.lastModified}`,
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
