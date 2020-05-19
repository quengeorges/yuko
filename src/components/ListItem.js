import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {setCurrent} from "../../store/reducer/ProductReducer";
import {connect} from "react-redux";

const ListItem = (props) => {
    const navigation = useNavigation();
    const onPress = () => {
        props.setCurrent(props.item);
        navigation.navigate('Details')
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image source={{uri:props.item.image_small_url}} style={styles.image}/>
                <Text style={styles.title}>{props.item.product_name}</Text>
            </TouchableOpacity>
        </View>
    )
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    setCurrent
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical: 2,
        padding:10,
        backgroundColor: '#DDD',
        borderRadius: 5,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)
