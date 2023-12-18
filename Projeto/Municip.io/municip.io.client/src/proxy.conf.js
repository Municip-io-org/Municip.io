const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target: "https://localhost:7094",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
