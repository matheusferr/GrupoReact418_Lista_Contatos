import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Contact from './components/Contact';
import styles from './styles';

class ContactList extends PureComponent {
  //  Extrai as chaves dos items;
  keyExtractor = ({ id }) => id

  //  Componente a ser renderizado por item;
  renderItem = ({ item }) => (
    <Contact name={item.name} numbers={item.numbers} />
  )

  render() {
    const { contacts, onRefresh, refreshing } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={contacts}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      numbers: PropTypes.string,
    }),
  ).isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
};

export default ContactList;
