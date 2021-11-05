import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Text } from '../../../components';
import { Colors } from '../../../res';
import { t } from '../../../utils';
import { ScaledSheet } from 'react-native-size-matters';

export default function fileSelector() {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.attachment}>
        <Image
          source={require('../../../res/icons/Thumbnail.png')}
          style={[styles.image, { marginRight: 10 }]}
          resizeMode="contain"
        />
        <Text
          text={t('attachment')}
          color={Colors.primary}
          size={16}
          font={'regular'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.attachment1}>
        <Image
          source={require('../../../res/icons/Camera.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.attachment2}>
        <Image
          source={require('../../../res/icons/Video.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = ScaledSheet.create({
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '15@s',
    marginHorizontal: '10@s',
    flex: 1,
  },
  attachment: {
    borderColor: Colors.grey1,
    borderWidth: 1,
    paddingVertical: '10@vs',
    paddingHorizontal: '10@s',
    flexDirection: 'row',
    flex: 0.7,
  },
  attachment1: {
    borderColor: Colors.grey1,
    borderWidth: 1,
    paddingVertical: '10@vs',
    justifyContent: 'center',
    paddingHorizontal: '10@s',
    flexDirection: 'row',
    flex: 0.1,
  },
  attachment2: {
    borderColor: Colors.grey1,
    borderWidth: 1,
    paddingVertical: '10@vs',
    justifyContent: 'center',
    paddingHorizontal: '10@s',
    flexDirection: 'row',
    flex: 0.1,
  },
  image: {
    height: '20@s',
    width: '20@s',
  },
});
