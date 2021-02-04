import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import styles from './styles';

class Contact extends PureComponent {
  constructor(props) {
    super(props);
    //  Cores do ícone;
    this.colors = ['#ED6C03', '#9C28B1', '#BB86FC', '#EA1E63', '#09A056'];
  }

  randomColor = () => {
    /*
     *  Gera um número inteiro entre 0 e this.colors.length (nesse caso, 5);
     *  Intevalo [0, this.colors.length[ ;
     */
    const index = Math.floor(Math.random() * this.colors.length);
    //  Retorna a cor do índice index;
    return this.colors[index];
  }

  render() {
    const { name, numbers } = this.props;
    return (
      <View style={styles.container}>
        <Avatar.Text
          style={{ backgroundColor: this.randomColor() }}
          label={name[0].toUpperCase()}
          size={50}
        />
        <View style={styles.infoContainer}>
          <Text style={[styles.baseText, styles.name]}>
            {name}
          </Text>
          <Text style={[styles.baseText, styles.number]}>
            {numbers}
          </Text>
        </View>
      </View>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  numbers: PropTypes.string.isRequired,
};

export default Contact;
