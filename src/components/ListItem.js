import React from 'react';
import {Text, View, TouchableOpacity} from "react-native";
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
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{props.item.product_name}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)
