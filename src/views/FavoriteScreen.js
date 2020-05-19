import React, { Component } from 'react'
import { FlatList } from "react-native";
import { connect } from 'react-redux';
import ListItem from "../components/ListItem";

class FavoriteScreen extends Component {
    renderItem = ({ item }) => (
        <ListItem item={item}/>
    );

    render() {
        const { favorites } = this.props;
        return (
            <FlatList
                data={favorites}
                renderItem={this.renderItem}
                keyExtractor={item => item.code}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites
    };
};

export default connect(mapStateToProps)(FavoriteScreen)