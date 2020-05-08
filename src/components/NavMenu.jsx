import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { TeamOutlined, HomeOutlined, VideoCameraOutlined, PlaySquareOutlined, FileOutlined, CloudOutlined, SettingOutlined, KeyOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getUser } from '../actions/user'
import { navCurrent } from '../actions/ui'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        user: state.userTodo.user,
        current: state.uiTodo.current
    }
}

function NavMenu(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getUser(props.token))
            }
        }
        fetchData()
    }, [])

    const handleClick = async e => {
        await props.dispatch(navCurrent(e.key))
    }

    const Greeting = () => {
        if (props.user.admin == 2) {
            return <Menu.Item key='a1'>
                <Link to='/admin'>
                    <TeamOutlined />用户管理
                </Link>
            </Menu.Item>
        }
    }

    return <Fragment>
        <div style={{ height: 32, margin: 16 }}>
            <div style={{ textAlign: 'center', margin: '0 auto' }}>
                <b style={{ fontSize: 18, color: '#FFFFFF' }}>SEEiSmart</b>
            </div>
        </div>
        <Menu theme='dark' mode='inline' selectedKeys={[props.current]} onClick={handleClick}>
            <Menu.Item key='home'>
                <Link to='/'>
                    <HomeOutlined />首页
                </Link>
            </Menu.Item>
            {Greeting()}
            <Menu.Item key='streams'>
                <Link to='/streams'>
                    <VideoCameraOutlined />推流管理
                </Link>
            </Menu.Item>
            <Menu.Item key='record'>
                <Link to='/record'>
                    <PlaySquareOutlined />录像管理
                </Link>
            </Menu.Item>
            <Menu.Item key='files'>
                <Link to='/files'>
                    <FileOutlined />上传文件管理
                </Link>
            </Menu.Item>
            <Menu.Item key='u2'>
                <Link to='/precloud'>
                    <CloudOutlined />云直播预览
                </Link>
            </Menu.Item>
            <Menu.Item key='u3'>
                <Link to='/setting'>
                    <SettingOutlined />子账号管理
                </Link>
            </Menu.Item>
            <Menu.Item key='s2'>
                <Link to='/password'>
                    <KeyOutlined />修改密码
                </Link>
            </Menu.Item>
            <Menu.SubMenu key='ai' title='AI人脸识别'>
                <Menu.Item key='ai-1'>
                    <Link to='/repository' />人像库
                </Menu.Item>
                <Menu.Item key='ai-2'>
                    <Link to='/camera' />直播流
                </Menu.Item>
                <Menu.Item key='ai-3'>
                    <Link to='/surveillance' />布控
                </Menu.Item>
                <Menu.Item key='ai-4'>
                    <Link to='/hit' />报警
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    </Fragment>
}

export default connect(mapStateToProps)(NavMenu)