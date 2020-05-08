import React, { Fragment, useEffect } from 'react'
import { Table, Button, Modal, Row, Col, Popconfirm, Tooltip, notification } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { surDialog } from '../actions/ui'
import fly from 'flyio'
import ErrorBoundary from './ErrorBoundary'
import AddSurve from './AddSurve'
import { sessionId, getSurve } from '../actions/ai'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        surveillance: state.aiTodo.surveillance,
        surdialog: state.uiTodo.surdialog,
        session_id: state.aiTodo.session_id
    }
}

function Surveillance(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                if (props.session_id == '') {
                    await fly
                        .get('/api/yituLogin', {}, { headers: { 'authorization': `Bearer ${props.token}` } })
                        .then(res => {
                            props.dispatch(sessionId(res.data.cb))
                            props.dispatch(getSurve({ token: props.token, session_id: res.data.cb }))
                        })
                        .catch(() => {
                            notification.error({
                                message: 'Error',
                                description: 'Server Error',
                                duration: 2
                            })
                        })
                } else {
                    props.dispatch(getSurve({ token: props.token, session_id: props.session_id }))
                }
            }
        }
        fetchData()
    }, [])

    const handleDelete = async record => {
        await fly
            .post('/api/delTask', {
                id: record.id
            }, { headers: { 'authorization': 'Bearer ' + props.token, 'session_id': props.session_id } })
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

    return <ErrorBoundary>
        <Fragment>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => props.dispatch(surDialog(true))} style={{ marginBottom: 10 }}>添加布控</Button>
            <Modal visible={props.surdialog} footer={null} onCancel={() => props.dispatch(surDialog(false))}>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <ErrorBoundary>
                            <AddSurve />
                        </ErrorBoundary>
                    </Col>
                </Row>
            </Modal>
            <Table dataSource={props.surveillance} rowKey='id' scroll={{ scrollToFirstRowOnChange: true }}
                pagination={{ simple: true, total: props.surveillance.length, pageSize: 5 }}>
                <Table.Column title='布控ID' dataIndex='id' />
                <Table.Column title='布控名称' dataIndex='name' />
                <Table.Column title='操作' dataIndex='option' render={(text, record) => {
                    return props.surveillance.length >= 1 ? (
                        <Popconfirm title='确认删除' cancelText='取消' okText='确定' onConfirm={() => handleDelete(record)}>
                            <Tooltip placement='bottom' title='删除布控' arrowPointAtCenter>
                                <Button type='danger' icon={<DeleteOutlined />} />
                            </Tooltip>
                        </Popconfirm>
                    ) : null
                }} />
            </Table>
        </Fragment>
    </ErrorBoundary>
}

export default connect(mapStateToProps)(Surveillance)