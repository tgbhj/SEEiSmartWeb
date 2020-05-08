import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'
import fly from 'flyio'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token
    }
}

function View(props) {
    const ip = useState('127.0.0.1')
    // const ip = useState('222.73.36.73')

    useEffect(() => {
        const fetchData = async () => {
            await fly
                .get('/api/viewIp', {
                    code: props.match.params.id
                }, { headers: { 'authorization': `Bearer ${props.token}` } })
                .then(res => {
                    if (res.data.code === 20000) {

                    } else {
                        notification.error({
                            message: '获取失败',
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
        fetchData()
    }, [])

    return <ReactPlayer url={`http://${ip[0]}:1935/live/${props.match.params.id}/playlist.m3u8`} controls playing muted width='100%' height='100%' />
}

export default connect(mapStateToProps)(withRouter(View))