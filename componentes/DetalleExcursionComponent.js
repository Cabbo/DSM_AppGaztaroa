import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl, colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { Rating, Input } from 'react-native-elements';



const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
    comentario: state.comentario
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (comentario) => dispatch(postComentario(comentario))
})


function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {

    return (
      <Card>
        <Card.Image source={{ uri: excursion.imagen }}>
          <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
        </Card.Image>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <View style={styles.iconsStyle}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name={'pencil'}
            type='font-awesome'
            color={colorGaztaroaOscuro}
            onPress={() => { props.toggle() }}
          />
          <Icon
            raised
            reverse
            name={'share-alt'}
            type='font-awesome'
            color={'#EF7F1A'}
            onPress={() => {
              try {
                Share.share({
                  title: 'Compartir',
                  message: 'Participo en la próxima excursión a ' + excursion.nombre + ' | Apúntate en la App Gaztaroa! link.to.app',
                });
              } catch (error) {
                alert(error.message);
              }
            }}
          />
        </View>
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;

  const renderCommentarioItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios}
        renderItem={renderCommentarioItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}


class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      valoracion: 3,
      autor: "",
      comentario: "",
    }
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false,
      valoracion: 3,
      autor: "",
      comentario: "",
    });
  }
  gestionarComentario(excursionId) {
    let comentario = new Object();
    comentario.excursionId = excursionId;
    comentario.valoracion = this.state.valoracion;
    comentario.autor = this.state.autor;
    comentario.comentario = this.state.comentario;
    comentario.dia = new Date();//dia
    //comentario.id = this.state.comentarios.length;
    this.props.postComentario(comentario);
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          toggle={() => this.toggleModal()}
        />
        <Modal animationType={"slide"} transparent={false}
          visible={this.state.showModal}
          onDismiss={() => { this.toggleModal(); this.resetForm(); }}
          onRequestClose={() => { this.toggleModal(); this.resetForm(); }}>
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={3}
              type='custom'
              ratingColor='#f1e60f'
              ratingBackgroundColor='white'
              // tintColor='#fff1e60f'
              onFinishRating={rating => this.setState({ valoracion: rating })}
            />
            <Input
              placeholder=' Autor'
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              onChangeText={value => this.setState({ autor: value })}
            />
            <Input
              placeholder=' Comentario'
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={value => this.setState({ comentario: value })}
            />
            <Button
              onPress={() => { this.gestionarComentario(excursionId); this.toggleModal(); this.resetForm(); }}
              color={colorGaztaroaOscuro}
              title="Enviar"
            />
            <Button
              onPress={() => { this.toggleModal(); this.resetForm(); }}
              color={colorGaztaroaOscuro}
              title="Cancelar"
            />
          </View>
        </Modal>
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  iconsStyle: {
    flexDirection: "row",
    justifyContent: "center"

  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  // ratingCard: {
  //   backgroundColor: '#ffffff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 50,
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);