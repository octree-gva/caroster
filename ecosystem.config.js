module.exports = {
  apps: [
    {
      name: "strapi",
      cwd: "backend/",
      script: "yarn",
      args: "start",
      interpreter: "sh",
      restart_delay: 10000,
      max_restarts: 10,
    },
    {
      name: "next",
      cwd: "frontend/",
      script: "yarn",
      args: "start",
      interpreter: "sh",
      restart_delay: 10000,
      env: {
        PORT: 3000,
        STRAPI_URL: `http://localhost:1337`,
      },
    },
  ],
};
