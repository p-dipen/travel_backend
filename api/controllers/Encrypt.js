/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const md5 = require('md5');
const moment = require('moment');
const CryptoJS = require('crypto-js');
// const aesjs = require('aes-js');

const Encrypt = () => {
  const passwordEncrytp = (req, res) => {
    // const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    // const iv = [];
    const aesSecret = 'c132b4bc6a48e054770af7b1f925d95c';
    console.log(moment().format('YYYYMMDD'));
    const salt = md5(moment().format('YYYYMMDD'));
    const passwordSend = `Pr2a2iv20itXmL${salt.toString()}`;
    console.log(passwordSend);
    const en = CryptoJS.AES.encrypt(passwordSend, aesSecret, { vi: '0000000000000000' });
    console.log(en.iv);
    console.log(en.ciphertext);
    // const base64 = CryptoJS.enc.Base64.stringify(encryptedHex);
    // console.log(encryptedHex);
    return res.status(200).json({ success: en.toString() });
  };
  return { passwordEncrytp };
};

module.exports = Encrypt;

