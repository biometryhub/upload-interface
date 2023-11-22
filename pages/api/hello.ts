import type { NextApiRequest, NextApiResponse } from "next";
import { objectstorage } from "oci-sdk";

import { provider } from "../../src/api/utils";

type ResponseData = {};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const storageClient = new objectstorage.ObjectStorageClient({
    authenticationDetailsProvider: provider,
  });
  const listObjectsPayload: objectstorage.requests.ListObjectsRequest = {
    namespaceName: process.env.NEXT_PUBLIC_NAMESPACE,
    bucketName: process.env.NEXT_PUBLIC_BUCKET,
  };
  const storageRes = await storageClient.listObjects(listObjectsPayload);

  return res.status(200).json({ a: storageRes.listObjects.objects.length });
};
export default handler;
