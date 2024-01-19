const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/api"
      
    ],
    target: "https://localhost:7008",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
