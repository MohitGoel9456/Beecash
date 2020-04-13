import * as React from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Button,
    ActivityIndicator
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

import {
    TextField,
} from 'react-native-material-textfield';
import { isUserLoggedIn } from '../../actions/loginAction'
import { connect } from 'react-redux'
import * as appConstants from '../../constants/appConstants'
import { fontScalling } from '../../utils/uiHelper'

const Login = (props) => {

    const [value, onChangeText] = React.useState('');
    const [showIndicator, setShowIndicator] = React.useState(false);
    const { isUserLoggedIn } = props
    const [errorMessage, setErrorMessage] = React.useState();

    //save user in database
    const saveUser = (result) => {
        if (result == null) {
            try {
                AsyncStorage.setItem(appConstants.USER_SAVED_EVENTS, JSON.stringify([{ username: value, eventList: [] }]))
                    .then(() => {
                        setShowIndicator(false)
                        isUserLoggedIn(true, value)
                    })
                    .catch((error) => {
                    })
            } catch (error) {
            }
        } else if (!(JSON.parse(result).some(item => item.username === value))) {
            try {

                let savedUsers = JSON.parse(result)
                savedUsers.push({ username: value, eventList: [] })

                AsyncStorage.setItem(appConstants.USER_SAVED_EVENTS, JSON.stringify(savedUsers))
                    .then(() => {
                        isUserLoggedIn(true, value)
                    })
                    .catch((error) => {
                    })
            } catch (error) {
            }
        } else {
            isUserLoggedIn(true, value)
        }

    }

    //get Users from database
    const getUser = () => {
        try {
            AsyncStorage.getItem(appConstants.USER_SAVED_EVENTS)
                .then((result) => {
                    saveUser(result)

                })
                .catch((error) => {
                })
        } catch (e) {
            // error reading value
        }
    }

    const checkUser = () => {
        getUser();
    }

    const login = () => {
        if (value.length > 0) {
            setShowIndicator(true)
            checkUser();
        } else {
            setErrorMessage("Please enter name")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator style={styles.indicator} animating={showIndicator} size="large" color="white" />
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.textColor, { fontSize: fontScalling(40) }]}>{appConstants.WELCOME}</Text>
                <Text style={[styles.textColor, { fontSize: fontScalling(20), marginTop: 10 }]}>{appConstants.DESCRIPTION}</Text>
            </View>
            <View style={styles.input}>
                <TextField
                    label={appConstants.NAME}
                    textColor='white'
                    tintColor='yellow'
                    baseColor='yellow'
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    error={errorMessage}
                />
            </View>
            <View>
                <Button
                    onPress={login}
                    title={appConstants.NEXT}
                    color="yellow" />
            </View>
            <View />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        width: '90%',
    },
    textColor: {
        color: 'yellow'
    },
    indicator: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})

const mapStateToProps = (state) => {
    return ({
        isLoggedIn: state.LoginReducer.isLoggedIn
    })
}

const actionCreators = { isUserLoggedIn }

export default connect(mapStateToProps, actionCreators)(Login)