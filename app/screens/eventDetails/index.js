import React from 'react'
import {
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../../actions/loginAction'
import { eventAdded } from '../../actions/eventAction'
import * as appConstants from '../../constants/appConstants'
import notifyMessage from '../../components/toast'
import { fontScalling } from '../../utils/uiHelper'


const Event = (props) => {

    const { item } = props.route.params
    const { isUserLoggedIn, eventAdded } = props
    var isAddEvent = false
    const saveEvent = (finalResult) => {
        AsyncStorage.setItem(appConstants.USER_SAVED_EVENTS, JSON.stringify(finalResult))
            .then((result) => {
                if (isAddEvent)
                    notifyMessage(appConstants.ADDED_SUCCESSFULLY)
                isAddEvent = false
            })
            .catch((error) => {
                notifyMessage(appConstants.UNEXPECTED_ERROR_OCCURED)
            })
    }

    const getEventList = () => {
        try {
            AsyncStorage.getItem(appConstants.USER_SAVED_EVENTS)
                .then((result) => {
                    let finalResult = JSON.parse(result)
                    finalResult.map((val, i) => {
                        if (val.username === props.username) {
                            let eventList = val.eventList

                            if (!(eventList.some(event => event.id === item.id))) {
                                eventList.push(item)
                                finalResult[i].eventList = eventList
                                saveEvent(finalResult)
                                eventAdded(false)
                            } else {
                                notifyMessage(appConstants.ALREADY_ADDED)
                            }
                        }
                    })
                })
                .catch((error) => {
                    notifyMessage(appConstants.UNEXPECTED_ERROR_OCCURED)
                })
        } catch (e) {
            // error reading value
        }
    }

    const addToFavouriteClickEvent = () => {
        isAddEvent = true
        getEventList();
        eventAdded(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={{
                flex: .5,
            }}
                source={require('../../images/event.jpg')}>

            </Image>
            <Text style={[styles.textColor,{ fontSize: fontScalling(30)}]}>{item.eventName}</Text>
            <Text style={[styles.textColor, { fontSize: fontScalling(24) }]}>{item.place}</Text>

            <TouchableOpacity style={styles.imageContainer} onPress={addToFavouriteClickEvent}>
                <Image style={styles.imageStyle}
                    source={require('../../images/favourite.png')}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return ({
        isLoggedIn: state.LoginReducer.isLoggedIn,
        username: state.LoginReducer.username
    })

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    imageContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    textColor: {
        color: 'black'
    }
})

const actionCreators = { isUserLoggedIn, eventAdded }

export default connect(mapStateToProps, actionCreators)(Event)