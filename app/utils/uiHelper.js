import { Dimensions, Platform } from 'react-native'
import * as screenSize from './screenSize'

export const fontScalling = (fontSize) => {
    //for iphone lesser than 5s version 
    if(screenSize.SCREEN_HEIGHT < 550) {
        return (Platform.OS === 'ios'? fontSize * 0.8: fontSize * 0.95)
    } //iphone 6 / 8 
    else if (screenSize.SCREEN_HEIGHT >= 650 && screenSize.SCREEN_HEIGHT < 700) {
        return (Platform.OS === 'ios'? fontSize: fontSize)
        // iphone SE
    } else if (screenSize.SCREEN_HEIGHT >= 550 && screenSize.SCREEN_HEIGHT < 600) {
        return(Platform.OS === 'ios' ? fontSize * 0.9 : fontSize * 1.1)
    }
    //iphone 6 plus/6s plus/ iphone 7plus / 8plus
    else if (screenSize.SCREEN_HEIGHT >= 700 && screenSize.SCREEN_HEIGHT < 750) {
        return (Platform.OS === 'ios' ?fontSize * 1.11 : fontSize * 1.12)
        // iphone x
    } else if (screenSize.SCREEN_HEIGHT >= 800 && screenSize.SCREEN_HEIGHT < 850) {
        return fontSize 
    }  else if (screenSize.SCREEN_HEIGHT >= 600 && screenSize.SCREEN_HEIGHT < 650) {
        return fontSize
    } else {
        return fontSize
    }
    
}