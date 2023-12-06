import { Form, FormInstance } from "antd";
import { useEffect } from "react";
import { EPasswordMode } from "./enum";

export const useChangePwdLength = (form: FormInstance) => {
  const modeValue: EPasswordMode = Form.useWatch("mode", form);

  return useEffect(() => {
    switch (modeValue) {
      case EPasswordMode.Complex:
        form.setFieldValue("length", 20);
        break;
      case EPasswordMode.Simple:
        form.setFieldValue("length", 12);
        break;
      case EPasswordMode.Normal:
      default:
        form.setFieldValue("length", 16);
    }
  }, [form, modeValue]);
};

export const useChangePrefixLength = (form: FormInstance) => {
  const modeValue: EPasswordMode = Form.useWatch("mode", form);

  return useEffect(() => {
    switch (modeValue) {
      case EPasswordMode.Simple:
        form.setFieldValue("prefix", "");
        break;
      case EPasswordMode.Complex:
      case EPasswordMode.Normal:
      default:
        form.setFieldValue("prefix", "!");
    }
  }, [form, modeValue]);
};

export const useChangeSuffixLength = (form: FormInstance) => {
  const modeValue: EPasswordMode = Form.useWatch("mode", form);

  return useEffect(() => {
    switch (modeValue) {
      case EPasswordMode.Simple:
        form.setFieldValue("suffix", "");
        break;
      case EPasswordMode.Complex:
      case EPasswordMode.Normal:
      default:
        form.setFieldValue("suffix", "@");
    }
  }, [form, modeValue]);
};
