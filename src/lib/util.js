const crypto = require("crypto");

function sha1(str) {
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

/**
 * 校验微信签名
 * @function
 * @param {String} signature
 * @param {String} timestemp
 * @param {String} nonce
 * @param {String} token
 * @return {Boolean}
 */
exports.checkSignature = function (signature, timestamp, nonce, token) {
  const sorted = [nonce, timestamp, token].sort();
  const joined = sorted.join('');
  const hashed = sha1(joined);
  return signature === hashed;
}