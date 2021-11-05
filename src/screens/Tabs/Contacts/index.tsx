import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux';

import { t } from '../../../utils'
import { Header, Text, SearchBar, Alert } from '../../../components'
import {
  Ic_Plus,
  Colors,
  Styles
} from '../../../res'
import { logout } from '../../../utils/store/controllers/auth'
import { showPopup } from '../../../utils/store/controllers/popup'


import { createSupply, createCategory } from '../../../utils/store/controllers/fees'


import Groups from './Groups'
import ContactsList from './Contacts'

interface State {

}

class Contacts extends React.Component<any, State> {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    //console.debug('Create-Category')
    //console.debug('Contact-Component-Did-Mount')
    //this.props.createCategory()
  }

  componentWillUnmount() {

  }

  _onPostfix = (x, y) => {
    this.props.showPopup({
      show: true,
      position: { x: x, y: y },
      options: [
        {
          text: t('createStudent'),
          onClick: () => {
            this.props.navigation.navigate('CreateNewContact', {
              type: 'student'
            })
          }
        },
        {
          text: t('createStaff'),
          onClick: () => {
            this.props.navigation.navigate('CreateNewContact', {
              type: 'staff'
            })
          }
        },
        {
          text: t('createGroup'),
          onClick: () => {
            this.props.navigation.navigate('CreateGroup')
          }
        },
        {
          text: t('logout'),
          onClick: () => {
            this.props.logout()
          }
        }
      ]
    })
  }

  _onSearch = (text) => {

  }

  _onClickGroup = (group) => {
    this.props.navigation.navigate('GroupProfile', {
      group: group
    })

    //this.props.navigation.navigate('AddMembers')
  }

  _onClickContact = (contact: Contact) => {
    this.props.navigation.navigate('ContactDetailsNav', {
      contact: contact
    })
  }

  _viewAll = (contacts: Contact[]) => {
    this.props.navigation.navigate('AllContact', {
      contacts: contacts
    })
  }

  _viewAllGroup = (groups: Group[] | null) => {
    this.props.navigation.navigate('AllGroups')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          text={t('contacts')}
          postfix={<Ic_Plus color={Colors.primary} />}
          onPostfix={this._onPostfix}
        />

        <SearchBar
          containerStyle={{ marginTop: moderateScale(18) }}
          onSearch={this._onSearch} />

        <Groups
          viewAllGroup={this._viewAllGroup}
          onClickGroup={this._onClickGroup} />
        <ContactsList
          viewAll={this._viewAll}
          onClickContact={this._onClickContact} />
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
})

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = {
  showPopup,
  logout,
  createSupply,
  createCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)