import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../screens/Home'
import EventDetails from '../../screens/eventDetails'
import Login from '../../screens/login'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../../actions/loginAction'
import CustomComponent from '../../components/drawerComponent'

const AppNavigator = (props) => {

    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();
    const { isUserLoggedIn } = props

    const NavDrawer = () => {
        return (
            <Drawer.Navigator drawerPosition='right'
                drawerContent={props => <CustomComponent {...props} />}>
                <Stack.Screen name="Home" component={MainNavigator} />
            </Drawer.Navigator>
        )
    }

    const AuthNavigator = () => {
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName="Login" >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={NavDrawer} />
            </Stack.Navigator>
        )
    }

    const MainNavigator = () => {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="EventDetails" component={EventDetails} />
            </Stack.Navigator>
        )
    }

    return (
        <NavigationContainer>
            {props.isLoggedIn ? <NavDrawer /> : <AuthNavigator />}
        </NavigationContainer>
    );
}

const mapStateToProps = (state) => {
    return ({
        isLoggedIn: state.LoginReducer.isLoggedIn
    })
}

const actionCreators = { isUserLoggedIn }

export default connect(mapStateToProps, actionCreators)(AppNavigator)