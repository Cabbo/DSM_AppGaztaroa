import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colorGaztaroaOscuro } from '../comun/comun';

export const IndicadorActividad = () => {
    return(
        <View style={styles.indicadorView} >
            <ActivityIndicator size="large" color={colorGaztaroaOscuro} />
            <Text style={styles.indicadorText} >Cargando . . .</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    indicadorView: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center', 
      
    },
    indicadorText: {
      color: colorGaztaroaOscuro,
      fontSize: 14,
      fontWeight: 'bold'
    }
});