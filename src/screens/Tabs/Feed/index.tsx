import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import CheckBox from '@react-native-community/checkbox';
import {Header} from '../../../components';
import {t} from '../../../utils';
import {Ic_Plus, Colors} from '../../../res';
import ViewModal from './components/ViewModal';
const {Popover, SlideInMenu, ContextMenu, NotAnimatedContextMenu} = renderers;
let dummyData = [
  {
    name: 'T Rosina',
    occupation: 'Teacher',
    date: '12.12.2021',
    title: 'Doplnenie k schodiskám (čítajte STN 01 3420)    ',
    desc: 'Na doplnenie k schodiskám ešte raz prikladám stranu z STN 01 3420 Spoločné požiadovky, kde vidíte výstupné čiary ako sa kreslia, ked´ sa prelínajú 2 ramená, ked´ jedno končí skôr ako druhé.    ',
    pdf: 'vystupnaciara.pdf    ',
    categories: ['Event', 'Portfolios', 'Fees'],
    seenBy: ['T Rosina', 'Marry', 'Ali', '', '', '', ''],
    likes: 6,
    comments: 2,
    isLiked: true,
  },
  {
    name: 'Marry',
    occupation: 'Teacher',
    date: '08.10.2021',
    title: 'Meet dnes    ',
    desc: 'Dobrý deň, mojá skupina dnes o 9:00 na našóm meete    ',
    categories: ['Event', 'Portfolios'],
    seenBy: ['N. Szabóová', 'T Rosina', 'N. Szabóová', 'Marry', 'Ali', '', ''],
    likes: 2,
    comments: 3,
    isLiked: false,
  },
  {
    name: 'N. Szabóová',
    occupation: 'Teacher',
    date: '07.01.2020',
    title: 'úvodné stretnutie    ',
    desc: 'http://meet.google.com/vgc-jhdd-tnn Kratké úvodné stretnutie... Budeme robiť niečo také    ',
    image: 'vystupnaciara.pdf    ',
    categories: ['Event', 'Portfolios', 'Fees'],
    seenBy: ['T Rosina', 'N. Szabóová', 'Marry', 'Ali', '', ''],
    likes: 1,
    comments: 1,
    isLiked: false,
  },
];
export default function Profile(props) {
  const [state, setstate] = useState(false);
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [viewModal, openViewModal] = useState(false);

  const renderMenu = heading => {
    return (
      <MenuOption disableTouchable>
        <View style={styles.row}>
          <CheckBox
            disabled={false}
            style={{
              marginRight: 10,
              transform: [{scaleX: 0.9}, {scaleY: 0.9}],
            }}
            boxType="square"
            onCheckColor="white"
            tintColor="#818181"
            onTintColor="#599F41"
            onFillColor="#599F41"
          />
          <Text style={[styles.normal, , {marginTop: -5}]}>{heading}</Text>
        </View>
      </MenuOption>
    );
  };

  const renderFile = item => {
    return (
      <View>
        {item?.pdf ? (
          <View style={styles.pdf}>
            <Image
              source={require('./pdf.png')}
              style={{height: 45, width: 45}}
            />
            <Text>{item?.pdf}</Text>
          </View>
        ) : item?.image ? (
          <View style={styles.pdf}>
            <Image
              resizeMode="cover"
              source={{
                uri: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
              }}
              style={styles.bigImage}
            />
          </View>
        ) : (
          <View style={[styles.pdf, {borderWidth: 0, marginVertical: 8}]} />
        )}
      </View>
    );
  };

  const renderCategories = item => {
    return (
      <View style={styles.row}>
        {item.categories.map((item, index) => {
          return (
            <View style={styles.cat}>
              <Text style={styles.light}>{item}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderSeen = item => {
    return (
      <View style={styles.row}>
        {item.seenBy.map((item, index) => {
          if (index < 2) return <Text style={styles.light}>{item}, </Text>;
        })}
        <Text
          style={[styles.light, {color: '#599F41'}]}
          onPress={() => openViewModal(true)}>
          {t('and')} {item?.seenBy?.length - 2} more
        </Text>
      </View>
    );
  };

  const renderComments = item => {
    return (
      <View style={[styles.row, styles.sb, {marginVertical: 5}]}>
        <TouchableOpacity
          style={[styles.row, styles.as, {width: '50%'}]}
          onPress={() => {
            if (item.isLiked) {
              item.isLiked = false;
              item.likes -= 1;
              setstate(!state);
            } else {
              item.isLiked = true;
              item.likes += 1;
              setstate(!state);
            }
          }}>
          <Image
            style={{
              tintColor: item.isLiked ? '#599F41' : '#BEBEBE',
              height: 20,
              width: 20,
            }}
            source={require('./like.png')}
          />
          <Text
            style={
              item.isLiked ? styles.greenText : [styles.light, {marginLeft: 5}]
            }>
            {item.likes} likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.as, {width: '50%'}]}>
          <Image
            style={{
              tintColor: item.isLiked ? '#599F41' : '#BEBEBE',
              height: 20,
              width: 20,
            }}
            source={require('./comment.png')}
          />
          <Text
            style={
              item.isLiked ? styles.greenText : [styles.light, {marginLeft: 5}]
            }>
            {item.comments} comments
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = item => {
    return (
      <View style={[styles.itemMain, styles.shadow]}>
        <View style={[styles.row, styles.sb]}>
          <View style={[styles.row]}>
            <Image
              source={{
                uri: 'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg',
              }}
              style={styles.avatar}
            />
            <View>
              <View style={styles.row}>
                <Text style={styles.bold}>{item?.name}</Text>
                <Text style={styles.light}> ({item?.occupation})</Text>
              </View>
              <Text style={styles.xlight}>{item?.date}</Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <Image source={require('./cross.png')} style={styles.image} />
            <Image
              source={require('./menu.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={[styles.bold, styles.title]}>{item?.title}</Text>
        <Text style={[styles.normal]}>{item?.desc}</Text>
        {renderFile(item)}
        {renderCategories(item)}
        {renderSeen(item)}
        <View style={styles.divider} />
        {renderComments(item)}
      </View>
    );
  };
  const onBackdropPress = () => {
    setOpened(false);
  };

  return (
    <View style={[styles.container]}>
      <Header
        text={t('feed')}
        postfix={
          <View style={styles.header}>
            <Menu
              onSelect={event => {}}
              opened={opened}
              onBackdropPress={() => setOpened(false)}>
              <MenuTrigger>
                <TouchableOpacity
                  onPress={() => {
                    setOpened(true);
                  }}>
                  <Image
                    source={require('./filter.png')}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{padding: 10}}>
                <Text style={[styles.xlight, {marginTop: 10}]}>Filters</Text>
                <View
                  style={[styles.divider, {marginVertical: 10, marginTop: 20}]}
                />
                <Text style={styles.xlight}>Status</Text>
                <MenuOption disableTouchable>
                  <View style={[styles.row, {marginTop: 10}]}>
                    <CheckBox
                      disabled={false}
                      style={{
                        marginRight: 10,
                        transform: [{scaleX: 0.9}, {scaleY: 0.9}],
                      }}
                      boxType="square"
                      onCheckColor="white"
                      tintColor="#818181"
                      onTintColor="#599F41"
                      onFillColor="#599F41"
                    />
                    <Text style={[styles.normal, {marginTop: -5}]}>
                      Vetting List
                    </Text>
                  </View>
                </MenuOption>
                <View style={[styles.divider, {marginBottom: 10}]} />
                {renderMenu('News')}
                {renderMenu('Announcements')}
                {renderMenu('Events')}
                {renderMenu('Media')}
                {renderMenu('Portfolio')}
                {renderMenu('Fees')}
                {renderMenu('Policies')}
                {renderMenu('Systems')}
                <Text style={[styles.normal, {color: 'red'}]}>
                  Reset Filters
                </Text>
              </MenuOptions>
            </Menu>
            <TouchableOpacity onPress={() => props.navigation.navigate('CreateFeed')}>
              <Image source={require('./plus.png')} style={styles.image} />
            </TouchableOpacity>
          </View>
        }
        // onPostfix={this._onPostfix}
      />
      <FlatList
        data={dummyData}
        renderItem={({item, index}) => {
          return renderItem(item);
        }}
      />
      <ViewModal
        isVisible={viewModal}
        close={() => openViewModal(false)}
        data={dummyData}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 32,
    color: 'black',
    fontFamily: Platform.OS === 'android' ? 'RobotoRegular' : 'Roboto-Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60@s', // = scale(100)
  },
  image: {
    height: '20@s',
    width: '20@s', // = scale(100)
  },
  itemMain: {
    margin: '5@s',
    padding: '5@s',
    paddingHorizontal: '7@s',
    borderWidth: 1,
    borderColor: '#BEBEBE',
    marginTop: '20@vs',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: '600',
    color: 'black',
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'RobotoMedium' : 'Roboto-Medium',
  },
  normal: {
    fontWeight: '400',
    fontSize: 16,
    fontFamily: Platform.OS === 'android' ? 'RobotoRegular' : 'Roboto-Regular',
  },
  greenText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#599F41',
    marginLeft: '5@s',
    fontFamily: Platform.OS === 'android' ? 'RobotoRegular' : 'Roboto-Regular',
  },
  light: {
    fontWeight: '400',
    color: '#818181',
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'RobotoLight' : 'Roboto-Light',
  },
  xlight: {
    fontWeight: '400',
    color: '#818181',
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'RobotoThin' : 'Roboto-Thin',
  },
  avatar: {
    height: '35@s',
    width: '35@s',
    borderRadius: 20,
    marginRight: '10@s',
  },
  sb: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    marginVertical: '5@vs',
    fontFamily: Platform.OS === 'android' ? 'RobotoBold' : 'RobotoBold',
  },
  pdf: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#BEBEBE',
    padding: '3@s',
    alignItems: 'center',
    marginVertical: '10@vs',
  },
  bigImage: {
    height: '150@vs',
    width: '100%',
  },
  cat: {
    borderWidth: 1,
    borderColor: '#599F41',
    padding: '2@s',
    paddingHorizontal: '7@s',
    marginRight: '5@s',
    marginBottom: '10@s',
    marginTop: '5@s',
    borderRadius: 4,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#BEBEBE',
    marginVertical: '5@vs',
  },
  sa: {
    justifyContent: 'space-around',
  },
  as: {
    alignSelf: 'flex-start',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
  },
});
