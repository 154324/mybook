//proxy 버전이 1.x 이면 에러가 나고 버전업이 되어 사용방식이 바뀌었다.
//cors를 해결하는 방법 (즉 서버와 클라이언트 사이를 통신시켜주는 미들웨어라 생각하자)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

//proxy server를 사용하는 이유는
//방화벽 기능, 웹 필터 기능,캐쉬 공유데이터 공유 기능
//캐쉬를 이용해 더 빠른 인터네 이용제고
//더 나은 보안 제공(ip를 임의로 보내준다)
//이용 제한된 사이트 접근가능
