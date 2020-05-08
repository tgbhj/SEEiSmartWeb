import React from 'react'
import { Row, Col, Form, Button, Upload, Input, notification } from 'antd'
import fly from 'flyio'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token
    }
}

function Apk(props) {
    const onFinish = async values => {
        await fly
            .post('/api/apkSave', {
                version: values.version,
                detail: values.detail
            }, { headers: { 'authorization': `Bearer ${props.token}` } })
            .then(res => {
                if (res.data.code === 20000) {
                    notification.success({
                        message: '提交成功',
                        description: '',
                        duration: 2
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    notification.error({
                        message: '提交失败',
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
            <Form onFinish={onFinish}>
                <Form.Item name='version' rules={[{
                    type: 'string', required: true, message: '请输入apk版本号'
                }, {
                    pattern: /^[0-9]{1,3}$/, message: 'apk版本号为正整数'
                }, {
                    min: 1, max: 3, message: 'apk版本号长度为1-3个字符'
                }]}>
                    <Input placeholder='apk版本号' allowClear />
                </Form.Item>
                <Form.Item name='detail' rules={[{
                    type: 'string', required: true, message: '请输入apk信息'
                }, {
                    min: 1, max: 200, message: 'apk信息长度为1-200个字符'
                }]}>
                    <Input.TextArea placeholder='apk信息' allowClear autoSize />
                </Form.Item>
                <Form.Item required>
                    <Upload name='file' action='/api/apkUpload' headers={{
                        authorization: `Bearer ${props.token}`
                    }} accept='.apk'>
                        <Button>上传APK</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' block htmlType='submit'>保 存</Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
}

export default connect(mapStateToProps)(Apk)