import React from 'react'
import fly from 'flyio'
import { Row, Col, Button, Form, Input, notification } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

function SignIn() {
    const onFinish = async values => {
        await fly
            .post('/api/signIn', {
                username: values.username,
                password: values.password
            })
            .then(res => {
                if (res.data.code === 20000) {
                    localStorage.setItem('token', res.data.cb.token)
                    window.location.href = '/'
                } else {
                    notification.error({
                        message: '账号或密码错误',
                        description: '',
                        duration: 2
                    })
                }
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Server Error',
                    duration: 2
                })
            })
    }
    
    return <Row type='flex' justify='center' align='middle'>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div style={{ margin: 0, textAlign: 'center' }}><h1>用户登录</h1></div>
            <Form onFinish={onFinish}>
                <Form.Item name='username' rules={[{
                    type: 'string', required: true, message: '请输入用户名'
                }, {
                    min: 6, max: 18, message: '用户名长度为6-18个字符'
                }]}>
                    <Input prefix={<UserOutlined />} placeholder='用户名' allowClear />
                </Form.Item>
                <Form.Item name='password' rules={[{
                    type: 'string', required: true, message: '请输入密码'
                }, {
                    min: 6, max: 18, message: '密码长度为6-18个字符'
                }]}>
                    <Input.Password prefix={<KeyOutlined />} placeholder='密码' allowClear />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' block htmlType='submit'>登 录</Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
}

export default SignIn