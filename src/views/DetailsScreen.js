import React, { Component } from 'react'
import {View, Text, ActivityIndicator, Button} from "react-native";
import { connect } from 'react-redux'
import {addFavorite, addProduct, setCurrent} from "../../store/reducer/ProductReducer";

class DetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            item: {}
        };
        this.addToFav = this.addToFav.bind(this)
    }

    async componentDidMount() {
        let code;
        if(this.props.route.params !== undefined) {
            code = this.props.route.params.code;
        }
        if (code !== undefined) {
            return fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 1) {
                        this.setState({
                            isLoading: false,
                            item: data.product
                        });
                        this.props.addProduct(data.product);
                        this.props.setCurrent(data.product);
                    } else {
                        alert('Product cannot be found !');
                        this.props.navigation.navigate('Home')
                    }

                })
                .catch((e) => {
                    console.error(e)
                })
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    addToFav = () => {
        this.props.addFavorite(this.props.current)
    };
    render() {
        let button;
        if (this.props.favorites.find(elem => elem.code === this.props.current.code) === undefined) {
            button = <Button onPress={this.addToFav}
                                title="Add to favorite"
                                color="#841584" />
        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View>
                <Text>{this.props.current.product_name}</Text>
                {button}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites,
        current: state.current
    };
};

const mapDispatchToProps = {
    addProduct,
    addFavorite,
    setCurrent
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)