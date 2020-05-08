import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser, getCodes } from '../actions/user'
import { Row, Col, Card, Tooltip, Pagination } from 'antd'
import { Link } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        user: state.userTodo.user,
        codes: state.userTodo.codes
    }
}

function Precloud(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getUser(props.token))
                await props.dispatch(getCodes(props.token))
            }
        }
        fetchData()
    }, [])

    return <Fragment>
        <Row gutter={[10, 10]}>
            {
                props.codes.map(item => {
                    return <Col xs={24} sm={6} md={6} lg={6} xl={6} xxl={6} key={item._id}>
                        <Link to={`/cloud/${item.code.code}`}>
                            <Tooltip placement='top' title='点击预览' arrowPointAtCenter>
                                <Card hoverable
                                    cover={
                                        <div style={{ background: '#000000', height: 168 }}>
                                            <div style={{ textAlign: 'center', margin: 0 }}>
                                                <b style={{ color: '#FFFFFF', fontSize: 24 }}>云直播预览</b>
                                            </div>
                                        </div>
                                    }>
                                    <Card.Meta title={item.code.title} />
                                </Card>
                            </Tooltip>
                        </Link>
                    </Col>
                })
            }
        </Row>
        <Pagination simple total={props.codes.length} pageSize={8} style={{ textAlign: 'center', margin: '15px auto 0' }} />
    </Fragment>
}

export default connect(mapStateToProps)(Precloud)