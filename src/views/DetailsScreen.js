import React, { Component } from 'react'
import {ScrollView, View, Text, ActivityIndicator, Button, StyleSheet, Image} from "react-native";
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
        let button, score;
        if (this.props.favorites.find(elem => elem.code === this.props.current.code) === undefined) {
            button = <Button onPress={this.addToFav} style={styles.button} title="Add to favorite"/>
        }
        if (this.props.current.nutrition_grades !== "") {
            score = <Image style={styles.image} source={{uri:`https://static.openfoodfacts.org/images/misc/nutriscore-${this.props.current.nutrition_grades}.png`}}/>
        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: this.props.current.image_url
                        }}
                    />
                    <Text style={styles.title}>{this.props.current.product_name}</Text>
                    <Text style={styles.text}>Marque : {this.props.current.brands}</Text>
                    <Text style={styles.text}>Ingédients : {this.props.current.ingredients_text_fr}</Text>
                    <Text style={styles.title}>Nutrition</Text>
                    <Image style={styles.secondImage} source={{uri:this.props.current.image_nutrition_url}}/>
                    {score}
                    {button}
                </View>

            </ScrollView>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        textAlign: 'left'
    },
    button: {
        marginVertical: 10,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    secondImage: {
      height: 300,
      width: 300,
      resizeMode: 'contain'
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    text: {
        marginVertical: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)