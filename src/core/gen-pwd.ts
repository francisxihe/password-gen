import { HmacSHA3, enc } from "crypto-js";
import { EPasswordMode } from "./enum";

interface IGenPwdOption {
  source: string;
  key: string;
  account: string;
  mode: EPasswordMode;
  prefix?: string;
  suffix?: string;
  length?: number;
}

export function genPwd(option: IGenPwdOption) {
  const {
    source,
    key,
    account,
    mode,
    prefix = "",
    suffix = "",
    length,
  } = option;

  if (!source) {
    throw new Error("source不能为空");
  }
  if (!key) {
    throw new Error("key不能为空");
  }
  if (!mode) {
    throw new Error("mode不能为空");
  }
  if (!account) {
    throw new Error("account不能为空");
  }

  const aes = HmacSHA3(source + ":" + account, key);

  if (length) {
    aes.sigBytes = calcSigBytes(length - prefix.length - suffix.length);
  }

  switch (mode) {
    case EPasswordMode.Simple:
      return aes.toString(enc.Base64url).replace("-", "").replace("_", "");
    case EPasswordMode.Complex:
      return prefix + aes.toString(enc.Base64url) + suffix;
    case EPasswordMode.Normal:
      return prefix + aes.toString(enc.Base64url) + suffix;
  }
}

function calcSigBytes(base64Length: number) {
  return (base64Length * 6) / 8;
}
