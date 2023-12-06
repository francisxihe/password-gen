import { Modal, Input, message } from "antd";
import copy from "copy-to-clipboard";

const Password = (props: {
  password: string;
  setVisible: (visible: boolean) => void;
}) => {
  const { setVisible, password } = props;

  const handleOk = () => {
    try {
      copy(password);
      message.success("密码复制成功");
    } catch (e) {
      message.error("密码复制失败");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="密码"
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
