import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class Header extends PureComponent {
  render() {
    const { text, onChangeText, onClearPress } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <Icon name="magnify" color="#FFF" size={28} />
          <TextInput
            style={styles.textInput}
            placeholder="Pesquisar contatos"
            placeholderTextColor="grey"
            value={text}
            onChangeText={onChangeText}
          />
          {
            text !== '' && (
              <Pressable
                onPress={onClearPress}
              >
                <Icon name="window-close" color="#FFF" size={20} />
              </Pressable>
            )
          }
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearPress: PropTypes.func.isRequired,
};

export default Header;
