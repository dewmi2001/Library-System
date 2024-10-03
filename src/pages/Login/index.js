import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {  Input } from 'antd';
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className ="h-screen bg-primary flex items-center justify-center p-3" style={{paddingTop:"100px"}} >
      <div className =" bg-white p-3 rounded"style={{width:"400px",height:"300px"}} >
       
      <Form layout="vertical" onFinish={onFinish}>
      
      <h1 className='text-primary text-2xl font-bold ' style={{ textAlign: "center" }}>Login</h1>
               <hr></hr>
               <div style={{ height: "20px" }}></div>
         
        <Form.Item  label="Email" name="email" rules={[{ required: true, message: ' Name is required' }]} >
                  <Input type="email" placeholder='email' />
               </Form.Item>

               <Form.Item  label="Password" name="password" rules={[{ required: true, message: ' Password is required' }]}>
                  <Input type="password" placeholder='password' />
               </Form.Item>

          <div className="text-center mt-2 flex flex-col gap-1">
            <Button title="Login" type="submit" />
            <Link to="/register" className="text-primary text-sm underline">
              Dont have an account? Click Here To Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
