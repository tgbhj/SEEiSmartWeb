import React, { useEffect } from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getUser } from '../actions/user'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        user: state.userTodo.user
    }
}

function Head(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getUser(props.token))
            }
        }
        fetchData()
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return <div style={{ position: 'relative', width: '100%', height: 64, margin: '0 auto' }}>
        <Dropdown overlay={<Menu>
            <Menu.Item key='1'>
                <Button type='link' onClick={logout} icon={<LogoutOutlined />}>退出登录</Button>
            </Menu.Item>
        </Menu>}>
            <Button style={{ position: 'absolute', top: 0, right: 0, width: 'auto', height: 64, borderColor: '#ffffff' }}>
                <UserOutlined />{props.user.username}
            </Button>
        </Dropdown>
    </div>
}

export default connect(mapStateToProps)(Head)