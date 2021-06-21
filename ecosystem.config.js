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
    },
    {
      name: "next",
      cwd: "frontend/",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      restart_delay: 10000,
    },
  ],
};
