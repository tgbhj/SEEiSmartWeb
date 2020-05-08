import React, { useEffect } from 'react'
import { Form, Input, Button, notification } from 'antd'
import fly from 'flyio'
import { connect } from 'react-redux'
import { sessionId } from '../actions/ai'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        session_id: state.aiTodo.session_id
    }
}

function AddCamera(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                if (props.session_id == '') {
                    await fly
                        .get('/api/yituLogin', {}, { headers: { 'authorization': `Bearer ${props.token}` } })
                        .then(res => {
                            props.dispatch(sessionId(res.data.cb))
                        })
                        .catch(() => {
                            notification.error({
                                message: 'Error',
                                description: 'Server Error',
                                duration: 2
                            })
                        })
                }
            }
        }
        fetchData()
    }, [])

    const onFinish = async values => {
        await fly
            .post('/api/camera', {
                name: values.name,
                url: values.url
            }, { headers: { 'authorization': `Bearer ${props.token}`, 'session_id': props.session_id } })
            .then(res => {
                if (res.data.code === 20000) {
                    notification.success({
                        message: '添加成功',
                        description: '',
                        duration: 2
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    notification.error({
                        message: '添加失败',
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
        <Form.Item name='name' rules={[{
            type: 'string', required: true, message: '请输入直播流名称'
        }]}>
            <Input placeholder='直播流名称' allowClear />
        </Form.Item>
        <Form.Item name='url' rules={[{
            type: 'string', required: true, message: '请输入直播流地址'
        }]}>
            <Input placeholder='直播流地址' allowClear />
        </Form.Item>
        <Form.Item>
            <Button type='primary' block htmlType='submit'>新 建</Button>
        </Form.Item>
    </Form>
}

export default connect(mapStateToProps)(AddCamera)