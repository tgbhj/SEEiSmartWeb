import React, { Fragment, useEffect } from 'react'
import { Tabs, Table, Button, Divider, Modal, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { getUsers, getAccounts, getAllCodes } from '../actions/user'
import { createModal, updateModal } from '../actions/ui'
import CreateModal from './CreateModal'
import UpdateModal from './UpdateModal'
import ErrorBoundary from './ErrorBoundary'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        users: state.userTodo.users,
        accounts: state.userTodo.accounts,
        allCodes: state.userTodo.allCodes,
        cModal: state.uiTodo.cModal,
        upModal: state.uiTodo.upModal
    }
}

function Admin(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getUsers(props.token))
                await props.dispatch(getAccounts(props.token))
                await props.dispatch(getAllCodes(props.token))
            }
        }
        fetchData()
    }, [])

    return <ErrorBoundary>
        <Tabs defaultActiveKey='1' tabBarExtraContent={<Fragment>
            <Button type='primary' onClick={() => props.dispatch(createModal(true))}>生成串流码</Button>
            <Modal visible={props.cModal} footer={null} onCancel={() => props.dispatch(createModal(false))}>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <ErrorBoundary>
                            <CreateModal />
                        </ErrorBoundary>
                    </Col>
                </Row>
            </Modal>
            <Divider type='vertical' />
            <Button type='primary' onClick={() => props.dispatch(updateModal(true))}>串流码续期</Button>
            <Modal visible={props.upModal} footer={null} onCancel={() => props.dispatch(updateModal(false))}>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <ErrorBoundary>
                            <UpdateModal />
                        </ErrorBoundary>
                    </Col>
                </Row>
            </Modal>
        </Fragment>}>
            <Tabs.TabPane tab='主账号信息' key='1'>
                <Table dataSource={props.users} rowKey='_id' scroll={{ scrollToFirstRowOnChange: true }}
                    pagination={{ simple: true, total: props.users.length, pageSize: 5 }}>
                    <Table.Column title='用户名' dataIndex='username' />
                    <Table.Column title='子账号数量' dataIndex={['subAccount', 'length']} />
                    <Table.Column title='串流码数量' dataIndex={['codes', 'length']} />
                    <Table.Column title='推流地址' dataIndex='ips' key='ips' />
                    <Table.Column title='云推流地址' dataIndex='cloudAddress' />
                    <Table.Column title='权限' dataIndex='admin' />
                </Table>
            </Tabs.TabPane>
            <Tabs.TabPane tab='子账号信息' key='2'>
                <Table dataSource={props.accounts} rowKey='_id' scroll={{ scrollToFirstRowOnChange: true }}
                    pagination={{ simple: true, total: props.accounts.length, pageSize: 5 }}>
                    <Table.Column title='子账号' dataIndex='phone' />
                    <Table.Column title='绑定串流码' dataIndex={['code', 'code']} />
                    <Table.Column title='串流码过期时间' dataIndex={['code', 'expireDate']} />
                    <Table.Column title='主账号' dataIndex={['user', 'username']} />
                </Table>
            </Tabs.TabPane>
            <Tabs.TabPane tab='串流码信息' key='3'>
                <Table dataSource={props.allCodes} rowKey='_id' scroll={{ scrollToFirstRowOnChange: true }}
                    pagination={{ simple: true, total: props.allCodes.length, pageSize: 5 }}>
                    <Table.Column title='串流码' dataIndex='code' />
                    <Table.Column title='过期时间' dataIndex='expireDate' />
                    <Table.Column title='绑定子账号' dataIndex={['subAccount', 'phone']} />
                    <Table.Column title='主账号' dataIndex={['user', 'username']} />
                </Table>
            </Tabs.TabPane>
        </Tabs>
    </ErrorBoundary>
}

export default connect(mapStateToProps)(Admin)