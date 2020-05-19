import React, { Component } from 'react'
import { FlatList } from "react-native";
import { connect } from 'react-redux';
import ListItem from "../components/ListItem";

class ListScreen extends Component {

    renderItem = ({ item }) => (
        <ListItem item={item}/>
    );

    render() {
        const { allProducts } = this.props;
        return (
            <FlatList
                data={allProducts}
                renderItem={this.renderItem}
                keyExtractor={item => item.code}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        allProducts: state.allProducts
    };
};

export default connect(mapStateToProps)(ListScreen)