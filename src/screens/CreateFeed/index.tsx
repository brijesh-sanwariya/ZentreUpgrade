import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Text} from '../../components';
import {t} from '../../utils';
import {Colors, Ic_Back} from '../../res';
import Info from './Info';
import {connect} from 'react-redux';
import {fetchAppData} from '../../utils/store/controllers/appData';
import {showAlert} from '../../utils/store/controllers/alert';
import {
  createContact,
  uploadFile,
} from '../../utils/store/controllers/contacts';
import {ScaledSheet} from 'react-native-size-matters';

interface State {
  currentPage: number;
}
class index extends React.Component<any, State> {
  scrollViewRef: any;

  title: string;
  recepient: string;
  tags: Tags | null;
  nationality: Nationality | null;
  country: Country | null;
  birthDate: string;
  mobileNo: string;
  password: string;
  avatar: string;
  email: string;
  constructor(props) {
    super(props);

    this.scrollViewRef = React.createRef<ScrollView>();

    this.title = '';
    this.recepient = '';
    this.tags = null;
    this.nationality = null;
    this.country = null;
    this.birthDate = '';
    this.mobileNo = '';
    this.password = '';
    this.avatar = '';
    this.email = '';

    this.state = {
      currentPage: 0,
    };
  }
  _onBack = () => {
    this.props.navigation.goBack();
  };

  _onPostfix = () => {};
  render() {
    const {genders, countries, nationalities} = this.props;

    return (
      <View style={styles.container}>
        <Header
          text={t('createFeed')}
          postfix={
            <Text
              text={'Post'}
              color={Colors.primary}
              size={18}
              font={'medium'}
            />
          }
          prefix={<Ic_Back color={Colors.primary} />}
          onPrefix={this._onBack}
          onPostfix={this._onPostfix}
        />
        <Info
          genders={genders}
          nationalities={nationalities}
          countries={countries}
          onTitle={text => {
            this.title = text;
          }}
          onRecepient={text => {
            this.recepient = text;
          }}
          onTags={tags => {
            this.tags = tags;
          }}
          onCountry={country => {
            this.country = country;
          }}
          onBirthDate={date => {
            this.birthDate = date;
          }}
          onMobileNo={mobileNo => {
            this.mobileNo = mobileNo;
          }}
          onResidency={nationality => {
            this.nationality = nationality;
          }}
          onPassword={pass => {
            this.password = pass;
          }}
          onEmail={email => {
            this.email = email;
          }}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
const mapStateToProps = state => {
  return {
    genders: state.appDataController.genders,
    countries: state.appDataController.countries,
    nationalities: state.appDataController.nationalities,
  };
};
const mapDispatchToProps = {
  fetchAppData,
  showAlert,
  createContact,
  uploadFile,
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
