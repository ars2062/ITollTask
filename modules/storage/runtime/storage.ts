import { Context } from "@nuxt/types";

const cookieOptions = ['maxAge', 'domain', 'path', 'expires', 'httpOnly', 'secure'];
function isObjectOrArray(obj) {
  const type = Object.prototype.toString.call(obj);
  return type === '[object Object]' || type === '[object Array]';
}
function encodeValue(val) {
  if (typeof val === 'string') {
    return val;
  }
  return JSON.stringify(val);
}
function decodeValue(val) {
  const type = Object.prototype.toString.call(val);
  if (type === '[object Object]') {
    return val;
  }
  if (type === 'undefined') {
    return val;
  }
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
}
function decodeCookie(cookie) {
  cookie = decodeURI(cookie);
  const arr = cookie.split('; ');
  const obj = {};
  function getCookieOptions(i) {
    const cookie = arr[i].split('=');
    const key = cookie[0];
    const val = cookie[1];
    const nextCookie = i + 1 < arr.length ? arr[i + 1].split('=') : null;
    if (cookieOptions.find((i) => kebabize(i) === key)) {
      if (nextCookie && cookieOptions.find((i) => kebabize(i) === nextCookie[0])) {
        return { [key]: val, ...getCookieOptions(i + 1) };
      } else {
        return { [key]: val };
      }
    } else {
      return {};
    }
  }
  for (let i = 0; i < arr.length; i++) {
    const splited = arr[i].split('=');
    if (splited.length > 1) {
      const key = splited[0];
      const value = splited[1];
      const options = getCookieOptions(i);
      if (options) {
        obj[key] = {
          _value: value,
          _options: options
        };
      } else obj[key] = value;
    }
  }
  return obj;
}
function encodeCookie(cookie) {
  const arr: string[] = [];
  for (const key in cookie) {
    const value = cookie[key];
    if (typeof value === 'object') {
      value._value = encodeURI(value._value);
      for (const option in value._options) {
        if (cookieOptions.includes(option)) {
          const optionValue = value._options[option];
          value._value += `; ${kebabize(option)}=${optionValue}`;
        }
      }
      arr.push(`${key}=${value._value}`);
    } else {
      arr.push(`${key}=${encodeURI(value)}`);
    }
  }
  return arr.join('; ');
}
function kebabize(str) {
  const arr: string[] = [];
  let buffer = '';
  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    if (letter === letter.toUpperCase()) {
      arr.push(buffer);
      buffer = letter;
    } else buffer += letter.toLowerCase();
  }
  arr.push(buffer);
  return arr.join('-');
}

interface IStorageOptions {
  localStorage:{
    prefix:string
  }
  cookie:{
    prefix:string
  }
}

export class Storage {
  ctx: Context
  options:IStorageOptions
  constructor(ctx: Context, options: IStorageOptions) {
    this.ctx = ctx;
    this.options = options;
  }

  setUniversal(key, value) {
    this.setCookie(key, value);
    this.setLocalStorage(key, value);
    return value;
  }

  getUniversal(key) {
    let value = this.getCookie(key);
    if (!value) value = this.getLocalStorage(key);
    return value;
  }

  removeUniversal(key) {
    this.removeLocalStorage(key);
    this.removeCookie(key);
  }

  setLocalStorage(key, value) {
    if (typeof localStorage === 'undefined' || !this.options.localStorage) {
      return;
    }

    const _key = this.options.localStorage.prefix + key;

    if (isObjectOrArray(value)) {
      localStorage.setItem(_key, JSON.stringify(value));
    } else {
      localStorage.setItem(_key, value);
    }

    return value;
  }

  getLocalStorage(key) {
    if (typeof localStorage === 'undefined' || !this.options.localStorage) {
      return;
    }

    const _key = this.options.localStorage.prefix + key;

    const value = localStorage.getItem(_key);

    return decodeValue(value);
  }

  removeLocalStorage(key) {
    if (typeof localStorage === 'undefined' || !this.options.localStorage) {
      return;
    }
    const _key = this.options.localStorage.prefix + key;
    localStorage.removeItem(_key);
  }

  getCookies() {
    const cookieStr = process.client ? document.cookie : this.ctx.req.headers.cookie;

    return decodeCookie(cookieStr || '') || {};
  }

  setCookie(key, value, options = {}) {
    if (!this.options.cookie) {
      return;
    }

    const _key = this.options.cookie.prefix + key;
    const _options = Object.assign({}, options);
    const _value = encodeValue(value);

    const cookies = {};

    cookies[_key] = { _value, _options };
    // for (const option in _options) {
    //   if (cookieOptions.includes(option)) {
    //     const optionValue = _options[option];
    //     cookies[kebabize(option)] = optionValue;
    //   }
    // }

    const serializedCookie = encodeCookie(cookies);

    if (process.browser) {
      document.cookie = serializedCookie;
    } else if (process.server && this.ctx.res) {
      this.ctx.res.setHeader('Set-Cookie', [serializedCookie]);
    }

    return value;
  }

  getCookie(key) {
    if (!this.options.cookie || (process.server && !this.ctx.req)) {
      return;
    }

    const _key = this.options.cookie.prefix + key;

    const cookies = this.getCookies();

    const value = cookies[_key]
      ? typeof cookies[_key] === 'object'
        ? decodeURIComponent(cookies[_key]._value)
        : decodeURIComponent(cookies[_key])
      : undefined;

    return decodeValue(value);
  }

  removeCookie(key) {
    const cookies = this.getCookies();
    let deleted = false;
    for (const _key in cookies) {
      if (this.options.cookie.prefix + key === _key) {
        delete cookies[_key];
        deleted = true;
      } else if (deleted && cookieOptions.includes(_key)) {
        delete cookies[kebabize(_key)];
      } else if (deleted) {
        break;
      }
    }
    const serializedCookie = encodeCookie(cookies);
    if (process.client) {
      document.cookie = serializedCookie;
    } else if (process.server && this.ctx.res) {
      this.ctx.res.setHeader('Set-Cookie', [serializedCookie]);
    }
  }
}
