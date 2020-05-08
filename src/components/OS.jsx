import React from 'react'
import { Row, Col, Card, notification } from 'antd'
import fly from 'flyio'
import { connect } from 'react-redux'
import { Chart, registerShape } from '@antv/g2'
import ErrorBoundary from './ErrorBoundary'

function mapStateToProps(state) {
    return {
        token: state.userTodo.token
    }
}

class OS extends React.Component {
    state = {
        cpu: [],
        totalmem: 0,
        freemem: 0,
        diskFree: 0,
        diskUsed: 0,
        cpuUser: 0
    }

    async componentDidMount() {
        if (this.props.token != null) {
            await fly
                .get('/api/os', {}, { headers: { 'authorization': `Bearer ${this.props.token}` } })
                .then(res => {
                    if (res.data.code === 20000) {
                        this.setState({
                            cpu: res.data.cpu,
                            totalmem: res.data.totalmem,
                            freemem: res.data.freemem,
                            diskFree: res.data.diskFree,
                            diskUsed: res.data.diskUsed,
                            cpuUser: res.data.cpuUser
                        })
                    } else {
                        notification.error({
                            message: '获取服务器信息失败',
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
        const chart = new Chart({
            container: 'c1',
            height: 350,
            padding: 'auto',
            autoFit: true
        })
        let cpus = [{
            time: '1分钟',
            load: Number(this.state.cpu[0].toFixed(2))
        }, {
            time: '5分钟',
            load: Number(this.state.cpu[1].toFixed(2))
        }, {
            time: '15分钟',
            load: Number(this.state.cpu[2].toFixed(2))
        }]
        chart.data(cpus)
        chart.scale('sales', {
            nice: true
        })
        chart.interval().position('time*load')
        chart.render()

        // 自定义Shape 部分
        registerShape('point', 'pointer', {
            draw(cfg, group) {
                let center = this.parsePoint({ // 获取极坐标系下画布中心点
                    x: 0,
                    y: 0
                })
                // 绘制指针
                group.addShape('line', {
                    attrs: {
                        x1: center.x,
                        y1: center.y,
                        x2: cfg.x,
                        y2: cfg.y,
                        stroke: cfg.color,
                        lineWidth: 5,
                        lineCap: 'round'
                    }
                })
                return group.addShape('circle', {
                    attrs: {
                        x: center.x,
                        y: center.y,
                        r: 9,
                        stroke: cfg.color,
                        lineWidth: 4,
                        fill: '#fff'
                    }
                })
            }
        })
        let mem = [{
            value: this.state.totalmem - this.state.freemem
        }]
        const char = new Chart({
            container: 'c2',
            autoFit: true,
            height: 350,
            padding: 'auto'
        })
        char.data(mem)
        char.coordinate('polar', {
            startAngle: -9 / 8 * Math.PI,
            endAngle: 1 / 8 * Math.PI,
            radius: 1
        })
        char.scale('value', {
            min: 0,
            max: Math.round(this.state.totalmem),
            tickInterval: 1,
            nice: true
        })
        char.axis('1', false)
        char.axis('value', {
            zIndex: 2,
            line: null,
            label: {
                offset: -36,
                style: {
                    fontSize: 18,
                    textAlign: 'center',
                    textBaseline: 'middle'
                }
            },
            subTickLine: {
                count: 4,
                length: -22,
            },
            tickLine: {
                length: -24,
                stroke: '#fff',
                strokeOpacity: 1
            },
            grid: null
        })
        char.legend(false).point().position('value*1').shape('pointer').color('#1890FF')
        // 绘制仪表盘背景
        char.annotation().arc({
            top: false,
            start: [0, 0.94],
            end: [Math.round(this.state.totalmem), 0.94],
            style: { // 底灰色
                stroke: '#CBCBCB',
                lineWidth: 18
            }
        })
        // 绘制指标
        char.annotation().arc({
            start: [0, 0.94],
            end: [mem[0].value, 0.94],
            style: {
                stroke: '#1890FF',
                lineWidth: 18,
                lineDash: null,
            }
        })
        // 绘制指标数字
        char.annotation().text({
            position: ['50%', '90%'],
            content: `${(this.state.totalmem - this.state.freemem).toFixed(2)}GB`,
            style: {
                fontSize: 20,
                textAlign: 'center'
            }
        })
        char.annotation().text({
            position: ['50%', '90%'],
            content: `${((this.state.totalmem - this.state.freemem) / this.state.totalmem * 100).toFixed(2)}%`,
            style: {
                fontSize: 24,
                textAlign: 'center'
            },
            offsetY: 24
        })
        char.render()

        let disks = [
            { country: '空闲', population: this.state.diskFree },
            { country: '已用', population: this.state.diskUsed }
        ]
        const cha = new Chart({
            container: 'c3',
            autoFit: true,
            height: 350,
            padding: 'auto'
        })
        cha.data(disks)
        cha.scale('sales', {
            nice: true
        })
        cha.axis('country', {
            label: {
                offset: 12
            }
        })
        cha.coordinate().transpose()
        cha.interval().position('country*population')
        cha.render()
    }

    render() {
        return <ErrorBoundary>
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Card>
                        <b>CPU负载(单位：%)，CPU使用率：{`${this.state.cpuUser}%`}</b>
                        <div id='c1' />
                    </Card>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Card>
                        <b>硬盘使用(单位：GB/%)：{`${((this.state.diskUsed / (this.state.diskFree + this.state.diskUsed)) * 100).toFixed(2)}%`}</b>
                        <div id='c3' />
                    </Card>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Card>
                        <b>内存使用(单位：GB/%)</b>
                        <div id='c2' />
                    </Card>
                </Col>
            </Row>
        </ErrorBoundary>
    }
}

export default connect(mapStateToProps)(OS)