import React, { Fragment, useEffect } from 'react'
import { Table, Button, Modal, Row, Col, Popconfirm, Tooltip, notification, Divider } from 'antd'
import { DeleteOutlined, PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { camDialog } from '../actions/ui'
import fly from 'flyio'
import ErrorBoundary from './ErrorBoundary'
import AddCamera from './AddCamera'
import { sessionId, getCamera } from '../actions/ai'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        camera: state.aiTodo.camera,
        camdialog: state.uiTodo.camdialog,
        session_id: state.aiTodo.session_id
    }
}

function Camera(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                if (props.session_id == '') {
                    await fly
                        .get('/api/yituLogin', {}, { headers: { 'authorization': `Bearer ${props.token}` } })
                        .then(res => {
                            props.dispatch(sessionId(res.data.cb))
                            props.dispatch(getCamera({ token: props.token, session_id: res.data.cb }))
                        })
                        .catch(() => {
                            notification.error({
                                message: 'Error',
                                description: 'Server Error',
                                duration: 2
                            })
                        })
                } else {
                    props.dispatch(getCamera({ token: props.token, session_id: props.session_id }))
                }
            }
        }
        fetchData()
    }, [])

    const handleDelete = async record => {
        await fly
            .post('/api/delCamera', {
                id: record.id
            }, { headers: { 'authorization': `Bearer ${props.token}`, 'session_id': props.session_id } })
            .then(res => {
                if (res.data.code === 20000) {
                    notification.success({
                        message: '删除成功',
                        description: '',
                        duration: 2
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    notification.error({
                        message: '删除失败',
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

    const use = async record => {
        await fly
            .post('/api/putCamera', {
                id: record.id,
                enabled: 1
            }, { headers: { 'authorization': `Bearer ${props.token}`, 'session_id': props.session_id } })
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
                        message: '修改失败',
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

    return <ErrorBoundary>
        <Fragment>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => props.dispatch(camDialog(true))} style={{ marginBottom: 10 }}>添加直播流</Button>
            <Modal visible={props.camdialog} footer={null} onCancel={() => props.dispatch(camDialog(false))}>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <ErrorBoundary>
                            <AddCamera />
                        </ErrorBoundary>
                    </Col>
                </Row>
            </Modal>
            <Table dataSource={props.camera} rowKey='id' scroll={{ scrollToFirstRowOnChange: true }}
                pagination={{ simple: true, total: props.camera.length, pageSize: 5 }}>
                <Table.Column title='直播流ID' dataIndex='id' />
                <Table.Column title='直播流名称' dataIndex='name' />
                <Table.Column title='直播流地址' dataIndex='url' />
                <Table.Column title='操作' dataIndex='option' render={(text, record) => {
                    return props.camera.length >= 1 ? (
                        <Fragment>
                            <Tooltip placement='bottom' title='启用直播流' arrowPointAtCenter>
                                <Button type='primary' icon={<PlayCircleOutlined />} onClick={() => use(record)} />
                            </Tooltip>
                            <Divider type='vertical' />
                            <Popconfirm title='确认删除' cancelText='取消' okText='确定' onConfirm={() => handleDelete(record)}>
                                <Tooltip placement='bottom' title='删除直播流' arrowPointAtCenter>
                                    <Button type='danger' icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Popconfirm>
                        </Fragment>
                    ) : null
                }} />
            </Table>
        </Fragment>
    </ErrorBoundary>
}

export default connect(mapStateToProps)(Camera)