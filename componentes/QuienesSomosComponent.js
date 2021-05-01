import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}


function Historia(props) {

    return (
        <Card>
            <Card.Title>Un poquito de historia</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.{"\n\n"}
                Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.{"\n\n"}
                Gracias!
            </Text>
        </Card>
    );

}


class QuienesSomos extends Component {

    render() {

        const renderQuienesSomosItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={{ uri: baseUrl + './imagenes/40Años.png' }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        return (

            <ScrollView>
                <SafeAreaView>

                    <Historia/>

                    {/* No permite con error :
                VirtualizedLists should never be nested inside plain ScrollViews with the same orientation
                 */}

                    <Card>
                        <FlatList
                            data={this.props.actividades.actividades}
                            renderItem={renderQuienesSomosItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </SafeAreaView>
            </ScrollView>


        );
    }
}

export default connect(mapStateToProps)(QuienesSomos);