import React from 'react'
import {
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native'


const notifyMessage = (msg) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
        alert(msg);
    }
}

export default notifyMessage;