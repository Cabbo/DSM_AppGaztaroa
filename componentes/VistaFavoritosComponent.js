import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList, View, Text, Alert, Pressable } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { borrarFavorito } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        favoritos: state.favoritos,
        excursiones: state.excursiones
    }
}

const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId)),
})

class VistaFavoritos extends Component {
    showAlert = (name, id) => {
        console.log("LongPressed");
        Alert.alert(
            "Borrar excursión favorita?",
            "Confirme que desea borrar la escursión: " + name,
            [
                {
                    text: "Ok",
                    onPress: () => this.props.borrarFavorito(id),
                },
                {
                    text: "Cancelar",
                    onPress: () => console.log(name + ' Favorito no borrado'),
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(name + ' Favorito no borrado'),
            }
        );
    }


    render() {
        const { navigate } = this.props.navigation;
        const renderFavoritoItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: 'Borrar',
                    type: 'delete',
                    onPress: () => this.showAlert(item.nombre, item.id)
                }
            ];

            return (


                <Swipeout right={rightButton} autoClose={true}>
                    <Pressable
                        onLongPress={() => this.showAlert(item.nombre, item.id)}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    >
                        <ListItem
                            key={index}
                            bottomDivider>
                            <Avatar source={{ uri: item.imagen }} />
                            <ListItem.Content>
                                <ListItem.Title>{item.nombre}</ListItem.Title>
                                <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </Pressable >
                </Swipeout>

            );
        };

        return (
            <SafeAreaView >
                <FlatList
                    data={this.props.excursiones.excursiones.filter((item) => this.props.favoritos.includes(item.id))}
                    renderItem={renderFavoritoItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);