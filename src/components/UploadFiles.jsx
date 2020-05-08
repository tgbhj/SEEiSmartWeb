import React, { useEffect } from 'react'
import { Button, Popconfirm, Tooltip, notification, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getUploadFiles, getHomeDir } from '../actions/user'
import fly from 'flyio'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token,
        uploadFiles: state.userTodo.uploadFiles,
        homeDir: state.userTodo.homeDir
    }
}

function UploadFiles(props) {
    useEffect(() => {
        const fetchData = async () => {
            if (props.token != null) {
                await props.dispatch(getUploadFiles(props.token))
                await props.dispatch(getHomeDir(props.token))
            }
        }
        fetchData()
    }, [])

    const handleDelete = async item => {
        await fly
            .post('/api/uploadFiles', {
                name: item.name
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

    return <List dataSource={props.uploadFiles} header={<b>已上传文件</b>}
        pagination={{ simple: true, total: props.uploadFiles.length, pageSize: 5 }}
        renderItem={item =>
            <List.Item actions={[<Popconfirm title='确认删除' cancelText='取消' okText='确定' onConfirm={() => handleDelete(item)}>
                <Tooltip placement='bottom' title='删除' arrowPointAtCenter>
                    <Button type='danger' icon={<DeleteOutlined />} size='small' />
                </Tooltip>
            </Popconfirm>]}>
                {item.path}{item.name}
            </List.Item>
        } />
}

export default connect(mapStateToProps)(UploadFiles)