import React from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'

import { Colors, Ic_Arrow_Right } from '../../res'
import { t } from '../../utils'
import { Text } from '../../components'

const optionArray = [
  t('status'),
  t('profile'),
  t('address'),
  t('family'),
  t('attendance'),
  t('fees'),
  t('groups'),
]

interface Props {
  isStaff: boolean,
  onClick: (option) => void
}

function Options({
  onClick,
  isStaff
}: Props) {


  const renderOption = (option, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onClick && onClick(option)
        }}
        activeOpacity={.7}
        key={'key - ' + i}
        style={styles.optionContainer}>
        <Text
          text={option}
          font={'regular'}
          size={16}
          color={Colors.primary}
        />
        <View style={styles.endContainer}>
          <Ic_Arrow_Right color={Colors.primary} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: moderateScale(24) }}
        horizontal={false}
        showsVerticalScrollIndicator={false}>
        {
          optionArray.map((option, i) => {
            if (option === t('family') && isStaff)
              return null
            if (option === t('fees') && isStaff)
              return null

            return renderOption(option, i)
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@ms',
  },
  optionContainer: {
    width: '100%',
    height: '56@ms',
    borderWidth: 1,
    borderColor: Colors.grey2,
    borderRadius: '4@ms',
    paddingHorizontal: '10@ms',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '12@ms'
  },

  buttonContainer: {
    width: '100%',
    height: '56@ms',
    backgroundColor: Colors.grey2,
    borderRadius: moderateScale(10),
    paddingStart: '22@ms',
    paddingEnd: '18@ms',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '6@ms'
  },
  buttonText: {
    fontSize: '18@ms',
    lineHeight: '22@ms',
    color: Colors.black,
    fontFamily: 'MontserratRegular'
  },
  statusText: {
    fontSize: '18@ms',
    lineHeight: '22@ms',
    color: Colors.grey2,
    fontFamily: 'MontserratRegular',
    marginEnd: '20@ms'
  },
  endContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default React.memo(Options)