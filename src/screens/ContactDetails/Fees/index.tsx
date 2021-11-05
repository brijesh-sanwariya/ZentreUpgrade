import React from 'react'
import {
  View,
} from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'

import { Header, LineInfo } from '../../../components'
import { Ic_Back, Colors, Ic_Plus } from '../../../res'

import FeesHeader from './FeeHeader'

interface State {

}

class Fees extends React.Component<any, State> {

  roleName: string
  userInfo: UserInfo
  constructor(props) {
    super(props)

    this.roleName = this.props.route.params.roleName
    this.userInfo = this.props.route.params.userInfo
  }


  _onPostfix = () => {
    this.props.navigation.navigate('CreateInvoice')
  }

  onOutstanding = () => {
    this.props.navigation.navigate('Paying')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          text={'Invoices'}
          prefix={<Ic_Back color={Colors.primary} />}
          onPrefix={() => this.props.navigation.goBack()}
          postfix={<Ic_Plus color={Colors.primary} />}
          onPostfix={this._onPostfix}
        />
        <FeesHeader
          name={this.userInfo.FirstName + ' ' + this.userInfo.LastName}
          avatar={this.userInfo.HeadSculpture}
          email={this.userInfo.Email}
          insertDate={this.userInfo.EnrolmentDate}
        />

        <LineInfo
          prefixText={'Receivable'}
          postfixText={'$2440.00'}
          hasBorder
          prefixTextStyles={{ color: Colors.black, size: 16, font: 'regular' }}
          postfixTextStyles={{ color: Colors.primary, size: 16, font: 'medium' }}
          onClick={() => { }}
        />

        <LineInfo
          prefixText={'Outstanding'}
          postfixText={'$1540.00'}
          hasBorder
          containerStyle={{ marginTop: moderateScale(16) }}
          prefixTextStyles={{ color: Colors.black, size: 16, font: 'regular' }}
          postfixTextStyles={{ color: Colors.red, size: 16, font: 'medium' }}
          onClick={this.onOutstanding}
        />

        <LineInfo
          prefixText={'Deposits'}
          postfixText={'$1540.00'}
          hasBorder
          containerStyle={{ marginTop: moderateScale(16) }}
          prefixTextStyles={{ color: Colors.black, size: 16, font: 'regular' }}
          postfixTextStyles={{ color: Colors.red, size: 16, font: 'medium' }}
          onClick={() => this.props.navigation.navigate('Deposits')}
        />

        <LineInfo
          prefixText={'Recurring Tasks'}
          postfixText={'1 Task'}
          hasBorder
          containerStyle={{ marginTop: moderateScale(16) }}
          prefixTextStyles={{ color: Colors.black, size: 16, font: 'regular' }}
          postfixTextStyles={{ color: Colors.primary, size: 16, font: 'medium' }}
          onClick={this.onOutstanding}
        />
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default Fees