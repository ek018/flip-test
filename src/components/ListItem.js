import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Commons from '../utils/commons';

const ListItem = ({
  id,
  amount,
  status,
  sender_bank,
  beneficiary_bank,
  beneficiary_name,
  created_at,
  remark,
  unique_code,
  navigation,
  account_number,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TransactionDetail', {
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
          })
        }>
        <View style={styles.container}>
          <View
            style={[
              styles.leftContainer,
              {
                borderColor: status === 'SUCCESS' ? '#52B885' : '#EF6D3B',
                backgroundColor: status === 'SUCCESS' ? '#52B885' : '#EF6D3B',
              },
            ]}
          />
          <View style={styles.mainContainer}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>
                  {Commons.capitalized(sender_bank)}
                </Text>
                <Text style={styles.text}>&#8594;</Text>
                <Text style={styles.text}>
                  {Commons.capitalized(beneficiary_bank)}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                {/* {status !== 'SUCCESS' && <Text>-</Text>} */}
                <Text style={styles.name}>{beneficiary_name.toUpperCase()}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>{Commons.convertToRupiah(amount)}</Text>
                <Text style={{fontWeight: 'bold', marginHorizontal: 2}}>
                  &bull;
                </Text>
                <Text>{Commons.formatDate(created_at)}</Text>
              </View>
            </View>
            <View
              style={styles.containerBox}>
              <View
                style={[
                  styles.statusBox,
                  {
                    borderColor: status === 'SUCCESS' ? '#52B885' : '#EF6D3B',
                    backgroundColor:
                      status === 'SUCCESS' ? '#52B885' : 'transparent',
                  },
                ]}>
                <Text
                  style={[
                    styles.textBox,
                    {
                      color: status === 'SUCCESS' ? '#FFFFFF' : '#000000',
                    },
                  ]}>
                  {status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
    flex: 1,
  },
  leftContainer: {
    marginLeft: 8,
    borderWidth: 3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  mainContainer: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginRight: 8,
    borderLeftColor: 'transparent',
    flex: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontWeight: 'bold',
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBox: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textBox: {
    fontWeight: 'bold',
  },
  name: {
      marginVertical: 4
  }
});
