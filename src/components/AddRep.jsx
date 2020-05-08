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

function AddRep(props) {
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
            .post('/api/repository', {
                name: values.name
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
        <FormItem name='name' rules={[{
            type: 'string', required: true, message: '请输入库名称'
        }]}>
            <Input placeholder='库名称' allowClear />
        </FormItem>
        <FormItem>
            <Button type='primary' block htmlType='submit'>新 建</Button>
        </FormItem>
    </Form>
}

export default connect(mapStateToProps)(AddRep)