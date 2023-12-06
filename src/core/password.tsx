import { Modal, Input } from "antd";
import copy from "copy-to-clipboard";

const Password = (props: {
  password: string;
  setVisible: (visible: boolean) => void;
}) => {
  const { setVisible, password } = props;

  const handleOk = () => {
    copy(password);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Basic Modal"
      open={true}
      okText="复制"
      cancelText="关闭"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input.Password value={password}></Input.Password>
    </Modal>
  );
};

export default Password;
