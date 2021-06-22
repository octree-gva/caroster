const { HOST = "localhost" } = process.env;

module.exports = {
  apps: [
    {
      name: "strapi",
      cwd: "backend/",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      restart_delay: 10000,
      max_restarts: 10,
      env: {
        PORT: 80,
      },
    },
    {
      name: "next",
      cwd: "frontend/",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      restart_delay: 10000,
      env: {
        PORT: 3000,
        STRAPI_URL: `http://${HOST}`,
      },
    },
  ],
};
