import React from 'react'
import {
  View,
  ScrollView,
  Platform
} from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import CheckBox from '@react-native-community/checkbox'

import { Styles, Colors, Ic_Arrow_Down } from '../../../../res'
import { Text } from '../../../../components'

interface Props {

}

const Discount: React.FC<Props> = ({

}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        <View style={styles.titleContainer}>
          <View style={styles.nameContainer}>
            {
              Platform.OS === 'android' ?
                (
                  <CheckBox
                    disabled={false}
                    //value={item.selected}
                    onValueChange={(newValue) => {
                      //setChecked(newValue)
                    }}
                    tintColors={{ true: Colors.primary, false: Colors.primary }}
                  />
                )
                :
                (
                  <CheckBox
                    disabled={false}
                    //value={item.selected}
                    onValueChange={(newValue) => {
                      //setChecked(newValue)
                    }}
                    onCheckColor={Colors.primary}
                    onFillColor={Colors.primary}
                    onTintColor={Colors.primary}
                  />
                )
            }
            <Text
              text={'Sibling Discount'}
              font={'regular'}
              size={16}
              color={Colors.black}
            />
          </View>
          <Text
            text={'10%'}
            font={'regular'}
            size={16}
            color={Colors.black}
          />
        </View>

        <View style={styles.content}>
          <Text
            text={'Other'}
            font={'regular'}
            size={16}
            color={Colors.grey2}
          />
          <Ic_Arrow_Down color={Colors.grey2} />
        </View>

        <View style={styles.separator} />

        {/* ---------------------------------- */}

        <View style={styles.titleContainer}>
          <View style={styles.nameContainer}>
            {
              Platform.OS === 'android' ?
                (
                  <CheckBox
                    disabled={false}
                    //value={item.selected}
                    onValueChange={(newValue) => {
                      //setChecked(newValue)
                    }}
                    tintColors={{ true: Colors.primary, false: Colors.primary }}
                  />
                )
                :
                (
                  <CheckBox
                    disabled={false}
                    //value={item.selected}
                    onValueChange={(newValue) => {
                      //setChecked(newValue)
                    }}
                    onCheckColor={Colors.primary}
                    onFillColor={Colors.primary}
                    onTintColor={Colors.primary}
                  />
                )
            }
            <Text
              text={'Ad-hoc'}
              font={'regular'}
              size={16}
              color={Colors.black}
            />
          </View>
          <Text
            text={'$10'}
            font={'regular'}
            size={16}
            color={Colors.black}
          />
        </View>

        <View style={styles.content}>
          <Text
            text={'Other'}
            font={'regular'}
            size={16}
            color={Colors.grey2}
          />
          <Ic_Arrow_Down color={Colors.grey2} />
        </View>

        <View style={styles.separator} />

        {/* ---------------------------------- */}

        <View style={styles.titleContainer}>
          <View style={styles.nameContainer}>
            {
              Platform.OS === 'android' ?
                (
                  <CheckBox
                    disabled={false}
                    //value={item.selected}
                    onValueChange={(newValue) => {
                      //setChecked(newValue)
                    }}
                    tintColors={{ true: Colors.primary, false: Colors.primary }}
                  />
                )
                :
                (
                  <CheckBox
                    disabled={false}
                    //value={item.selected}
                    onValueChange={(newValue) => {
                      //setChecked(newValue)
                    }}
                    onCheckColor={Colors.primary}
                    onFillColor={Colors.primary}
                    onTintColor={Colors.primary}
                  />
                )
            }
            <Text
              text={'Member Book Discount'}
              font={'regular'}
              size={16}
              color={Colors.black}
            />
          </View>
          <Text
            text={'10%'}
            font={'regular'}
            size={16}
            color={Colors.black}
          />
        </View>

        <View style={styles.content}>
          <Text
            text={'Other'}
            font={'regular'}
            size={16}
            color={Colors.grey2}
          />
          <Ic_Arrow_Down color={Colors.grey2} />
        </View>

        <View style={styles.totalContainer}>
          <Text
            text={'Total Discount'}
            font={'medium'}
            size={16}
            color={Colors.black}

          />
          <Text
            text={'$100'}
            font={'medium'}
            size={16}
            color={Colors.primary}
            contentContainer={{
              marginStart: 24
            }}
          />
        </View>

      </ScrollView>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: Styles.WIDTH,
    paddingTop: '36@ms'
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: Styles.WIDTH - moderateScale(20),
    marginStart: '10@ms',
    height: 1,
    backgroundColor: Colors.black,
    marginTop: '30@ms',
    marginBottom: '12@ms'
  },
  content: {
    width: Styles.WIDTH - moderateScale(20),
    height: '56@ms',
    borderWidth: 1,
    borderRadius: '4@ms',
    borderColor: Colors.grey1,
    marginStart: '10@ms',
    marginTop: '10@ms',
    flexDirection: 'row',
    paddingHorizontal: '10@ms',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalContainer: {
    flexDirection: 'row',
    paddingHorizontal: '10@ms',
    marginTop: '36@ms'
  }
})

export default React.memo(Discount)