import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'

import { Styles, Colors, Ic_Arrow_Right } from '../../../../res'
import { Text, LineInfo } from '../../../../components'

interface Props {

}

const InvoiceDetails: React.FC<Props> = ({

}) => {


  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{
          paddingBottom: 30
        }}
        showsVerticalScrollIndicator={false}>
        <LineInfo
          containerStyle={{ marginVertical: 16 }}
          prefixText={'Excursion Fee'}
          prefixTextStyles={{ size: 22, color: Colors.black, font: 'medium' }}
          postfixText={'$90.00'}
          postfixTextStyles={{ size: 22, color: Colors.primary, font: 'medium' }}
        />

        <LineInfo
          hasUnderLine
          prefixText={'Invoice Number'}
          prefixTextStyles={{ size: 16, color: Colors.grey2, font: 'regular' }}
          postfixText={'P1210929'}
          postfixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
        />

        <LineInfo
          hasUnderLine
          prefixText={'Invoice Date'}
          prefixTextStyles={{ size: 16, color: Colors.grey2, font: 'regular' }}
          postfixText={'31 Mar, 2020'}
          postfixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
        />

        <LineInfo
          prefixText={'Due Date'}
          prefixTextStyles={{ size: 16, color: Colors.grey2, font: 'regular' }}
          postfixText={'31 Mar, 2020'}
          postfixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
        />
        <View style={styles.separator} />

        <View style={styles.infoContainer}>
          <View style={{}}>
            <Text
              text={'Excursion (x1)'}
              size={16}
              font={'regular'}
              color={Colors.black}
            />

            <View style={styles.discContainer}>
              <Text
                text={'Disc: $2.00'}
                size={12}
                font={'regular'}
                color={Colors.grey2}
              />
              <Text
                text={'Tax: $1.00'}
                size={12}
                font={'regular'}
                color={Colors.grey2}
                contentContainer={{
                  marginStart: 12,
                  marginTop: 6
                }}
              />
            </View>
          </View>

          <Text
            text={'$80.00'}
            size={16}
            font={'medium'}
            color={Colors.primary}
          />
        </View>


        <View style={[styles.infoContainer, {
          marginTop: 12,
          marginBottom: 36
        }]}>
          <View style={{}}>
            <Text
              text={'Materials (x1)'}
              size={16}
              font={'regular'}
              color={Colors.black}
            />

            <View style={styles.discContainer}>
              <Text
                text={'Disc: $2.00'}
                size={12}
                font={'regular'}
                color={Colors.grey2}
              />
              <Text
                text={'Tax: $1.00'}
                size={12}
                font={'regular'}
                color={Colors.grey2}
                contentContainer={{
                  marginStart: 12,
                  marginTop: 6
                }}
              />
            </View>
          </View>

          <Text
            text={'$20.00'}
            size={16}
            font={'medium'}
            color={Colors.primary}
          />
        </View>

        <LineInfo
          hasUnderLine
          prefixText={'Total'}
          prefixTextStyles={{ size: 16, color: Colors.grey2, font: 'regular' }}
          postfixText={'$100.00'}
          postfixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
        />
        <LineInfo
          hasUnderLine
          prefixText={'Tax'}
          prefixTextStyles={{ size: 16, color: Colors.grey2, font: 'regular' }}
          postfixText={'$2.00'}
          postfixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
        />
        <LineInfo
          hasUnderLine
          prefixText={'Discount'}
          prefixTextStyles={{ size: 16, color: Colors.grey2, font: 'regular' }}
          postfixText={'$4.00'}
          postfixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
        />
        <LineInfo
          hasUnderLine
          prefixText={'Subsidy/Grants'}
          prefixTextStyles={{ size: 16, color: Colors.grey2, font: 'regular' }}
          postfixText={'$4.00'}
          postfixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
        />
        <LineInfo
          prefixText={'Net payable'}
          prefixTextStyles={{ size: 16, color: Colors.black, font: 'regular' }}
          postfixText={'$90.00'}
          postfixTextStyles={{ size: 16, color: Colors.primary, font: 'medium' }}
        />
      </ScrollView>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: Styles.WIDTH,
  },
  separator: {
    width: Styles.WIDTH - moderateScale(20),
    height: 1,
    backgroundColor: Colors.black,
    marginVertical: '40@ms',
    marginStart: '10@ms'
  },
  infoContainer: {
    width: Styles.WIDTH - moderateScale(20),
    padding: '10@ms',
    borderWidth: 1,
    borderColor: Colors.grey1,
    borderRadius: '4@ms',
    marginStart: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  discContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default React.memo(InvoiceDetails)
