import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

import { Colors, Ic_Arrow_Down, Ic_Arrow_Right } from '../../../../res';
import PaymentMethodComponent from './PaymentMethodComponent';

const CreateNewDeposit = ({navigation, route}) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [remark, setRemark] = useState("");
    const [payMethod, setPayMethod] = useState("Cash");
    const [paymentDetails, setPaymentDetails] = useState({});
    const [payDropdownVisible, setPayDropdownVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    var formattedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

    const payDropdownHandler = (newMethod) => {
        setPayMethod(newMethod);
        setPayDropdownVisible(false);
    }

    const datePickerHandler = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowDatePicker(false);
    }

    const getPaymentdetails = (detailsObject) => {
        setPaymentDetails(detailsObject);
    }

    const saveDepositHandler = useCallback(() => {
        const formData = {
            name, date : formattedDate, items, remark, paymentDetails
        }
        //api request
        navigation.goBack();
    }, [name, date, items, remark, paymentDetails]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={saveDepositHandler} style={{paddingHorizontal: 20}}>
                    <Text style={{color: Colors.primary, fontSize: 20}}>Done</Text>
                </TouchableOpacity>
            )
        });
    }, [saveDepositHandler]);

    useEffect(()=>{setItems(route.params.items.splice(1))},[route.params])

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 10}}>
            <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                    <Text style={{color: Colors.grey2, fontSize: 12}}>Deposit Name</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Deposit Name"
                    value={name}
                    onChangeText={(val)=>setName(val)}
                />
            </View>
            {
            showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={datePickerHandler}
                />
            )
            }
            <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                    <Text  style={{color: Colors.grey2, fontSize: 12}}>Recieve Date</Text>
                </View>
                <TouchableOpacity style={styles.dateContainer} onPress={()=>setShowDatePicker(true)}>
                    <Text style={{color: Colors.grey2}}>{formattedDate}</Text>
                    <Ic_Arrow_Down color={Colors.grey2}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.listContainer} onPress={()=>navigation.navigate("AddItem", {items: [{}]})}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50}}>
                    <Text style={{color: Colors.primary, fontSize: 16}}>{'Items (' + items.length + ')'}</Text>
                    <Ic_Arrow_Right color={Colors.primary} />
                </View>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                    <Text  style={{color: Colors.grey2, fontSize: 12}}>Remark</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Remark"
                    value={remark}
                    onChangeText={(val)=>setRemark(val)}
                />
            </View>
            {payDropdownVisible ? 
                <View style={styles.payDropdown}>
                    <TouchableOpacity style={styles.dropdownList} onPress={()=>payDropdownHandler("Cash")}>
                        <Text style={{fontSize: 16}}>Cash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownList} onPress={()=>payDropdownHandler("Cheque")}>
                        <Text style={{fontSize: 16}}>Cheque</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownList} onPress={()=>payDropdownHandler("Credit Card")}>
                        <Text style={{fontSize: 16}}>Credit Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownList} onPress={()=>payDropdownHandler("Nets / Bank Transfer")}>
                        <Text style={{fontSize: 16}}>Nets / Bank Transfer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownList} onPress={()=>payDropdownHandler("Payment Adjustment")}>
                        <Text style={{fontSize: 16}}>Payment Adjustment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownList} onPress={()=>payDropdownHandler("Subsidy")}>
                        <Text style={{fontSize: 16}}>Subsidy</Text>
                    </TouchableOpacity>
                </View>
                :
                <PaymentMethodComponent 
                    payMethod={payMethod} 
                    onMethodChange={()=>{setPayDropdownVisible(true)}}
                    sendPaymentDetails={(obj)=>getPaymentdetails(obj)}
                />
            }      
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    inputContainer: {
        height: 50,
        paddingHorizontal: 5,
        marginTop: 20
    },
    labelContainer: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: -15,
        left: 15,
        padding: 5,
        zIndex: 50,
    },
    textInput: {
        flex: 1, 
        borderWidth: 1, 
        borderRadius: 10,
        borderColor: Colors.grey3,
        paddingHorizontal: 15,
    },
    dateContainer: {
        flex: 1, 
        borderWidth: 1, 
        borderRadius: 10,
        borderColor: Colors.grey3,
        paddingHorizontal: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    listContainer: {
        marginHorizontal: 5,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.grey3,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    payDropdown: {
        marginTop: 20,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 3,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: Colors.grey3,
    },
    dropdownList: {
        height: 50,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})

export default CreateNewDeposit;