const ignoreHeaders = ['host'];

module.exports = req => {
  const origHeaders = req.headers;
  const proxyHeaders = {};

  Object.keys(origHeaders).forEach(key => {
    if (!ignoreHeaders.includes(key.toLocaleLowerCase())) {
      proxyHeaders[key] = origHeaders[key];
    }
  });

  return proxyHeaders;
};
