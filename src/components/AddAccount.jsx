import React, { useEffect } from 'react'
import { Form, Input, Button, notification, Select } from 'antd'
import { MobileOutlined, KeyOutlined } from '@ant-design/icons'
import fly from 'flyio'
import { connect } from 'react-redux'
import { getUnUseCodes } from '../actions/user'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        unUseCodes: state.userTodo.unUseCodes
    }
}

function AddAccount(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getUnUseCodes(props.token))
            }
        }
        fetchData()
    }, [])

    const onFinish = async values => {
        await fly
            .post('/api/subAccount', {
                phone: values.phone,
                password: values.password,
                codeId: values.code
            }, { headers: { 'authorization': `Bearer ${props.token}` } })
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
        <Form.Item name='phone' rules={[{
            type: 'string', required: true, message: '请输入手机号码'
        }, {
            pattern: /^(1)\d{10}$/, message: '请输入正确的手机号码'
        }]}>
            <Input prefix={<MobileOutlined />} placeholder='手机号码' allowClear />
        </Form.Item>
        <Form.Item name='password' rules={[{
            type: 'string', required: true, message: '请输入密码'
        }, {
            min: 6, max: 18, message: '密码长度为6-18个字符'
        }]}>
            <Input.Password prefix={<KeyOutlined />} placeholder='密码' allowClear />
        </Form.Item>
        <Form.Item name='codeId' rules={[{
            type: 'string', required: true, message: '请选择串流码'
        }]}>
            <Select placeholder='串流码' allowClear>
                {
                    props.unUseCodes.map(item => {
                        return <Select.Option value={item._id} key={item._id}>{item.code}</Select.Option>
                    })
                }
            </Select>
        </Form.Item>
        <Form.Item>
            <Button type='primary' block htmlType='submit'>添 加</Button>
        </Form.Item>
    </Form>
}

export default connect(mapStateToProps)(AddAccount)