import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import base64 from 'base-64'
import axios from 'axios'

import { LoadingController } from './index'


const SCHOOL_ID = '79AF1B80-1983-4CFB-B16A-3EAB3B1DE845'

interface State {
  feeItems: any,
  subsidiesItems: any,
  categoryItems: any,
}

const name = 'invoice';
const initialState: State = {
  feeItems: [],
  subsidiesItems: [],
  categoryItems: null,
}


const _setFeeItems = createAsyncThunk(
  `${name}/_setFeeItems`,
  async (params: {
    item: any,
    deleteItem: any,
  }, { dispatch, getState }) => {
    let state: any = getState();
    var oldData: Array<any> = state.invoiceController.feeItems
    var data: any;
    const filterData: any = oldData.filter(e => e.GoodsID === params.item?.GoodsID)
    if (filterData?.length) {
      for (let i = 0; i < oldData?.length; i++) {
        const element = oldData[i];
        if (element?.GoodsID === params.item?.GoodsID) {
          element.quantity = params.item.quantity
        }
      }

      if (params.deleteItem) {
        var deleteData: any = oldData
        deleteData = deleteData.filter(e => e.GoodsID !== params.item?.GoodsID)
        data = deleteData
      } else {
        data = oldData
      }

    } else {

      data = [...oldData, params.item]
    }
    dispatch(setFeeItems(data))
  }
)

const _setSubsidiesItems = createAsyncThunk(
  `${name}/_setSubsidiesItems`,
  async (params: {
    items: any,
  }, { dispatch }) => {

    // dispatch(setSubsidiesItems([]))
    dispatch(setSubsidiesItems(params.items))
  }
)



const getGoodsSalesSubsidies = createAsyncThunk(
  `${name}/getGoodsSalesSubsidies`,
  async (params: {
    body: any,
    Subsidies: boolean
  }, { dispatch, getState }) => {
    dispatch(LoadingController.setLoading({ loading: true }))

    let state: any = getState()
    let accessToken = state.authController.accessToken
    let idToken = state.authController.idToken;

    const id = idToken.split('.')[1];
    const userId = JSON.parse(base64.decode(id)).sub;
    try {
      console.warn('params.body', params.body);

      //1 = Active 2 = Suspended 3 = Graduated 4 = Withdraw/Resigned 10 = Trial
      let response = await axios.post(
        `https://SGPAY.xsecurepay.com/V1/Fee/GetSales`,
        params.body,
        {
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        }
      )
      const data: any = JSON.parse(response.data.Remark).Sales
      data.forEach(element => {
        element.selected = false
      });
      dispatch(setSubsidiesItems(data))

      dispatch(LoadingController.setLoading({ loading: false }))
      return JSON.parse(response.data.Remark)
    } catch (error) {
      //Handle Error
      console.warn('error', error);
      dispatch(LoadingController.setLoading({ loading: false }))
      return false
    }
  }
)


const createInvoice = createAsyncThunk(
  `${name}/createInvoice`,
  async (params: {
    Name: string,
    Date: any,
    DueDate: any,
    SubTotal: number,
    TotalDiscount: number,
    TotalSubsidy: number,
    TotalTax: number,
    Total: number,
    SubsidyPaid: number,
    AmountPaid: number,
    FeeItems: any,
    PaymentNotice: any,
  }, { dispatch, getState }) => {
    dispatch(LoadingController.setLoading({ loading: true }))

    let state: any = getState();
    let accessToken = state.authController.accessToken;

    let idToken = state.authController.idToken;

    const id = idToken.split('.')[1];
    const userId = JSON.parse(base64.decode(id)).sub;

    let InvoiceID = uuidv4()
    
    try {
      console.warn('params', params);

      let res = await axios.post(
        'https://SGPAY.xsecurepay.com/V1/Fee/Invoices/CreateInvoices',
        {
          "PaymentMethods": [],
          "Invoices": [
            {
              // "InvoiceID": InvoiceID,
              // "PaymentNotice": '7637AA25-8859-4388-9966-617746BE80BC',
              // "IsJsonCurrentID": false,
              // "CurrentID": SCHOOL_ID,
              // "ToUserID": userId,
              // "IsAllowEdit": false,
              // "InvoiceType": 0,
              // "InvoiceName": params.Name,
              // "InvoiceNumber": "",
              // "VoidNumber": "",
              // "Reference": "",
              // "Date": params.Date,
              // "DueDate": params.DueDate,
              // "VoidDateUTC": params.Date,
              // "IsLimitPaymentTime": true,
              // "limitPaymnetTime": 900,
              // "SentToContact": false,
              // "SentToCollection": 0,
              // "IsSubsidy": false,
              // "InvoiceState": 0,
              // "PreStatistics": 0,
              // "IsRestrictedPayment": false,
              // "RestrictedPayment": "",
              // "CurrencyCode": "en-sg",
              // "SubsidyStatus": 0,
              // "SubTotal": params.SubTotal,
              // "TotalDiscount": params.TotalDiscount,
              // "TotalSubsidy": params.TotalSubsidy,
              // "TotalTax": params.TotalTax,
              // "Total": params.Total,
              // "SubsidyPaid": params.SubsidyPaid,
              // "AmountPaid": params.AmountPaid,
              // "IsJson": false,
              // "CreateFrom": "Zentre",
              "InvoiceID": InvoiceID,
              "PaymentNotice": params.PaymentNotice,
              "IsJsonCurrentID": false,
              "CurrentID": SCHOOL_ID,
              "ToUserID": userId,
              "IsAllowEdit": false,
              "InvoiceType": 0,
              "InvoiceName": params.Name,
              "InvoiceNumber": "",
              "VoidNumber": "",
              "Reference": "",
              "Date": params.Date,
              "DueDate": params.DueDate,
              "VoidDateUTC": params.Date,
              "IsLimitPaymentTime": true,
              "limitPaymnetTime": 900,
              "SentToContact": false,
              "SentToCollection": 0,
              "SentToCollectionDateUTC": params.Date,
              "IsSubsidy": false,
              "InvoiceState": 0,
              "PreStatistics": 0,
              "IsRestrictedPayment": false,
              "RestrictedPayment": "",
              "CurrencyCode": "en - sg",
              "SubsidyStatus": 0,
              "SubTotal": params.SubTotal,
              "TotalDiscount": params.TotalDiscount,
              "TotalSubsidy": params.TotalSubsidy,
              "TotalTax": params.TotalTax,
              "Total": params.Total,
              "SubsidyPaid": params.SubsidyPaid,
              "AmountPaid": params.AmountPaid,
              "IsJson": false,
              "CreateFrom": "Zentre",
            }
          ],
          "FeeItems": params.FeeItems,
          "Receipts": []
        },
        {
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        }
      )

      dispatch(LoadingController.setLoading({ loading: false }))
      let data = res.data;
      console.warn('result', data);

      if (data.Code === "201") {
        return { text: data.Remark, success: true }
      } else {
        return { text: data.Remark, success: false }
      }
    } catch (error) {
      //Handle Error
      console.warn('error', error);
      dispatch(LoadingController.setLoading({ loading: false }))
    }
  }
)

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


const {
  actions: {
    setFeeItems,
    setSubsidiesItems,
  },
  reducer,
} = createSlice({
  name,
  initialState,
  reducers: {
    setFeeItems: (state, action: PayloadAction<State>) => {
      let newState = Object.assign({}, state)
      newState.feeItems = action.payload
      return newState
    },
    setSubsidiesItems: (state, action: PayloadAction<State>) => {
      let newState = Object.assign({}, state)
      newState.subsidiesItems = action.payload
      return newState
    },
  },
})

export {
  reducer,
  createInvoice,
  _setFeeItems,
  _setSubsidiesItems,
  getGoodsSalesSubsidies
}