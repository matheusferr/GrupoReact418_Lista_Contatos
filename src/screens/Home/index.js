import React, { PureComponent } from 'react';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import Header from './components/Header';
import ContactList from './components/ContactList';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    //  Executa o método requestPermission assim que o componente for criado;
    this.requestPermission();
  }

  requestPermission = () => {
    //  Solicita a permissão READ_CONTACTS
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then((status) => {
        //  Caso seja negada, solicita novamente (recursão)
        if (status === 'denied') this.requestPermission();
        //  Caso seja concedida, executa o método loadContacts;
        else this.loadContacts();
      });
  }

  formatContacts = (contacts) => {
    //  Constante auxiliar;
    const contactStore = [];
    //  Iterando a lista de contatos
    contacts.forEach(({ recordID, givenName, phoneNumbers }) => {
      //  Convertendo o Array de números de telefone para string;
      const numbers = phoneNumbers.map(({ number }) => number).join(', ');
      //  Adicionando os dados formatados em contactStore;
      contactStore.push({
        id: recordID,
        name: givenName.toLowerCase(),
        numbers,
      });
    });
    //  Retornando os items em ordem alfabética;
    return contactStore.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  loadContacts = (callback) => {
    /*
     *  Parâmetro callback é opicional;
     *  Recebendo todos os contatos (Android);
     *  Recebendo todos os contatos sem suas fotos (iOS);
     */
    Contacts.getAllWithoutPhotos().then((contactList) => {
      //  Recebendo os contatos do estado utilizando desestruturação;
      const {
        contacts,
      } = this.state;
      /*
       *  Verifica se o Array de contatos está vazio (sempre será vazio ao abrir
       *  o app);
       */
      if (!contacts.length) {
        /*
         *  Caso seja vazio, preeche com a lista formatada através do método
         *  formatContacts;
         */
        this.setState({
          contacts: this.formatContacts(contactList),
        });
      } else {
        /*
         *  Caso contacts não estaja vazio, verifica houve alguma alteração na
         *  lista de contatos (nome ou número);
         */
        const isEqual = contactList.every(
          ({ givenName, phoneNumbers }) => contacts.some(
            ({ name, numbers }) => {
              //  Formata os números do contato em string;
              const tempNumber = phoneNumbers.map(({ number }) => number).join(', ');
              return name === givenName && numbers === tempNumber;
            },
          ),
        );
        //  Atualiza a lista de contatos em memória caso sejam diferentes;
        if (!isEqual) {
          this.setState({ contacts: this.formatContacts(contactList) });
        }
      }
    //  Exibe um alerta no console em caso de erro;
    // eslint-disable-next-line no-console
    }).catch(console.log)
      //  Bloco finally sempre é executado;
      .finally(() => {
        //  Executa o parametro callback caso não seja nulo;
        if (callback) callback();
      });
  }

  handleTextChange = (text) => {
    /*
     *  Parâmetro text pode ser tanto string ou GestureResponderEvent;
     *  Atualiza o texto filtro no estado;
     */
    this.setState({
      searchText: typeof text === 'string' ? text.toLowerCase() : '',
    });
  }

  filterContacts = () => {
    //  Extraindo o valor do filtro e os contatos do estado utilizando desestruturação;
    const { searchText, contacts } = this.state;

    /*
     *  Itera todo o Array e retorna um novo Array com os elementos que passarem na condição
     *  definida no primeiro parâmetro;
     *  Condições: Nome deve começar com searchText ou número deve conter searchText;
     *  Retorna um Array filtrado e ordenado alfabéticamente;
    */
    return contacts.filter(
      ({ name, numbers }) => name.startsWith(searchText)
        || numbers.includes(searchText),
    ).sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  handleRefresh = () => {
    //  Alterna o estado refreshing (Flatlist) para true;
    this.setState({ refreshing: true });
    //  Recarrega os contatos e em seguida alterna o estado refreshing para false;
    this.loadContacts(() => this.setState({ refreshing: false }));
  }

  render() {
    const { searchText, contacts, refreshing } = this.state;
    return (
      <>
        <Header
          text={searchText}
          onChangeText={this.handleTextChange}
          onClearPress={this.handleTextChange}
        />
        <ContactList
          contacts={searchText === '' ? contacts : this.filterContacts()}
          onRefresh={this.handleRefresh}
          refreshing={refreshing}
        />
      </>
    );
  }
}
