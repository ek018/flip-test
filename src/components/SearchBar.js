import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({searchText, label, openSortModal}) => {
  const changeValue = val => {
    searchText(val);
  };

  const openModal = () => {
    openSortModal();
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={18} color="#CFCFCF" />
      <TextInput
        onChangeText={val => changeValue(val)}
        style={styles.input}
        placeholder={'Cari nama, bank, atau nominal'}
        selectionColor={'#EF6D3B'}
      />
      <TouchableOpacity onPress={() => openModal()}>
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>{label}</Text>
          <Icon name="chevron-down" size={14} color="#EF6D3B" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginLeft: 4,
    flex: 2,
  },
  sortContainer: {
      flexDirection: 'row'
  },
  sortLabel: {
      color: '#EF6D3B', 
      marginRight: 4}
});
