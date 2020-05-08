import React from 'react'
import fly from 'flyio'
import { Button, Form, Input, notification } from 'antd'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token
    }
}

function UpdateModal(props) {
    const onFinish = async values => {
        await fly
            .put('/api/codes', {
                code: values.code
            }, { headers: { 'authorization': `Bearer ${props.token}` } })
            .then(res => {
                if (res.data.code === 20000) {
                    notification.success({
                        message: '续期成功',
                        description: '',
                        duration: 2
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    notification.error({
                        message: '续期失败',
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
        <Form.Item name='code' rules={[{
            min: 40, max: 40, message: '串流码长度为40个字符'
        }, {
            type: 'string', required: true, message: '请输入串流码'
        }]}>
            <Input placeholder='串流码' allowClear />
        </Form.Item>
        <Form.Item>
            <Button type='primary' block htmlType='submit'>续 期</Button>
        </Form.Item>
    </Form>
}

export default connect(mapStateToProps)(UpdateModal)