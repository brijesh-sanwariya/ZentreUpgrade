import React from 'react'
import {
  View,
  ScrollView,
  BackHandler
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import { Header, Text } from '../../../../components'
import { Styles, Colors, Ic_Back, Ic_Plus, Ic_Dot3_Vertical } from '../../../../res'
import { showPopup } from '../../../../utils/store/controllers/popup'


interface State {
  currentPage: string
  pages: string[]
}

const pages = {
  fees: 'Fees',
  feeDetails: 'FeeDetails',
  paymentDetails: 'PaymentDetails',
  payment: 'Payment',
  transaction: 'Transaction',
  invoiceDetails: 'InvoiceDetails'
}

import Fees from './Fees'
import FeeDetails from './FeeDetails'
import PaymentDetails from './PaymentDetails'
import Payment from './Payment'
import Transaction from './Transaction'
import InvoiceDetails from './InvoiceDetails'

class Paying extends React.Component<any, State> {

  scrollViewRef: any
  currentPageIndex: number
  constructor(props) {
    super(props)

    this.currentPageIndex = 0

    this.state = {
      currentPage: pages.fees,
      pages: []
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onHardwareBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onHardwareBackPress)
  }

  onHardwareBackPress = (): any => {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex -= 1
      this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
      setTimeout(() => {
        this.currentPageIndex === 0 ?
          this.setState({
            pages: [],
            currentPage: pages.fees
          })
          :
          this.setState({
            currentPage: this.state.pages[this.currentPageIndex - 1]
          })
      }, 150)

      return true
    }

    return false
  }

  _onBack = () => {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex -= 1
      this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
      setTimeout(() => {
        this.currentPageIndex === 0 ?
          this.setState({
            pages: [],
            currentPage: pages.fees
          })
          :
          this.setState({
            currentPage: this.state.pages[this.currentPageIndex - 1]
          })
      }, 150)
    } else {
      this.props.navigation.goBack()
    }
  }

  getPage = (page: string) => {
    if (page === pages.feeDetails) {
      return (
        <FeeDetails />
      )
    } else if (page === pages.paymentDetails) {
      return (
        <PaymentDetails />
      )
    } else if (page === pages.payment) {
      return (
        <Payment />
      )
    } else if (page === pages.transaction) {
      return (
        <Transaction />
      )
    } else if (page === pages.invoiceDetails) {
      return (
        <InvoiceDetails />
      )
    }

    return null
  }

  getHeaderText = () => {
    let { currentPage } = this.state

    if (currentPage === pages.fees) {
      return 'Outstanding'
    } else if (currentPage === pages.feeDetails || currentPage === pages.paymentDetails) {
      return 'Details'
    } else if (currentPage === pages.payment || currentPage === pages.transaction) {
      return 'Payment'
    } else if (currentPage === pages.invoiceDetails) {
      return 'Invoice Details'
    }

    return ''
  }

  getPostfix = () => {
    let { currentPage } = this.state

    if (currentPage === pages.fees) {
      return (<Ic_Plus color={Colors.primary} />)
    } else if (currentPage === pages.feeDetails || currentPage === pages.payment) {
      return (
        <Text
          text={'Pay Now'}
          size={16}
          font={'medium'}
          color={Colors.primary}
        />
      )
    } else if (currentPage === pages.paymentDetails) {
      return (
        <Text
          text={'Next'}
          size={16}
          font={'medium'}
          color={Colors.primary}
        />
      )
    } else if (currentPage === pages.transaction) {
      return (
        <Text
          text={'Close'}
          size={16}
          font={'medium'}
          color={Colors.primary}
        />
      )
    } else if (currentPage === pages.invoiceDetails) {
      return (<Ic_Dot3_Vertical color={Colors.primary} />)
    }

    return null
  }

  _onPostfix = () => {
    let { currentPage } = this.state

    if (currentPage === pages.fees) {
      this.props.navigation.navigate('CreateInvoice')
    } else if (currentPage === pages.feeDetails) {
      this.currentPageIndex += 1;
      this.setState({
        currentPage: pages.paymentDetails
      }, () => {
        this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
      })
    } else if (currentPage === pages.paymentDetails) {
      this.currentPageIndex += 1;
      this.setState({
        currentPage: pages.payment
      }, () => {
        this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
      })
    } else if (currentPage === pages.payment) {
      this.currentPageIndex += 1;
      this.setState({
        currentPage: pages.transaction
      }, () => {
        this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
      })
    } else if (currentPage === pages.invoiceDetails) {
      this._onOptions()
    }
  }

  _onOptions = () => {
    this.props.showPopup(
      {
        show: true,
        position: { x: Styles.WIDTH - 20, y: 36 },
        options: [
          {
            text: 'Pay',
            onClick: () => { this._onPay() }
          },
          {
            text: 'Share',
            onClick: () => { }
          },
          {
            text: 'History',
            onClick: () => { }
          },
          {
            text: 'Void',
            onClick: () => { }
          },
          {
            text: 'Copy',
            onClick: () => { }
          },
        ]
      }
    )
  }

  _onPay = () => {
    this.currentPageIndex += 1
    if (this.currentPageIndex === 1) {
      this.setState({
        pages: [pages.feeDetails, pages.paymentDetails, pages.payment, pages.transaction],
        currentPage: pages.feeDetails
      }, () => {
        this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
      })
    } else {
      this.setState({
        currentPage: pages.feeDetails
      }, () => {
        this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
      })
    }
  }

  _onDetails = () => {
    this.currentPageIndex += 1;
    this.setState({
      pages: [pages.invoiceDetails, pages.feeDetails, pages.paymentDetails, pages.payment, pages.transaction],
      currentPage: pages.invoiceDetails
    }, () => {
      this.scrollViewRef?.scrollTo({ x: this.currentPageIndex * Styles.WIDTH, y: 0, animated: true })
    })
  }

  render() {
    let { pages, currentPage } = this.state

    return (
      <View style={styles.container}>
        <Header
          text={this.getHeaderText()}
          onPrefix={this._onBack}
          prefix={<Ic_Back color={Colors.primary} />}
          postfix={this.getPostfix()}
          onPostfix={this._onPostfix}
        />
        <ScrollView
          ref={(ref) => { this.scrollViewRef = ref }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}>

          <Fees onDetails={this._onDetails} onPay={this._onPay} />
          {
            pages.length > 0 && (
              pages.map((page, i) => {
                return (
                  <View
                    key={'page-' + i}
                    style={styles.pageContainer}>
                    {this.getPage(page)}
                  </View>
                )
              })
            )
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
  pageContainer: {
    width: Styles.WIDTH
  }
})

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = {
  showPopup,
}

export default connect(undefined, mapDispatchToProps)(Paying)