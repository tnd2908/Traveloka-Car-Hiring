import { Steps, Button, message, Form, Carousel } from "antd";
import { useState, Fragment } from "react";
import InfoForm from "./InfoForm";
import "../../../css/payment.css";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: <InfoForm/>,
    icon: <UserOutlined />,
  },
  {
    title: "First",
    content: "First-content",
    icon: <SolutionOutlined />,
  },
  {
    title: "Second",
    content: "Second-content",
    icon: <LoadingOutlined />,
  },
  {
    title: "Last",
    content: "Last-content",
    icon: <SmileOutlined />,
  },
];

const Payment = (props) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className={"container " + props.className}>
      <p className="h1 text-center">Trang thanh toán</p>
      <Steps className={"pb-5"} current={current}>
        {steps.map((item) => (
          <Step key={item.title}  icon={item.icon} />
        ))}
      </Steps>
      <div className="steps-content pl-5">
        {
          steps.length > 0 && steps[current].content
        }
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default Payment;
