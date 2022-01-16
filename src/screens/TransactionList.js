import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Commons from '././../utils/commons';

import ListItem from '../components/ListItem';
import SearchBar from '../components/SearchBar';
import SortModalBox from '../components/SortModalBox';

const TransactionList = props => {
  const {navigation} = props;
  const refSortModalBox = useRef(null);

  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTemp, setDataTemp] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [sortLabel, setSortLabel] = useState('URUTKAN');

  const dataTransaction =
    dataTemp.length > 0
      ? dataTemp
      : dataTemp.length === 0 && searchText.length > 0
      ? []
      : listData;

  useEffect(() => {
    setIsLoading(true);
    fetch('https://nextar.flip.id/frontend-test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('[TranscationList] data success:', data);
        let dataArr = Object.values(data);
        setListData(dataArr);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('[TranscationList] data Error:', error);
        setIsLoading(false);
      });
  }, []);

  const searchInput = val => {
    setSearchText(val);
    filterDataSearch(val);
  };

  const filterDataSearch = val => {
    let data = [...listData];
    let searchText = val.toLowerCase();
    let filteredData = data.filter(item => {
      return (
        item.beneficiary_name.toLowerCase().match(searchText) ||
        item.beneficiary_bank.toLowerCase().match(searchText) ||
        item.amount.toString().match(val) ||
        item.sender_bank.toLowerCase().match(searchText)
      );
    });
    setDataTemp(filteredData);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchText={val => searchInput(val)}
        label={sortLabel}
        openSortModal={() => refSortModalBox.current.open()}
      />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#EF6D3B" />
        </View>
      ) : dataTransaction.length !== 0 ? (
        <FlatList
          data={dataTransaction}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 25,
          }}
          renderItem={({
            item: {
              id,
              amount,
              status,
              sender_bank,
              beneficiary_bank,
              beneficiary_name,
              created_at,
              remark,
              unique_code,
              account_number,
            },
          }) => (
            <ListItem
              id={id}
              amount={amount}
              status={status}
              sender_bank={sender_bank}
              beneficiary_bank={beneficiary_bank}
              beneficiary_name={beneficiary_name}
              created_at={created_at}
              remark={remark}
              unique_code={unique_code}
              navigation={navigation}
              account_number={account_number}
            />
          )}
        />
      ) : (
        <View style={styles.searchNotFound}>
          <Text style={styles.searchText}>
            {searchText}{' '}
            <Text style={styles.searchDesc}>
              tidak ditemukan. Coba cari nama, nomor rekening, atau nominal
              lain.
            </Text>
          </Text>
        </View>
      )}

      <SortModalBox
        ref={refSortModalBox}
        dataTransaction={listData}
        dataSortTemp={data => setDataTemp(data)}
        sortLabel={val => setSortLabel(val)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F9F8', 
    flex: 1
  },
  searchNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  searchText: {
    fontWeight: 'bold',
  },
  searchDesc: {
    fontWeight: 'normal',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default TransactionList;
