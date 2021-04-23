import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CONTACTO } from '../comun/datoscontacto';

function RenderContacto(props) {

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

class Contacto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datoscontacto: CONTACTO
        };
    }

    render() {
        //const { excursionId } = this.props.route.params;
        return (<RenderContacto datos={this.state.datoscontacto[0]} />);
    }
}

export default Contacto;