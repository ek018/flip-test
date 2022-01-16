import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Commons from '../utils/commons';


class SortModalBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sortLabel: 'URUTKAN',
      sortData: [
        {id: 1, label: 'URUTKAN', value: 'sort'},
        {id: 2, label: 'Nama A-Z', value: 'nameAsc'},
        {id: 3, label: 'Nama Z-A', value: 'nameDesc'},
        {id: 4, label: 'Tanggal Terbaru', value: 'dateAsc'},
        {id: 5, label: 'Tanggal Terlama', value: 'dateDesc'},
      ],
    };
  }
  sortingData = (value, label) => {
    const {dataTransaction} = this.props;
    let data = [...dataTransaction];
    let hasLeading = s => /^\S+\s\S+\s\S+$/.test(s);

    data.sort((a, b) => {
      if (value === 'nameAsc') {
        return (
          hasLeading(b.beneficiary_name.toUpperCase()) -
            hasLeading(a.beneficiary_name.toUpperCase()) ||
          a.beneficiary_name.toUpperCase() > b.beneficiary_name.toUpperCase() ||
          -(a.beneficiary_name.toUpperCase() < b.beneficiary_name.toUpperCase())
        );
      } else if (value === 'nameDesc') {
        return (
          hasLeading(a.beneficiary_name.toUpperCase()) -
            hasLeading(b.beneficiary_name.toUpperCase()) ||
          a.beneficiary_name.toUpperCase() < b.beneficiary_name.toUpperCase() ||
          -(a.beneficiary_name.toUpperCase() > b.beneficiary_name.toUpperCase())
        );
      } else if (value === 'dateAsc') {
        // return new Date(b.created_at) - new Date(a.created_at);
        return Commons.jsCoreDateCreator(b.created_at) - Commons.jsCoreDateCreator(a.created_at);
      } else if (value === 'dateDesc') {
        // return new Date(a.created_at) - new Date(b.created_at);
        return Commons.jsCoreDateCreator(a.created_at) - Commons.jsCoreDateCreator(b.created_at);

      } else {
        return 0;
      }
    });

    // setDataTemp(data);

    this.props.dataSortTemp(data);
    this.props.sortLabel(label);
    this.setState({modalVisible: false, sortLabel: label});
  };

  open = () => {
    this.setState({modalVisible: true});
  };

  close = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const {modalVisible, sortData, sortLabel} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // style={{backgroundColor: "red"}}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <KeyboardAvoidingView
          enabled={Platform.OS === 'ios'}
          behavior="padding"
          style={styles.wrapper}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({modalVisible: false})}>
            <View style={styles.container}>
              <View style={styles.modalContainer}>
                {sortData.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => this.sortingData(item.value, item.label)}>
                    <View style={styles.itemContainer}>
                      {item.label === sortLabel ? (
                        <Icon name="dot-circle-o" size={14} color="#EF6D3B" />
                      ) : (
                        <Icon name="circle-o" size={14} color="#EF6D3B" />
                      )}
                      <Text style={styles.text}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

export default SortModalBox;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00000077',
    // backgroundColor: "#171717"
  },
  text: {
    fontWeight: '400',
    marginLeft: 8,
    fontSize: 14,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: 300,
    height: 260,
    borderRadius: 4,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 12,
  },
});
