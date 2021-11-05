import React from 'react'
import {
  View,
  ScrollView, Keyboard, TouchableOpacity
} from 'react-native'
import { t } from '../../../utils'
import { ScaledSheet } from 'react-native-size-matters'
import { Header, Text } from '../../../components'
import {
  Ic_Setting,
  Colors,
  Ic_Back,
  Ic_Arrow_Right
} from '../../../res'

class Category extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  _onPostfix = () => {
    Keyboard.dismiss()
  }

  _onBack = () => {
    this.props.navigation.goBack()
  }

  _onClickOption = (option) => {
    this.props.navigation.navigate(option.route, { option })
  }
  render() {
    const optionArray = [
      {
        text: t('basic'), route: "AllCategory", value: 11000000
      },
      {
        text: t('discount'), route: "AllCategory", value: 12000000
      },
      {
        text: t('deposit'), route: "AllCategory", value: 13000000
      },
      {
        text: t('subsidy'), route: "AllCategory", value: 14000000
      },
      {
        text: t('wholeDiscount'), route: "AllCategory", value: 12000000
      },
      {
        text: t('Tax'), route: "AllCategory", value: 15000000
      },
    ]
    return (
      <View style={styles.container}>
        <Header
          text={t('category')}
          prefix={<Ic_Back color={Colors.primary} />}
          onPrefix={this._onBack}
        />


        <ScrollView
          style={styles.scrollcontainer}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          pagingEnabled
        >
          {
            optionArray.map((option, i) => (
              <TouchableOpacity
                onPress={() => {
                  this._onClickOption(option)
                }}
                activeOpacity={.7}
                key={'key - ' + i}
                style={styles.optionContainer}>
                <Text
                  text={option.text}
                  font={'regular'}
                  size={16}
                  color={Colors.primary}
                />
                <View style={styles.endContainer}>
                  <Ic_Arrow_Right color={Colors.primary} />
                </View>
              </TouchableOpacity>
            ))
          }

        </ScrollView>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollcontainer: {
    width: '100%',
    paddingHorizontal: '10@ms',
  },
  text: {
    fontSize: 32,
    color: 'black'
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
  endContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})


export default Category;
