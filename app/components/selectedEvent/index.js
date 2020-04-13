import React from 'react'
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native'
import {fontScalling} from '../../utils/uiHelper'


const height = Dimensions.get('window').height;

const SelectedEvent = (props) => {

    const { eventname, eventplace, price, eventwidth } = props

    return (

        <View style={styles.container}>
            <Image style={{
                height: height * .13,
                width: height * .13
            }}
                source={require('../../images/event.jpg')}>

            </Image>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: fontScalling(13) }}>{eventname}</Text>
                <Text style={{ fontSize: fontScalling(11), marginTop: 5 }}>{eventplace}</Text>
                <Text style={{ fontSize: fontScalling(10), marginTop: 5 }}>{price}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 5,
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    }
})

export default SelectedEvent