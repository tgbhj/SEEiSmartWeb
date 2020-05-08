import React from 'react'
import fly from 'flyio'
import { Button, Form, Input, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token
    }
}

function CreateModal(props) {
    const onFinish = async values => {
        await fly
            .post('/api/codes', {
                username: values.username
            }, { headers: { 'authorization': `Bearer ${props.token}` } })
            .then(res => {
                if (res.data.code === 20000) {
                    notification.success({
                        message: '创建成功',
                        description: '',
                        duration: 2
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    notification.error({
                        message: '创建失败',
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

    return <Form onFinish={onFinish}>
        <Form.Item name='username' rules={[{
            min: 6, max: 18, message: '用户名长度为6-18个字符'
        }, {
            type: 'string', required: true, message: '请输入用户名'
        }]}>
            <Input prefix={<UserOutlined />} placeholder='用户名' allowClear />
        </Form.Item>
        <Form.Item>
            <Button type='primary' block htmlType='submit'>创建串流码</Button>
        </Form.Item>
    </Form>
}

export default connect(mapStateToProps)(CreateModal)