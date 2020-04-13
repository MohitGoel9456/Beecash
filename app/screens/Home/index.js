import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import EventItem from '../../components/eventItem'
import AsyncStorage from '@react-native-community/async-storage';
import * as appConstants from '../../constants/appConstants'

export default Home = (props) => {

    const [isGridView, setIsGridView] = useState(false)
    const deviceWidth = Dimensions.get('window').width

    const eventDetails = [
        { id: 1, eventName: 'Metallica Concert', place: 'Palace Grounds', entry: 'paid' },
        { id: 2, eventName: 'Saree Exhibition', place: 'Malleswaram Grounds', entry: 'free' },
        { id: 3, eventName: 'Wine tasting event', place: 'Links Brewery', entry: 'paid' },
        { id: 4, eventName: 'Startups Meet', place: 'Kanteerava Indoor Stadium', entry: 'paid' },
        { id: 5, eventName: 'Summer Noon Party', place: 'Kumara Park', entry: 'paid' },
        { id: 6, eventName: 'Rock and Roll nights', place: 'Sarjapur Road', entry: 'paid' },
        { id: 7, eventName: 'Barbecue Fridays', place: 'Whitefield', entry: 'paid' },
        { id: 8, eventName: 'Summer workshop', place: 'Indiranagar', entry: 'free' },
        { id: 9, eventName: 'Impressions & Expressions', place: 'MG Road', entry: 'free' },
        { id: 10, eventName: 'Italian carnival', place: 'Electronic City', entry: 'free' },

    ]

    useEffect(() => {
        AsyncStorage.getItem(appConstants.USER_SAVED_EVENTS)
            .then((value) => {
                user = JSON.parse(value);
            });
    }, [])

    const onGridImageClickEvent = () => {
        setIsGridView(!isGridView)
    }

    const onEventClick = (item) => {
        props.navigation.navigate('EventDetails', {
            item: item,
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.flatListMargin}
                key={isGridView}
                data={eventDetails}
                numColumns={isGridView ? 2 : 1}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onEventClick(item)}>
                        <EventItem
                            eventname={item.eventName}
                            eventplace={item.place}
                            price={item.entry}
                            eventwidth={isGridView ? deviceWidth / 2 - 15 : deviceWidth}
                        />
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.gridImageContainer} onPress={onGridImageClickEvent}>
                <Image style={styles.imageGridView}
                    source={require('../../images/grid_view.jpg')}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center"
    },
    flatListMargin: {
        marginRight: 10
    },
    imageGridView: {
        width: 60,
        height: 60,
        borderRadius: 30,

    },
    gridImageContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    }
})