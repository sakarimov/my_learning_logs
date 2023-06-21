module.exports = {
  apps : [{
    name   : "notes",
    script : "./src/server.js",
    watch  : true,
    env_production: {
      "NODE_ENV": "production"
    },
    env_development: {
      "NODE_ENV": "development",
    }
  }]
}
