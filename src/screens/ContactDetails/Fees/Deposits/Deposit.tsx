import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import CheckBox from '@react-native-community/checkbox';

import { Colors, Ic_Dot3_Vertical } from '../../../../res';
import { SearchBar } from '../../../../components';

const Deposit = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [sendStudents, setSendStudents] = useState(false);
    const [sendParents, setSendParents] = useState(false);

    const hidePopup = () => {
        showPopup ? setShowPopup(false) : null;
        Keyboard.dismiss();
    }

    const onSearch = () => {};
    
    const shareDepositsHandler = () => {
        setModalVisible(false);
        //api request
    }

    return(
        <TouchableWithoutFeedback onPress={hidePopup}>
        <View style={styles.container}>
            {modalVisible &&
            <View style={styles.modal}>
                <View style={styles.modalPopup}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox 
                            value={sendStudents} 
                            onValueChange={(newVal)=>setSendStudents(newVal)}
                        />
                        <Text style={styles.modalPopupText}>Send Deposit to Students</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox 
                            value={sendParents} 
                            onValueChange={(newVal)=>setSendParents(newVal)}
                        />
                        <Text style={styles.modalPopupText}>Send Deposit to all Parents</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
                        <TouchableOpacity onPress={()=>setModalVisible(false)}>
                            <Text style={{color: Colors.primary, fontSize: 20}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={shareDepositsHandler}>
                            <Text style={{color: Colors.primary, fontSize: 20}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            }
            <View style={{flex:1}}>
            <SearchBar
                onSearch={onSearch}
                containerStyle={{ marginVertical: moderateScale(36) }}
            />
            <View style={styles.dropdownContainer}>
                <Text style={{fontWeight: "bold", fontSize: 18}}>
                    Type:   
                </Text>
                <Text style={styles.dropDown}>
                    Balance
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.rowAligned}>
                    <Text style={{color: Colors.grey2}}>
                        Balance
                    </Text>
                    <Text style={{fontSize: 16}}>
                        $1851.00
                    </Text>
                </View>
                <View style={styles.rowAligned}>
                    <Text style={{color: Colors.grey2}}>
                        Collected
                    </Text>
                    <Text style={{fontSize: 16}}>
                        $1851.00
                    </Text>
                </View>
            </View>
            <View style={styles.summaryContainer}>
                {showPopup && 
                    <View style={styles.popupContainer}>
                        <TouchableOpacity onPress={() => {setModalVisible(true); setShowPopup(false)}}>
                            <Text style={styles.popupText}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.popupText}>Refund</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.rowAligned}>
                    <Text style={{fontWeight: "bold", fontSize: 16}}>
                        Excursion
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontWeight: "bold", fontSize: 18}}>
                            $1851.00
                        </Text>
                        <TouchableOpacity onPress={() => {setShowPopup(true)}} style={{paddingLeft: 15}}>
                            <Ic_Dot3_Vertical color={Colors.grey1} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowAligned}>
                    <Image source={{
                        width: 50,
                        height: 50,
                        uri: "https://static.wixstatic.com/media/0d2dc9_ecc8d5b04f5c4e1c86007379f117f718~mv2.png/v1/fit/w_2500,h_1330,al_c/0d2dc9_ecc8d5b04f5c4e1c86007379f117f718~mv2.png"
                    }}/>
                    <Text style={{color: Colors.grey2}}>
                        17 October 2021
                    </Text>
                </View>
                <View>
                    <Text style={{color: Colors.grey2}}>
                        SDM Childcare Centre (Jurong East) Pte 
                    </Text>
                    <Text style={{color: Colors.grey2}}>
                        Ltd-Deposit No.: De211000001
                    </Text>
                </View>
            </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '10@ms',
        marginBottom: '25@ms'
    },
    dropDown: { 
        color: Colors.primary, 
        fontSize: 18, 
        paddingLeft: '5@ms'
    },
    detailsContainer: {
        paddingHorizontal: '10@ms',
        marginBottom: '25@ms'
    },
    rowAligned: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '10@ms'
    },
    summaryContainer: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: Colors.grey3,
        borderRadius: 10,
        marginHorizontal: '10@ms',
        padding: '10@ms'
    },
    popupContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 3,
        backgroundColor: Colors.white,
        padding: '10@ms',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    popupText: {
        fontSize: 15,
        padding: '5@ms',
        paddingRight: '30@ms',
    },
    modal: {
        flex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
        opacity: 0.90,
        zIndex: 1
    },
    modalPopup: {
        backgroundColor: Colors.white,
        padding: '10@ms',
        borderRadius: 10,
    },
    modalPopupText:{
        fontSize: 16,
        padding: '10@ms'
    }
})

export default Deposit;