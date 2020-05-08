import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button, Tooltip, notification, Pagination } from 'antd'
import fly from 'flyio'
import { getStreams, getHomeDir } from '../actions/user'
import { connect } from 'react-redux'
import ErrorBoundary from './ErrorBoundary'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        streams: state.userTodo.streams,
        homeDir: state.userTodo.homeDir
    }
}

function StreamRecord(props) {
    const ip = useState('127.0.0.1')
    // const ip = useState('222.73.36.73')

    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getStreams(props.token))
                await props.dispatch(getHomeDir(props.token))
            }
        }
        fetchData()
    }, [])

    const startRecord = async item => {
        await fly
            .get(`http://${ip[0]}:8086/livestreamrecord?app=live&streamname=${item.code}&outputPath=${props.homeDir}/StreamsRecord&fileTemplate=${item.title}_\${RecordingStartTime}_\${SegmentNumber}&action=startRecordingSegmentByDuration`, {}, { headers: { 'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(() => {
                notification.success({
                    message: '开始录制',
                    description: '',
                    duration: 2
                })
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Server Error',
                    duration: 2
                })
            })
    }

    const stopRecord = async item => {
        await fly
            .get(`http://${ip[0]}:8086/livestreamrecord?app=live&streamname=${item.code}&action=stopRecording`, {}, { headers: { 'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(() => {
                notification.success({
                    message: '结束录制',
                    description: '',
                    duration: 2
                })
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Server Error',
                    duration: 2
                })
            })
    }

    if (props.streams.length === 0) {
        return <div><div style={{ textAlign: 'center', margin: '0 auto' }}><h2>当前没有推流</h2></div></div>
    } else {
        return <ErrorBoundary>
            <Fragment>
                <Row gutter={[10, 10]}>
                    {
                        props.streams.map(item => {
                            return <Col xs={24} sm={6} md={6} lg={6} xl={6} xxl={6} key={item._id}>
                                <Tooltip placement='top' title='点击预览' arrowPointAtCenter>
                                    <Card hoverable actions={[<Tooltip placement='top' title='开始录制' arrowPointAtCenter>
                                        <Button type='danger' shape='circle' onClick={() => startRecord(item)}> </Button>
                                    </Tooltip>,
                                    <Tooltip placement='top' title='结束录制' arrowPointAtCenter>
                                        <Button type='danger' style={{ backgroundColor: 'black', borderColor: 'black' }} onClick={() => stopRecord(item)}> </Button>
                                    </Tooltip>]}
                                        cover={<Link to={`/view/${item.code}`}>
                                            <div style={{ background: '#000000', height: 168 }}>
                                                <div style={{ textAlign: 'center', margin: 0 }}>
                                                    <b style={{ color: '#FFFFFF', fontSize: 24 }}>直播预览</b>
                                                </div>
                                            </div>
                                        </Link>}>
                                        <Link to={`/view/${item.code}`}>
                                            <Card.Meta title={item.title} />
                                        </Link>
                                    </Card>
                                </Tooltip>
                            </Col>
                        })
                    }
                </Row>
                <Pagination simple total={props.streams.length} pageSize={8} style={{ textAlign: 'center', margin: '15px auto 0' }} />
            </Fragment>
        </ErrorBoundary>
    }
}

export default connect(mapStateToProps)(StreamRecord)