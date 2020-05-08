import React from 'react'
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'

function Cloud(props) {
    return <ReactPlayer url={`http://dniondirecthls.seei.tv/liveTarget/${props.match.params.id}/index.m3u8`} controls playing muted width='100%' height='100%' />
}

export default withRouter(Cloud)