const PROXY_CONFIG = [
  {
    context: [
      '/api',
    ],
    target: 'http://127.0.0.1:7071',
    changeOrigin: true,
    withCredentials: true,
    secure: false,
    headers: {
      'Connection': 'keep-alive'
    }
  }
]

module.exports = PROXY_CONFIG;
