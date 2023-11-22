declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    NEXT_PUBLIC_API: string;
    NEXT_PUBLIC_NAMESPACE: string;
    NEXT_PUBLIC_BUCKET: string;
  }
}
