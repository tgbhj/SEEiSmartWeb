import React, { Fragment, useEffect } from 'react'
import { Table, Button, Modal, Row, Col, Popconfirm, Tooltip, notification, Divider } from 'antd'
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getCodes } from '../actions/user'
import { settingDialog } from '../actions/ui'
import Account from './AddAccount'
import fly from 'flyio'
import ErrorBoundary from './ErrorBoundary'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        codes: state.userTodo.codes,
        dialog: state.uiTodo.dialog
    }
}

function Setting(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getCodes(props.token))
            }
        }
        fetchData()
    }, [])

    const handleDelete = async record => {
        await fly
            .post('/api/delSubAccount', {
                subAccountId: record._id
            }, { headers: { 'authorization': `Bearer ${props.token}` } })
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

    const handleAddWhiteList = async record => {
        await fly
            .post('/api/addWhiteList', {
                code: record.code.code
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

    const handleDelWhiteList = async record => {
        await fly
            .post('/api/delWhiteList', {
                code: record.code.code
            }, { headers: { 'authorization': `Bearer ${props.token}` } })
            .then(res => {
                if (res.data.code === 20000) {
                    notification.success({
                        message: '移出成功',
                        description: '',
                        duration: 2
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    notification.error({
                        message: '移出失败',
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
            <Button type='primary' icon={<PlusOutlined />} onClick={() => props.dispatch(settingDialog(true))} style={{ marginBottom: 10 }}>添加子账号</Button>
            <Modal visible={props.dialog} footer={null} onCancel={() => props.dispatch(settingDialog(false))}>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <ErrorBoundary>
                            <Account />
                        </ErrorBoundary>
                    </Col>
                </Row>
            </Modal>
            <Table dataSource={props.codes} rowKey='_id' scroll={{ scrollToFirstRowOnChange: true }}
                pagination={{ simple: true, total: props.codes.length, pageSize: 5 }}>
                <Table.Column title='子账号' dataIndex='phone' />
                <Table.Column title='串流码' dataIndex={['code', 'code']} />
                <Table.Column title='过期时间' dataIndex={['code', 'expireDate']} />
                <Table.Column title='操作' dataIndex='option' render={(text, record) => {
                    return props.codes.length >= 1 ? (
                        <Fragment>
                            <Popconfirm title='确认删除' cancelText='取消' okText='确定' onConfirm={() => handleDelete(record)}>
                                <Tooltip placement='bottom' title='删除子账号' arrowPointAtCenter>
                                    <Button type='danger' icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Popconfirm>
                            <Divider type='vertical' />
                            <Tooltip placement='bottom' title='加入白名单' arrowPointAtCenter>
                                <Button type='danger' icon={<PlusOutlined />} onClick={() => handleAddWhiteList(record)} />
                            </Tooltip>
                            <Divider type='vertical' />
                            <Tooltip placement='bottom' title='移出白名单' arrowPointAtCenter>
                                <Button type='danger' icon={<MinusOutlined />} onClick={() => handleDelWhiteList(record)} />
                            </Tooltip>
                        </Fragment>
                    ) : null
                }} />
            </Table>
        </Fragment>
    </ErrorBoundary>
}

export default connect(mapStateToProps)(Setting)