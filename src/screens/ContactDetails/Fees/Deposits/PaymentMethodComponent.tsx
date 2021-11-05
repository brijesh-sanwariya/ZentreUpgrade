import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

import { Colors, Ic_Arrow_Down, } from '../../../../res';

const PaymentMethodComponent = (props) => {
    const [amount, setAmount] = useState("");
    const [bankName, setBankName] = useState("");
    const [chequeNumber, setChequeNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const paymentDetailsHandler = () => {
        if(props.payMethod === "Cash" || 
            props.payMethod === "Payment Adjustment" || 
                props.payMethod === "Subsidy"
        ){
            props.sendPaymentDetails({
                paymentType: props.payMethod,
                amount
            })
        }
        else if(props.payMethod === "Cheque"){
            props.sendPaymentDetails({
                paymentType: props.payMethod,
                amount: amount,
                bankName,
                chequeNumber
            })
        }
        else if(props.payMethod === "Credit Card"){
            props.sendPaymentDetails({
                paymentType: props.payMethod,
                amount: amount,
                bankName,
                name,
                cardNumber
            })
        }
        else if(props.payMethod === "Nets / Bank Transfer"){
            props.sendPaymentDetails({
                paymentType: props.payMethod,
                amount: amount,
                description
            })
        }
    }

    var extraInputs;
    if(props.payMethod === "Cheque"){
        extraInputs = (
            <View>
            <TextInput 
                style={{borderWidth: 1, borderRadius: 5, borderColor: Colors.grey3, paddingLeft: 10, marginBottom: 10}}
                placeholder="Bank"
                value={bankName}
                onChangeText={(val)=>setBankName(val)}
                onEndEditing={paymentDetailsHandler}
            />
            <TextInput 
                style={{borderWidth: 1, borderRadius: 5, borderColor: Colors.grey3, paddingLeft: 10, marginBottom: 10}}
                placeholder="Cheque no."
                value={chequeNumber}
                onChangeText={(val)=>setChequeNumber(val)}
                onEndEditing={paymentDetailsHandler}
            />
            </View>
        );
    }
    else if(props.payMethod === "Credit Card"){
        extraInputs = (
            <View>
            <TextInput 
                style={{borderWidth: 1, borderRadius: 5, borderColor: Colors.grey3, paddingLeft: 10, marginBottom: 10}}
                placeholder="Name"
                value={name}
                onChangeText={(val)=>setName(val)}
                onEndEditing={paymentDetailsHandler}
            />
            <TextInput 
                style={{borderWidth: 1, borderRadius: 5, borderColor: Colors.grey3, paddingLeft: 10, marginBottom: 10}}
                placeholder="Bank"
                value={bankName}
                onChangeText={(val)=>setBankName(val)}
                onEndEditing={paymentDetailsHandler}
            />
            <TextInput 
                style={{borderWidth: 1, borderRadius: 5, borderColor: Colors.grey3, paddingLeft: 10, marginBottom: 10}}
                placeholder="Card no."
                value={cardNumber}
                onChangeText={(val)=>setCardNumber(val)}
                onEndEditing={paymentDetailsHandler}
            />
            </View>
        );
    }
    else if(props.payMethod === "Nets / Bank Transfer"){
        extraInputs = (
            <View>
            <TextInput 
                style={{borderWidth: 1, borderRadius: 5, borderColor: Colors.grey3, paddingLeft: 10, marginBottom: 10}}
                placeholder="Description"
                value={description}
                onChangeText={(val)=>setDescription(val)}
                onEndEditing={paymentDetailsHandler}
            />
            </View>
        );
    }

    return(
        <View style={styles.listContainer}>
            <TouchableOpacity style={styles.dropdownList} onPress={props.onMethodChange}>
                <Text style={{fontSize: 16}}>{props.payMethod}</Text>
                <Ic_Arrow_Down color={Colors.grey2} />
            </TouchableOpacity>
            <TextInput 
                style={{borderWidth: 1, borderRadius: 5, borderColor: Colors.grey3, paddingLeft: 10, marginBottom: 10}}
                placeholder="Amount"
                value={amount}
                onChangeText={(val)=>setAmount(val)}
                onEndEditing={paymentDetailsHandler}
            />
            {extraInputs}
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        marginHorizontal: 5,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.grey3,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    dropdownList: {
        height: 50,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

})

export default PaymentMethodComponent;