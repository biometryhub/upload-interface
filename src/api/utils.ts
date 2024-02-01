import { PrismaClient } from "@prisma/client";
import { ConfigFileAuthenticationDetailsProvider } from "oci-sdk";

export const prisma = new PrismaClient();

export const provider = new ConfigFileAuthenticationDetailsProvider(
  "./.oci/config"
);

export const getRandomString = () => {
  return Math.random().toString(36).slice(2);
};
