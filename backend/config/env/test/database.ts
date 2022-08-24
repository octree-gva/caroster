import path from "path";

export default ({ env }) => {
  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: env("DATABASE_FILENAME", path.join(".tmp", "test.db")),
      },
      useNullAsDefault: true,
    },
  };
};
