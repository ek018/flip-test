import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';


import Commons from '../utils/commons';

const TransactionDetail = ({route}) => {
  const {
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
  } = route.params;

  const [openDetail, setOpenDetail] = useState(false);

  const openDetailText = openDetail ? 'Tutup' : 'Buka';

  const copyToClipboard = () => {
    Clipboard.setString(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={[styles.title, {marginRight: 8}]}>
          ID TRANSAKSI: #{id}
        </Text>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Icon name="copy" size={18} color="#EF6D3B" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{fontWeight: 'bold'}}>DETAIL TRANSAKSI</Text>
        <TouchableOpacity onPress={() => setOpenDetail(!openDetail)}>
          <Text style={{color: '#EF6D3B'}}>{openDetailText}</Text>
        </TouchableOpacity>
      </View>
      {openDetail ? (
        <View style={styles.collapseContainer}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.titleDetail}>
                {Commons.capitalized(sender_bank)}
              </Text>
              <Text style={styles.titleDetail}>&#8594;</Text>
              <Text style={styles.titleDetail}>
                {Commons.capitalized(beneficiary_bank)}
              </Text>
            </View>
            <View
              style={styles.detailRow}>
              <View style={{flex: 2}}>
                <Text style={[styles.title, {marginBottom: 8}]}>
                  {/* {status !== 'SUCCESS' && <Text>-</Text>} */}
                  {beneficiary_name.toUpperCase()}
                </Text>
                <Text>{account_number}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.title, {marginBottom: 8}]}>NOMINAL</Text>
                <Text>{Commons.convertToRupiah(amount)}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={{flex: 2}}>
                <Text style={[styles.title, {marginBottom: 8}]}>
                  BERITA TRANSFER
                </Text>
                <Text>{remark}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.title, {marginBottom: 8}]}>KODE UNIK</Text>
                <Text>{unique_code}</Text>
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text style={[styles.title, {marginBottom: 8}]}>
                WAKTU DIBUAT
              </Text>
              <Text>{Commons.formatDate(created_at)}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F9F8',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: '#F9F9F9',
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  collapseContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleDetail: {
    fontWeight: '800',
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
});
