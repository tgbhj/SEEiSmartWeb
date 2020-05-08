import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Pagination, Tabs, Tooltip } from 'antd'
import ErrorBoundary from '../components/ErrorBoundary'
import fly from 'flyio'
import { sessionId, getSurve, getRealtime, getAlert } from '../actions/ai'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        surveillance: state.aiTodo.surveillance,
        realtime: state.aiTodo.realtime,
        alert: state.aiTodo.alert,
        session_id: state.aiTodo.session_id
    }
}

function Hit(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                if (props.session_id == '') {
                    await fly
                        .get('/api/yituLogin', {}, { headers: { 'authorization': `Bearer ${props.token}` } })
                        .then(async res => {
                            await props.dispatch(sessionId(res.data.cb))
                            await props.dispatch(getSurve({ token: props.token, session_id: res.data.cb }))
                            await props.dispatch(getRealtime({ token: props.token, session_id: res.data.cb }))
                            await props.dispatch(getAlert({ token: props.token, session_id: res.data.cb }))
                        })
                        .catch(() => {
                            notification.error({
                                message: 'Error',
                                description: 'Server Error',
                                duration: 2
                            })
                        })
                } else {
                    await props.dispatch(getSurve({ token: props.token, session_id: props.session_id }))
                    await props.dispatch(getRealtime({ token: props.token, session_id: props.session_id }))
                    await props.dispatch(getAlert({ token: props.token, session_id: props.session_id }))
                }
            }
        }
        fetchData()
    }, [])

    return <ErrorBoundary>
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab='所有报警' key='1'>
                <Row gutter={[10, 10]}>
                    {
                        props.alert.map(item => {
                            return <Col xs={24} sm={4} md={4} lg={4} xl={4} xxl={4} key={item.result1.face_image_id}>
                                <Card hoverable
                                    cover={<img src={`http://222.73.36.73:11180/business/api/storage/image?uri_base64=${window.btoa(item.result1.face_image_uri)}`} />}>
                                    <Tooltip placement='top' title={item.result1.face_image_id} arrowPointAtCenter>
                                        <Card.Meta title={item.result1.face_image_id} />
                                    </Tooltip>
                                </Card>
                            </Col>
                        })
                    }
                </Row>
                <Pagination simple total={props.alert.length} pageSize={12} style={{ textAlign: 'center', margin: '15px auto 0' }} />
            </Tabs.TabPane>
            <Tabs.TabPane tab='实时报警' key='2'>
                <Row gutter={[10, 10]}>
                    {
                        props.realtime.map(item => {
                            return <Col xs={24} sm={4} md={4} lg={4} xl={4} xxl={4} key={item.result1.face_image_id}>
                                <Card hoverable
                                    cover={<img src={`http://222.73.36.73:11180/business/api/storage/image?uri_base64=${window.btoa(item.result1.face_image_uri)}`} />}>
                                    <Tooltip placement='top' title={item.result1.face_image_id} arrowPointAtCenter>
                                        <Card.Meta title={item.result1.face_image_id} />
                                    </Tooltip>
                                </Card>
                            </Col>
                        })
                    }
                </Row>
                <Pagination simple total={props.realtime.length} pageSize={12} style={{ textAlign: 'center', margin: '15px auto 0' }} />
            </Tabs.TabPane>
        </Tabs>
    </ErrorBoundary>
}

export default connect(mapStateToProps)(Hit)