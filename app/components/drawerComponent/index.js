import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Image,
    FlatList
} from 'react-native';
import {
    DrawerItem,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeout from 'react-native-swipeout';

import EventItem from '../eventItem'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { isUserLoggedIn } from '../../actions/loginAction'
import * as appConstants from '../../constants/appConstants'
import SelectedEvent from '../selectedEvent'
import { eventAdded } from '../../actions/eventAction'
import notifyMessage from '../toast'

const CustomComponent = (props) => {

    const [selectedEventList, setSelectedEventList] = useState([]);

    const getEventList = () => {
        try {
            AsyncStorage.getItem(appConstants.USER_SAVED_EVENTS)
                .then((result) => {
                    let finalResult = JSON.parse(result)
                    finalResult.map((val, i) => {
                        if (val.username === props.username) {
                            setSelectedEventList(selectedEventList.splice(0, selectedEventList.length))
                            setSelectedEventList(selectedEventList.concat(val.eventList))
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

    const saveEvent = (finalResult) => {
        AsyncStorage.setItem(appConstants.USER_SAVED_EVENTS, JSON.stringify(finalResult))
            .then((result) => {
            })
            .catch((error) => {
                notifyMessage(appConstants.UNEXPECTED_ERROR_OCCURED)
            })
    }

    const saveAfterDrag = (data) => {
        try {
            AsyncStorage.getItem(appConstants.USER_SAVED_EVENTS)
                .then((result) => {
                    let finalResult = JSON.parse(result)
                    finalResult.map((val, i) => {
                        if (val.username === props.username) {

                            finalResult[i].eventList = data
                            saveEvent(finalResult)
                        }
                    })
                })
                .catch((error) => {
                    notifyMessage(appConstants.ADDED_SUCCESSFULLY)

                })
        } catch (e) {
            // error reading value
        }
    }

    const deleteEvent = (event) => {
        try {
            AsyncStorage.getItem(appConstants.USER_SAVED_EVENTS)
                .then((result) => {
                    let finalResult = JSON.parse(result)
                    finalResult.map((val, i) => {
                        if (val.username === props.username) {
                            setSelectedEventList(selectedEventList.splice(0, selectedEventList.length))
                            let eventListArra = val.eventList;
                            let index = eventListArra.findIndex(item => item.id === event.id)
                            eventListArra.splice(index, 1)
                            finalResult[i].eventList = eventListArra

                            saveEvent(finalResult)

                            setSelectedEventList(selectedEventList.concat(eventListArra))
                            notifyMessage(appConstants.DELETED_SUCCESSFULLY)
                        }
                    })
                })
                .catch((error) => {
                    notifyMessage(appConstants.ADDED_SUCCESSFULLY)

                })
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getEventList()
    }, [props.isNewEventAdded])

    const onEventClick = (item) => {
        props.navigation.navigate('EventDetails', {
            item: item,

        })
    }

    const renderItem = ({ item, index, drag, isActive }) => {

        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => { deleteEvent(item) }
        }];

        return (
            <Swipeout right={swipeBtns}
                autoClose='true'
                backgroundColor='transparent'>
                <View style={styles.renderItemStyle}>
                    <TouchableHighlight
                        onPress={() => onEventClick(item)}
                        onLongPress={drag}
                    >
                        <SelectedEvent
                            eventname={item.eventName}
                            eventplace={item.place}
                            price={item.entry}
                        />
                    </TouchableHighlight>
                </View>
            </Swipeout>
        )
    }

    return (
        <DrawerContentScrollView >

            <View
                style={
                    styles.drawerContent}
            >
                <DraggableFlatList
                    data={selectedEventList}
                    keyExtractor={(item, index) => `draggable-item-${item.id}`}
                    onDragEnd={({ data }) => {
                        setSelectedEventList(selectedEventList.splice(0, selectedEventList.length))
                        setSelectedEventList(selectedEventList.concat(data))
                        saveAfterDrag(data)
                    }}
                    renderItem={renderItem}
                />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    renderItemStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return ({
        isLoggedIn: state.LoginReducer.isLoggedIn,
        username: state.LoginReducer.username,
        isNewEventAdded: state.EventReducer.isNewEventAdded
    })
}

const actionCreators = { isUserLoggedIn, eventAdded }

export default connect(mapStateToProps, actionCreators)(CustomComponent)