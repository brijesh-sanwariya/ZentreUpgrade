import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {createStackNavigator} from '@react-navigation/stack';

import Deposit from "./Deposit";
import CreateNewDeposit from "./CreateNewDeposit";
import AddItem from "./AddItem";
import { Colors, Ic_Plus, Ic_Back } from '../../../../res';

const Stack = createStackNavigator();

const Deposits = () => {
    return(
        <Stack.Navigator
            screenOptions= {({navigation, route}) => ({
                headerStyle: {
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{paddingHorizontal: 20}}>
                        <Ic_Back color={Colors.primary}/>
                    </TouchableOpacity>
                )
            })}
        >
            <Stack.Screen 
                name="Deposit" 
                component={Deposit}
                options={({navigation, route}) => ({
                    headerTintColor: Colors.black,
                    headerRight: () => (
                        <TouchableOpacity 
                            onPress={()=>navigation.navigate("CreateDeposit", {items: [{}]})} 
                            style={{paddingHorizontal: 20}}
                        >
                            <Ic_Plus color={Colors.primary}/>
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen 
                name="CreateDeposit"
                component={CreateNewDeposit}
                options={{
                    headerTitle: "Create Deposit",
                }}
            />
            <Stack.Screen
                name="AddItem"
                component={AddItem}
                options={{
                    headerTitle: "Items"
                }}
            />
        </Stack.Navigator>
    )
}

export default Deposits;