import { ConfigFileAuthenticationDetailsProvider } from "oci-sdk";

export const provider = new ConfigFileAuthenticationDetailsProvider(
  "./.oci/config"
);
