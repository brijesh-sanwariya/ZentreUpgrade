import React, { useState, useEffect, useCallback } from 'react';
import {View , Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { Colors } from '../../../../res';

const AddItem = ({navigation, route}) => {
    const [itemList, setItemList] = useState([{}]);
    const [selectedItems, setSelectedItems] = useState([{}]);
    const [showPopup, setShowPopup] = useState(false); 
    const [newItemTitle, setNewItemTitle] = useState("");
    const [newItemAmount, setNewItemAmount] = useState(0);
    
    const [, setTick] = useState(0);
    const forceUpdate = useCallback(() => {
        setTick(tick => tick + 1);
      }, []);

    const itemSelectHandler = (item) => {
        var selectedList = selectedItems;
        if (selectedList.indexOf(item) < 0) selectedList.push(item);
        else selectedList.splice(selectedList.indexOf(item))
        setSelectedItems(selectedList);
        forceUpdate();
    }

    const amountChangeHandler = (val) => {
        if(Number(val)) setNewItemAmount(Number(val));
        if(val.length == 0) setNewItemAmount(0)
    }

    const newItemAddHandler = () => {
        var newItemList = itemList;
        newItemList.push({name: newItemTitle, amount: newItemAmount});
        setItemList(newItemList);
        setShowPopup(false);
    }

    const renderItem = ({index, item}) => {
        var checkBoxSelected = false;
        for (const selItem of selectedItems)
            if(selectedItems.indexOf(item) > -1)
                checkBoxSelected = true;

        return(
            <TouchableOpacity 
                key={index} 
                onPress={()=>{itemSelectHandler(item)}}
                style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}
            >
                <CheckBox value={checkBoxSelected} onValueChange={() => {itemSelectHandler(item)}}/>
                <View 
                    style={{...styles.listContainer, borderColor: checkBoxSelected ? Colors.primary : Colors.grey3}}
                >
                    <Text 
                        style={{fontSize: 18, color: checkBoxSelected ? Colors.primary : Colors.black}}
                    >
                        {item.name}
                    </Text>
                    <Text 
                        style={{fontSize: 18, color: checkBoxSelected ? Colors.primary : Colors.black}}
                    >
                        {'$'+ item.amount}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const fetchItemList = useCallback(() => {
        var fetchedItemList = [
            {name: "Baby Bonus", amount: 600}, 
            {name: "Financial Assistance", amount: 500},
            {name: "Subsidy", amount: 450}
        ]
        setItemList(fetchedItemList);
    }, []);

    const saveDepositHandler = useCallback(() => {
        navigation.navigate("CreateDeposit", {items: selectedItems})
    }, []);

    useEffect(()=>{
        fetchItemList();
    }, [fetchItemList])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={saveDepositHandler} style={{paddingHorizontal: 20}}>
                    <Text style={{color: Colors.primary, fontSize: 20}}>Done</Text>
                </TouchableOpacity>
            )
        });
    }, []);

    return(
        <View style={styles.container}>
            {showPopup ? 
                <View style={styles.modal}>
                    <View style={styles.modalPopup}>
                        <View style={{marginBottom: 10}}>
                            <Text>Title: </Text>
                            <TextInput 
                                placeholder="title"
                                value={newItemTitle}
                                onChangeText={(val)=>{setNewItemTitle(val)}}
                                style={{borderBottomWidth: 1, borderColor: Colors.grey3, padding: 2}}
                            />
                        </View>
                        <View style={{marginBottom: 10}}>
                            <Text>Amount:</Text>
                            <TextInput 
                                placeholder="Amount"
                                value={newItemAmount.toString()}
                                onChangeText={amountChangeHandler}
                                style={{borderBottomWidth: 1, borderColor: Colors.grey3, padding: 2}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
                        <TouchableOpacity onPress={()=>setShowPopup(false)}>
                            <Text style={{color: Colors.primary, fontSize: 20}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={newItemAddHandler}>
                            <Text style={{color: Colors.primary, fontSize: 20}}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            :
            null
            }
            <TouchableOpacity onPress={() => {setShowPopup(true)}} style={{padding: 10, alignSelf: 'center'}}>
                <Text style={{color: Colors.primary, fontSize: 18}}>Add New</Text>
            </TouchableOpacity>
            <FlatList 
                data={itemList}
                renderItem={renderItem}
                keyExtractor={item=>itemList.indexOf(item).toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 5,
        paddingHorizontal: 5
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
        width: "80%",
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 10,
    },
    listContainer: {
        flex: 1,
        height: 50,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    }
})

export default AddItem;