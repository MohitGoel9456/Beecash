import React from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native'
import {fontScalling} from '../../utils/uiHelper'

const height = Dimensions.get('window').height;

export default EventItem = (props) => {

    const { eventname, eventplace, price, eventwidth } = props

    return (
        <View style={[styles.container, { width: eventwidth }]}>
            <Image style={[styles.imageStyle,{height: height * .3,}]}
                source={require('../../images/event.jpg')}>

            </Image>
            <Text style={{fontSize:fontScalling(18)}}>{eventname}</Text>
            <Text style={{ fontSize:fontScalling(14) }}>{eventplace}</Text>
            <Text style={{ fontSize:fontScalling(12), marginBottom: 5 }}>{price}</Text>

        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        zIndex: 1
    },
    imageStyle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    }
})