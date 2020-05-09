import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import ErrorBoundary from '../components/ErrorBoundary'
import NavMenu from '../components/NavMenu'
import Head from '../components/Head'
import Back from '../components/Back'
import SignIn from '../components/SignIn'
import Password from '../components/Password'
import Setting from '../components/Setting'
import Admin from '../components/Admin'
import View from '../components/View'
import Cloud from '../components/Cloud'
import Precloud from '../components/Precloud'
import OS from '../components/OS'
import Streams from '../components/Streams'
import Apk from '../components/Apk'
import RecordFiles from '../components/RecordFiles'
import UploadFiles from '../components/UploadFiles'
import Repository from '../components/Repository'
import Camera from '../components/Camera'
import Surveillance from '../components/Surveillance'
import Hit from '../components/Hit'
import NotFound from '../components/NotFound'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        localStorage.getItem('token') ?
            <Component {...props} /> :
            <Redirect to={{
                pathname: '/signIn',
                state: { from: props.location }
            }} />
    } />
)

const Routers = () =>
    <ConfigProvider locale={zhCN}>
        <Router>
            <Layout style={{ width: '100%', height: '100%', position: 'absolute' }}>
                <Layout.Sider breakpoint='lg' collapsedWidth='0'>
                    <ErrorBoundary>
                        <NavMenu />
                    </ErrorBoundary>
                </Layout.Sider>
                <Layout>
                    <Layout.Header style={{ background: '#fff', padding: 0 }}>
                        <ErrorBoundary>
                            <Head />
                        </ErrorBoundary>
                    </Layout.Header>
                    <Layout.Content style={{ margin: 10, padding: 10, background: '#fff', height: '100%' }}>
                        <Switch>
                            <PrivateRoute exact path='/' component={OS} />
                            <Route exact path='/signIn' component={SignIn} />
                            <Route exact path='/password' component={Password} />
                            <PrivateRoute exact path='/admin' component={Admin} />
                            <PrivateRoute exact path='/streams' component={Streams} />
                            <PrivateRoute exact path='/precloud' component={Precloud} />
                            <PrivateRoute exact path='/record' component={RecordFiles} />
                            <PrivateRoute exact path='/setting' component={Setting} />
                            <PrivateRoute exact path='/view/:id' component={View} />
                            <PrivateRoute exact path='/cloud/:id' component={Cloud} />
                            <PrivateRoute exact path='/apk' component={Apk} />
                            <PrivateRoute exact path='/files' component={UploadFiles} />
                            <PrivateRoute exact path='/repository' component={Repository} />
                            <PrivateRoute exact path='/camera' component={Camera} />
                            <PrivateRoute exact path='/surveillance' component={Surveillance} />
                            <PrivateRoute exact path='/hit' component={Hit} />
                            <Route component={NotFound} />
                        </Switch>
                    </Layout.Content>
                    <Back />
                </Layout>
            </Layout>
        </Router>
    </ConfigProvider>

export default Routers