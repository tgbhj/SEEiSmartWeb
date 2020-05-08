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

function AddSurve(props) {
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
            .post('/api/task', {
                name: values.name,
                requests: [{
                    camera_id: values.camera_id,
                    repository_id: values.repository_id,
                    threshold: values.threshold
                }]
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
            type: 'string', required: true, message: '请输入布控名称'
        }]}>
            <Input placeholder='布控名称' allowClear />
        </Form.Item>
        <Form.Item name='camera_id' rules={[{
            type: 'string', required: true, message: '请输入直播流ID'
        }]}>
            <Input placeholder='直播流ID' allowClear />
        </Form.Item>
        <Form.Item name='repository_id' rules={[{
            type: 'string', required: true, message: '请输入人像库ID'
        }]}>
            <Input placeholder='人像库ID' allowClear />
        </Form.Item>
        <Form.Item name='threshold' rules={[{
            type: 'string', required: true, message: '请输入报警分数线'
        }]}>
            <Input placeholder='报警分数线' allowClear />
        </Form.Item>
        <Form.Item>
            <Button type='primary' block htmlType='submit'>添 加</Button>
        </Form.Item>
    </Form>
}

export default connect(mapStateToProps)(AddSurve)