import React from 'react'
import {
  View,
  ScrollView,
  BackHandler
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { getGoodsSales } from '../../../../utils/store/controllers/fees'
import { _setFeeItems, _setSubsidiesItems, getGoodsSalesSubsidies, createInvoice } from '../../../../utils/store/controllers/invoice'
import { showAlert } from '../../../../utils/store/controllers/alert'
import { t } from '../../../../utils'
import { Header, Text } from '../../../../components'
import { Ic_Back, Colors, Styles, Ic_Plus } from '../../../../res'
const SCHOOL_ID = '79AF1B80-1983-4CFB-B16A-3EAB3B1DE845'

interface State {
  currentPage: string
  pages: string[]
  subsidiesItems: Array<any>
  invoiceTitle: string
  invoiceDate: string
  invoiceDueDate: string
}

import CreateInvoice from './CreateInvoice'
import Items from './Items'
import AddItem from './AddItem'
import Subsides from './Subsides'
import Discount from './Discount'
import { connect } from 'react-redux'
import moment from 'moment'

const pages = {
  createInvoice: "CreateInvoice",
  items: 'Items',
  addItem: 'AddItem',
  subsides: 'Subsides',
  discount: 'Discount'
}

class Create extends React.Component<any, State> {

  scrollViewRef: any
  constructor(props) {
    super(props)

    this.state = {
      currentPage: pages.createInvoice,
      pages: [],
      subsidiesItems: [],
      invoiceTitle: '',
      invoiceDate: '',
      invoiceDueDate: '',
    }
  }

  componentDidMount() {
    this.getItems()
    this.getSubsidiesItems()
    BackHandler.addEventListener("hardwareBackPress", this.onHardwareBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onHardwareBackPress)
  }

  getItems = () => {
    const body = {
      "PageIndex": 1,
      "PageSize": 10,
      "Orderby": "",
      "Groupby": ""
    }
    this.props.getGoodsSales({ body })
  }
  getSubsidiesItems = () => {
    const body = {
      "PageIndex": 1,
      "PageSize": 10,
      "Wheres": [
        {
          "ID": SCHOOL_ID,
          "KeyName": "AccountInfoID",
          "KeyValue": '79AF1B80-1983-4CFB-B16A-3EAB3B1DE845'
        },
        {
          "ID": SCHOOL_ID,
          "KeyName": "CategoryType",
          "KeyValue": 14000000
        }],
      "Orderby": "",
      "Groupby": ""
    }
    this.props.getGoodsSalesSubsidies({ body })
  }

  setFeeItems = (item, deleteItem) => {
    this.props._setFeeItems({ item, deleteItem })
  }

  setSubsidiesItems = (items) => {
    this.setState({ subsidiesItems: items })
  }

  onHardwareBackPress = (): any => {
    let { currentPage } = this.state

    if (currentPage === pages.items || currentPage === pages.subsides) {
      this.scrollViewRef?.scrollTo({ x: 0, y: 0, animated: true })
      setTimeout(() => {
        this.setState({
          currentPage: pages.createInvoice,
          pages: []
        })
      }, 150)

      return true
    } else if (currentPage === pages.addItem || currentPage === pages.discount) {

      this.scrollViewRef?.scrollTo({ x: Styles.WIDTH, y: 0, animated: true })
      setTimeout(() => {
        this.setState({
          currentPage: pages.items
        })
      }, 150)

      return true
    }

    return false
  }

  onBack = () => {
    let { currentPage } = this.state

    if (currentPage === pages.items || currentPage === pages.subsides) {
      this.scrollViewRef?.scrollTo({ x: 0, y: 0, animated: true })
      setTimeout(() => {
        this.setState({
          currentPage: pages.createInvoice,
          pages: []
        })
      }, 150)
    } else if (currentPage === pages.addItem || currentPage === pages.discount) {

      this.scrollViewRef?.scrollTo({ x: Styles.WIDTH, y: 0, animated: true })
      setTimeout(() => {
        this.setState({
          currentPage: pages.items
        })
      }, 150)

    } else {
      this.props.navigation.goBack()
    }
  }

  getHeaderText = () => {
    let { currentPage } = this.state

    if (currentPage === pages.createInvoice) {
      return 'Create Invoice'
    } else if (currentPage === pages.items) {
      return 'Items'
    } else if (currentPage === pages.addItem) {
      return 'Add Item'
    } else if (currentPage === pages.subsides) {
      return 'Add Subsides'
    } else if (currentPage === pages.discount) {
      return 'Discount'
    }

    return ''
  }

  getPostfix = () => {
    let { currentPage } = this.state

    if (currentPage === pages.createInvoice) {
      return (
        <Text
          text={t('create')}
          size={18}
          font={'medium'}
          color={Colors.primary}
        />
      )
    } else if (currentPage === pages.items) {
      return <Ic_Plus color={Colors.primary} />
    } else if (currentPage === pages.addItem) {
      return null
    } else if (currentPage === pages.subsides || currentPage === pages.discount) {
      return (
        <Text
          text={t('add') + (currentPage === pages.subsides ? " (" + this.selectedSubsidies(this.state.subsidiesItems).length + ")" : '')}
          size={18}
          font={'medium'}
          color={Colors.primary}
        />
      )
    }

    return null
  }

   uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  _createInvoice = () => {
    const { invoiceDueDate, invoiceTitle, invoiceDate, subsidiesItems } = this.state;
    const { feeItems } = this.props;
    if (!invoiceDueDate || !invoiceTitle && !invoiceDate) {
      this.props.showAlert({
        show: true,
        title: t('warning'),
        message: t('fillParts')
      })
      return
    }
    else {
      console.warn('feeItems', feeItems);
      var subTotal: number = 0
      var totalDiscount: number = 0
      var totalSubsidy: number = 0
      var totalTax: number = 0
      var subsidyPaid: number = 0
      var amountPaid: number = 0
      const subsidies = this.selectedSubsidies(subsidiesItems)
      subsidies?.forEach(element1 => {
        if (element1) {
          totalSubsidy += Number(element1?.UnitPrice)
        }

      });
      console.warn('feeItems', feeItems);
      const newList: Array<any> = []
      let PaymentNotice = this.uuidv4()
      let ItemID = this.uuidv4()
      feeItems?.forEach(element => {
        if (element) {
          const feeItem = {
            ItemID: ItemID,
            ParentItemID: "",
            SaleID: element.ID,
            PaymentNotice: PaymentNotice,
            Item__Titile: element.Goods_Titile,
            Item__Description: element.Goods_Description,
            Item_CategoryBindingID: element.Sale_CategoryBindingID,
            UnitPrice: element.UnitPrice,
            IsHaveTax: element.IsHaveTax,
            IsTaxIncluded: element.IsTaxIncluded,
            Tate_Type: element.Tate_Type,
            Tate: element.Tate,
            IsSaleLimit: element.IsSaleLimit,
            Item_Quantity: element.quantity,
            Item_UnitOf: element.quantity,
            AccountCode: element.AccountCode,
            COGSAccountCode: element.COGSAccountCode,
            TaxType: element.TaxType,
            Item_SubTotal: element.UnitPrice,
            Item_TotalDiscount: 0,
            Item_TotalSubsidy: 0,
            Item_TotalTax: element.Tate,
            Item_Total: (Number(element.UnitPrice) * Number(element.quantity)),
            Item_Remark: '',
            // Current_Quantity: element.quantity,
            // CustomCodes: element.CustomCodes,
            // Attributes: element.Attributes,
          }
          newList.push(feeItem)

          subTotal += Number(element?.UnitPrice)
          totalTax += Number(element?.Tate)
        }
      });
      var total = (Number(subTotal) + Number(totalTax))
      this.props.createInvoice({
        Name: invoiceTitle,
        Date: moment(invoiceDate).format('YYYY-MM-DD hh:mm:ss'),
        DueDate: moment(invoiceDueDate).format('YYYY-MM-DD hh:mm:ss'),
        SubTotal: Number(subTotal),
        TotalDiscount: Number(totalDiscount),
        TotalSubsidy: Number(totalSubsidy),
        TotalTax: Number(totalTax),
        Total: total,
        SubsidyPaid: subsidyPaid,
        AmountPaid: amountPaid,
        FeeItems: newList,
        PaymentNotice:PaymentNotice
      })
    }
  }

  _onPostfix = () => {
    let { currentPage } = this.state

    if (currentPage === pages.createInvoice) {
      this._createInvoice()
    } else if (currentPage === pages.items) {
      this.setState({
        currentPage: pages.addItem,
      }, () => {
        this.scrollViewRef?.scrollTo({ x: Styles.WIDTH * 2, y: 0, animated: true })
      })
    } else if (currentPage === pages.addItem) {

    } else if (currentPage === pages.subsides) {

    } else if (currentPage === pages.discount) {

    }
  }

  getPage = (page) => {
    if (page === pages.items) {
      return (
        <Items
          setFeeItems={this.setFeeItems}
          feeItems={this.props.feeItems}
          onDiscountItem={this._onDiscountItem}
        />
      )
    } else if (page === pages.addItem) {
      return (
        <AddItem
          setFeeItems={this.setFeeItems}
          allItems={this.props.categoryItems?.Sales}
        />
      )
    } else if (page === pages.subsides) {
      return (
        <Subsides
          setSubsidiesItems={this.setSubsidiesItems}
          subsidiesItems={this.props.subsidiesItems}
        />
      )
    } else if (page === pages.discount) {
      return (
        <Discount />
      )
    }
  }

  _onItems = () => {
    this.setState({
      currentPage: pages.items,
      pages: [pages.items, pages.addItem, pages.discount]
    }, () => {
      this.scrollViewRef?.scrollTo({ x: Styles.WIDTH, y: 0, animated: true })
    })
  }

  _onSubsides = () => {
    this.setState({
      currentPage: pages.subsides,
      pages: [pages.subsides]
    }, () => {
      this.scrollViewRef?.scrollTo({ x: Styles.WIDTH, y: 0, animated: true })
    })
  }

  _onDiscountItem = () => {
    this.setState({
      currentPage: pages.discount,
    }, () => {
      this.scrollViewRef?.scrollTo({ x: Styles.WIDTH * 3, y: 0, animated: true })
    })
  }

  selectedSubsidies = (data: any) => {
    return data?.filter(e => e.selected)
  }

  handleChange = (type: any, value: any) => {
    this.setState(prevState => ({
      ...prevState,
      [type]: value,
    }));
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          text={this.getHeaderText()}
          prefix={<Ic_Back color={Colors.primary} />}
          onPrefix={this.onBack}
          postfix={this.getPostfix()}
          onPostfix={this._onPostfix}
        />

        <ScrollView
          ref={(ref) => { this.scrollViewRef = ref }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}>

          <CreateInvoice
            invoiceTitle={this.state.invoiceTitle}
            invoiceDate={this.state.invoiceDate}
            invoiceDueDate={this.state.invoiceDueDate}
            handleChange={this.handleChange}
            subsidiesItems={this.selectedSubsidies(this.props.subsidiesItems)}
            feeItems={this.props.feeItems}
            onItems={this._onItems}
            onSubsides={this._onSubsides}
          />
          {
            this.state.subsidiesItems && this.state.pages.length > 0 && (
              this.state.pages.map((page, i) => {
                return (
                  <View
                    style={styles.page}
                    key={'page- ' + i}>
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
  page: {
    width: Styles.WIDTH
  }
})

const mapStateToProps = state => {
  return {
    categoryItems: state.feesController.categoryItems,
    subsidiesItems: state.invoiceController.subsidiesItems,
    feeItems: state.invoiceController.feeItems,
  }
}

const mapDispatchToProps = {
  getGoodsSales,
  _setFeeItems,
  _setSubsidiesItems,
  getGoodsSalesSubsidies,
  createInvoice,
  showAlert
}


export default connect(mapStateToProps, mapDispatchToProps)(Create)