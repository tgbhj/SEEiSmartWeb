import React, { Fragment, useEffect } from 'react'
import { Table, Button, Modal, Row, Col, Popconfirm, Tooltip, notification, Divider, Upload, message } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { repDialog } from '../actions/ui'
import fly from 'flyio'
import ErrorBoundary from './ErrorBoundary'
import AddRep from './AddRep'
import { sessionId, getRepository } from '../actions/ai'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        repository: state.aiTodo.repository,
        repdialog: state.uiTodo.repdialog,
        session_id: state.aiTodo.session_id
    }
}

function Repository(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                if (props.session_id == '') {
                    await fly
                        .get('/api/yituLogin', {}, { headers: { 'authorization': `Bearer ${props.token}` } })
                        .then(res => {
                            props.dispatch(sessionId(res.data.cb))
                            props.dispatch(getRepository({ token: props.token, session_id: res.data.cb }))
                        })
                        .catch(() => {
                            notification.error({
                                message: 'Error',
                                description: 'Server Error',
                                duration: 2
                            })
                        })
                } else {
                    props.dispatch(getRepository({ token: props.token, session_id: props.session_id }))
                }
            }
        }
        fetchData()
    }, [])

    const handleDelete = async record => {
        await fly
            .post('/api/delRepository', {
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

    const onChange = info => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed`)
        }
    }

    return <ErrorBoundary>
        <Fragment>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => props.dispatch(repDialog(true))} style={{ marginBottom: 10 }}>新建人像库</Button>
            <Modal visible={props.repdialog} footer={null} onCancel={() => props.dispatch(repDialog(false))}>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <ErrorBoundary>
                            <AddRep />
                        </ErrorBoundary>
                    </Col>
                </Row>
            </Modal>
            <Table dataSource={props.repository} rowKey='id' scroll={{ scrollToFirstRowOnChange: true }}
                pagination={{ simple: true, total: props.repository.length, pageSize: 5 }}>
                <Table.Column title='库ID' dataIndex='id' />
                <Table.Column title='库名称' dataIndex='name' />
                <Table.Column title='库中人脸数目' dataIndex='face_image_num' />
                <Table.Column title='创建时间' dataIndex='create_time' />
                <Table.Column title='操作' dataIndex='option' render={(text, record) => {
                    return props.repository.length >= 1 ? (
                        <Fragment>
                            <Upload action='/api/batchSinglePerson' onChange={onChange} showUploadList={false}
                                headers={{ 'authorization': 'Bearer ' + props.token, 'session_id': props.session_id, 'repid': record.id }}>
                                <Tooltip placement='bottom' title='添加人像' arrowPointAtCenter>
                                    <Button icon={<PlusOutlined />} />
                                </Tooltip>
                            </Upload>
                            <Divider type='vertical' />
                            <Popconfirm title='确认删除' cancelText='取消' okText='确定' onConfirm={() => handleDelete(record)}>
                                <Tooltip placement='bottom' title='删除人像库' arrowPointAtCenter>
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

export default connect(mapStateToProps)(Repository)