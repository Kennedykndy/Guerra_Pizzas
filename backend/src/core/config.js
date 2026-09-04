import "dotenv/config";

const config = {
  port: Number(process.env.PORT) || 3000,

  database: {
    database: "./database.sqlite",
  },
};

export default config;
