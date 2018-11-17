import { StyleSheet, Dimensions, Platform } from 'react-native'

export const purple = '#393099'
export const yellow = '#F6D548'
export const pink = '#EC0A42'
export const eletricBlue = '#001936'
export const white = '#EBEDF0'
export const green = '#23C965'

export const buttonBgColor = {
    pink : purple,
    purple: yellow,
    yellow: pink,

    text: {
        pink : white,
        purple: pink,
        yellow: white,
    }
}
const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};


export const sharedStyles = StyleSheet.create({

    padding: {
        padding: 20,
    },

    subject: {
        color: white,
    },

    callToAction: {
        borderRadius: 40,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: 'center',
        backgroundColor: pink,
        justifyContent: "space-between",
        flexDirection: 'row',
    },

    callToActionText: {
        color: white,
        fontSize: 18,
        fontWeight: 'bold'
    },

    buttonTool: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: white,
    },

    pink: {
       backgroundColor: pink,
    },

    purple: {
       backgroundColor: purple,
    },

    yellow: {
       backgroundColor: yellow
    },

    shadow: {
        position: 'absolute',
        height: 100,
        borderRadius: 12,
    },

    firstShadow: {
        width: '96%',
        left: '2%',
        bottom: -5,
        opacity: 0.6
    },

    lastShadow: {
        width: '92%',
        left: '4%',
        bottom: -10,
        opacity: 0.4
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    header: {
        position: 'relative',
        zIndex: 3,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'flex-end',
        backgroundColor: purple,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: eletricBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
    },


    headerButtonText: {
        color: white,
        fontSize: 18,
        fontWeight: 'bold'
    },


});


const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
