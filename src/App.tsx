import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Input, Form, Space, Button, FormInstance, Select } from "antd";
import { genPwd } from "./core/gen-pwd";
import Password from "./core/password";
import { useChangePrefixLength, useChangePwdLength, useChangeSuffixLength } from "./core/hooks";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      (errorInfo) => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

function App() {
  const [form] = Form.useForm();
  const [pwdVisible, setPwdVisible] = useState(false);
  const [password, setPassword] = useState("");
  form.submit = () => {
    setPassword(genPwd(form.getFieldsValue(true)));
    setPwdVisible(true);
  };

  useChangePwdLength(form);
  useChangePrefixLength(form);
  useChangeSuffixLength(form);

  return (
    <div className="main">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        initialValues={{
          mode: "normal",
        }}
      >
        <Form.Item name="source" label="Source" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="account" label="Account" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="key" label="Key" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
          <Select
            options={[
              { value: "complex", label: "complex" },
              { value: "normal", label: "normal" },
              { value: "simple", label: "simple" },
            ]}
          />
        </Form.Item>
        <Form.Item name="prefix" label="前缀">
          <Input.Password />
        </Form.Item>
        <Form.Item name="suffix" label="后缀">
          <Input.Password />
        </Form.Item>
        <Form.Item name="length" label="密码长度" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} />
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>

      {pwdVisible && (
        <Password password={password} setVisible={setPwdVisible}></Password>
      )}
    </div>
  );
}

export default App;
