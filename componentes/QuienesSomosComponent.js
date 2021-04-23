import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { ACTIVIDADES } from '../comun/actividades';
import { HISTORIA } from '../comun/historia';

function Historia(props) {

    const datos = props.datos;

    if (datos != null) {
        return (
            <Card>
                <Card.Title>{datos.nombre}</Card.Title>
                <Card.Divider />
                <Text style={{ margin: 20 }}>
                    {datos.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}


class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES,
            historia: HISTORIA
        };
    }

    render() {

        const renderQuienesSomosItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={require('./imagenes/40Años.png')} />
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

                    <Historia datos={this.state.historia[0]} />

                    {/* No permite con error :
                VirtualizedLists should never be nested inside plain ScrollViews with the same orientation
                 */}

                    <Card>
                        <FlatList
                            // ListHeaderComponent={
                            //     <Historia datos={this.state.historia[0]} />
                            // }
                            data={this.state.actividades}
                            renderItem={renderQuienesSomosItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </SafeAreaView>
            </ScrollView>


        );
    }
}

export default QuienesSomos;