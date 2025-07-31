import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string ,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    JWT_ACCESS_SECRET: string,
    JWT_REFRESH_SECRET: string,
    JWT_ACCESS_EXPIRESIN:string,
    JWT_REFRESH_EXPIRESIN:string,
    BCRYPT_SALT_ROUND:number,
}

const loadEnvVariables = (): EnvConfig => {
  const requrementVariables: string[] = [
"PORT", "DB_URL", "NODE_ENV","JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRESIN", "JWT_ACCESS_EXPIRESIN", "BCRYPT_SALT_ROUND",
  ];

  requrementVariables.map((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require Variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string ,
    DB_URL: process.env.DB_URL as string, 
    NODE_ENV: process.env.NODE_ENV as "development" | 'production',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRESIN:process.env.JWT_REFRESH_EXPIRESIN as string,
    JWT_ACCESS_EXPIRESIN:process.env.JWT_ACCESS_EXPIRESIN as string,
    BCRYPT_SALT_ROUND:parseInt(process.env.BCRYPT_SALT_ROUND as string, 10),
  };
};

export const envVars = loadEnvVariables();
