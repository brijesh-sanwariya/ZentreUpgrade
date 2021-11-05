import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, Keyboard} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {Styles} from '../../res';
import {t} from '../../utils';
import {Input, DropDownList, Divider} from '../../components';
import FileSelector from './components/fileSelector';

interface Props {
  onTitle: (text) => void;
  onRecepient: (text) => void;
  onTags: (item) => void;
  onAddSetting: (item) => void;
  onDesc: () => void;
  genders: Gender[];
  nationalities: Nationality[];
  countries: Country[];
}

const Info: React.FC<Props> = ({
  onTitle,
  onRecepient,
  onTags,
  onAddSetting,
  genders,
  onDesc,
  nationalities,
  countries,
}) => {
  const [p, sP] = useState(0);
  const padding = useRef(0);
  const pageHeight = useRef(0);
  const touchPos = useRef(0);

  useEffect(() => {
    const kShown = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    const kHide = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      kShown.remove();
      kHide.remove();
    };
  }, []);

  const _keyboardDidShow = e => {
    //console.debug('_keyboardDidShow')
    //console.debug(e)
    let keyboardHeight = e.endCoordinates.height;
    let visibleArea = pageHeight.current - keyboardHeight;

    if (visibleArea > touchPos.current) {
      //console.debug('Top of the keyboard: ', touchPos.current)
      padding.current = keyboardHeight - moderateScale(18);
      sP(keyboardHeight - moderateScale(18));
    } else {
      //console.debug('Under the keyboard: ', touchPos.current)
      let p = pageHeight.current - touchPos.current;
      padding.current = p - moderateScale(28) < 0 ? p : p - moderateScale(28);
      sP(p - moderateScale(28) < 0 ? p : p - moderateScale(28));
    }
  };

  const _keyboardDidHide = () => {
    padding.current = 0;
    sP(0);
  };

  const _onLayout = ({nativeEvent}) => {
    pageHeight.current = nativeEvent.layout.height;
  };

  const _onTouchStart = ({nativeEvent}) => {
    touchPos.current = nativeEvent.pageY;
  };

  return (
    <View
      onLayout={_onLayout}
      style={{
        width: Styles.WIDTH,
      }}>
      <ScrollView
        horizontal={false}
        onTouchStart={_onTouchStart}
        contentContainerStyle={{paddingBottom: padding.current}}
        showsVerticalScrollIndicator={false}>
        <Input
          containerStyle={{marginTop: moderateScale(20)}}
          title={t('title')}
          isRequired={true}
          onTextChanged={onTitle}
        />
        <DropDownList
          containerStyle={{marginTop: moderateScale(20)}}
          title={t('recepients')}
          isRequired={true}
          items={genders}
          onSelected={onRecepient}
        />

        <DropDownList
          containerStyle={{marginTop: moderateScale(20)}}
          title={t('tags')}
          isRequired={true}
          items={genders}
          onSelected={onTags}
        />
        <Divider />
        <Input title={t('desc')} onTextChanged={onDesc} multiline />
        <FileSelector />
        <Divider />
        <DropDownList
          containerStyle={{
            marginBottom: moderateScale(20),
          }}
          title={t('addSetting')}
          isRequired={true}
          items={nationalities}
          onSelected={onAddSetting}
        />
      </ScrollView>
    </View>
  );
};

export default React.memo(Info);
