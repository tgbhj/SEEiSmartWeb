import React from 'react'
import { Row, Col, Form, Button, Input } from 'antd'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token
    }
}

function Password(props) {
    const onFinish = async values => {
        await fly
            .post('/api/password', {
                username: values.username,
                old: values.old,
                new: values.new
            }, { headers: { 'authorization': `Bearer ${props.token}` } })
            .then(res => {
                if (res.data.code === 20000) {
                    notification.success({
                        message: '修改成功',
                        description: '',
                        duration: 2
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    notification.error({
                        message: '账号不存在',
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
            <div style={{ margin: 0, textAlign: 'center' }}><h1>修改密码</h1></div>
            <Form onFinish={onFinish}>
                <Form.Item name='username' rules={[{
                    min: 6, max: 18, message: '用户名长度为6-18个字符'
                }, {
                    type: 'string', required: true, message: '请输入用户名'
                }]}>
                    <Input prefix={<UserOutlined />} placeholder='用户名' allowClear />
                </Form.Item>
                <Form.Item name='old' rules={[{
                    min: 6, max: 18, message: '密码长度为6-18个字符'
                }, {
                    type: 'string', required: true, message: '请输入密码'
                }]}>
                    <Input.Password prefix={<KeyOutlined />} placeholder='旧密码' allowClear />
                </Form.Item>
                <Form.Item name='new' rules={[{
                    min: 6, max: 18, message: '密码长度为6-18个字符'
                }, {
                    type: 'string', required: true, message: '请输入密码'
                }]}>
                    <Input.Password prefix={<KeyOutlined />} placeholder='新密码' allowClear />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' block htmlType='submit'>修 改</Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
}

export default connect(mapStateToProps)(Password)