import React, {useState} from 'react';
import {View, TextInput, ViewStyle} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

import {Colors, Styles} from '../res';
import {Text} from '../components';
import {Platform} from 'react-native';

interface Props {
  onTextChanged?: (text: string) => void;
  containerStyle?: ViewStyle;
  isRequired?: boolean;
  title: string;
  isPassword?: boolean;
  defaultValue?: string;
  multiline?: boolean;
}

function Input({
  containerStyle,
  isRequired = false,
  title = '',
  isPassword = false,
  onTextChanged,
  defaultValue,
  multiline = false,
}: Props) {
  const [text, setText] = useState(defaultValue);

  return (
    <View style={[styles.container, {...containerStyle}]}>
      <View style={multiline ? styles.InputContainer2 : styles.InputContainer}>
        {isPassword ? (
          <TextInput
            onChangeText={text => {
              setText(text);
              onTextChanged && onTextChanged(text);
            }}
            secureTextEntry={true}
          />
        ) : (
          <TextInput
            onChangeText={text => {
              setText(text);
              onTextChanged && onTextChanged(text);
            }}
            value={text}
            defaultValue={defaultValue}
            style={multiline ? styles.input2 : styles.input}
            value={text}
            defaultValue={defaultValue}
            multiline={true}
          />
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text text={title} color={Colors.grey2} size={12} font={'regular'} />
        {isRequired && (
          <Text text={' *'} color={Colors.grey2} size={12} font={'regular'} />
        )}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: Styles.WIDTH,
    paddingHorizontal: '10@ms',
  },
  titleContainer: {
    position: 'absolute',
    left: '20@ms',
    top: -8,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: '6@ms',
  },
  InputContainer: {
    width: '100%',
    height: '56@ms',
    borderWidth: 1,
    borderColor: Colors.grey1,
    borderRadius: '4@ms',
    justifyContent: 'center',
    paddingHorizontal: '10@ms',
  },
  InputContainer2: {
    width: '100%',
    height: '170@ms',
    borderWidth: 1,
    borderColor: Colors.grey1,
    borderRadius: '4@ms',
    justifyContent: 'center',
    paddingHorizontal: '10@ms',
  },
  input: {
    fontSize: '16@ms',
    color: Colors.black,
    fontFamily: Platform.OS === 'android' ? 'RobotoRegular' : 'Roboto-Regular',
    width: Styles.WIDTH - moderateScale(40),
  },
  input2: {
    fontSize: '16@ms',
    color: Colors.black,
    height: '155@ms',
    fontFamily: Platform.OS === 'android' ? 'RobotoRegular' : 'Roboto-Regular',
    width: Styles.WIDTH - moderateScale(40),
  },
});

export default React.memo(Input);
