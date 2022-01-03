import { Alert, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import axiosApiIntances from "../utils/axios";

const Login = () => {
  const [error, setError] = useState({ status: false, data: "" });
  const onFinish = (values) => {
    const setData = {
      userName: values.username,
      userPassword: values.password,
    };
    axiosApiIntances
      .post("auth/login", setData)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setError({ status: false, data: "" });
        window.location.href = "/data";
      })
      .catch((err) => {
        console.log(err);
        setError({ status: true, data: err?.response?.data?.msg });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Card
        style={{
          width: "100%",
          margin: "0 auto",
          verticalAlign: "baseline",
          marginTop: "200px",
        }}
      >
        <div className="d-flex flex-row">
          <div>
            <h1>RW 10</h1>
          </div>
          <div style={{ marginTop: "15px", marginLeft: "20px" }}>
            <h5>Login</h5>
          </div>
        </div>
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {error.status && (
            <Alert
              style={{ marginBottom: "10px" }}
              message={<p className="text-danger">{error.data}</p>}
              type="error"
            />
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Login;
