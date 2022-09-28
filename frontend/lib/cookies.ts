import sha1 from 'crypto-js/sha1';
import EncBase64 from 'crypto-js/enc-base64';

export const hashText = (text: string) => sha1(text).toString(EncBase64);

export const getCookie = (cname: string, cookieHeader?: string) => {
  const cookieString =
    typeof document === 'undefined' ? cookieHeader : document.cookie;
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(cookieString || '');
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const setCookie = (cname: string, cvalue: string, exdays = 30) => {
  if (typeof document !== 'undefined') {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }
};
