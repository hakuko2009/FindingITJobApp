import React, {Component} from 'react';
import {Toast} from 'native-base';
import {Loader, HeaderRight, Header} from '../../common';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {changePassword} from '../../redux/actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input} from './components';
class changePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPass: '',
      newPass: '',
    };
    this.showToast.bind(this);
  }

  showToast = (msg) => {
    Toast.show({
      text: `${msg}`,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  validateData = () => {
    const {oldPass, newPass} = this.state;
    if (!oldPass || !newPass) return false;
    return true;
  };

  moveToMain = async () => {
    if (!this.validateData()) {
      this.showToast('At least one of the fields is empty!');
      return;
    }
    const data = {
      password: this.state.oldPass,
      newPassword: this.state.newPass,
    };
    await this.props.changePassword(data);
    if (this.props.msg == 'Success') {
      this.props.navigation.navigate('');
    }
    this.showToast(this.props.msg);
  };

  changeTextOldPass = (text) => {
    this.setState({oldPass: text});
  };

  changeTextNewPass = (text) => {
    this.setState({newPass: text});
  };

  openBar = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, backgroundColor: '#c5c7db'}}>
          <Header title={'     Change Password'} left={true} color="#0E1442" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Loader status={this.props.loading} msg={'Updating'}></Loader>
              <Input
                onChangeText={this.changeTextOldPass}
                placeholder={'Enter old password...'}
              />
              <Input
                onChangeText={this.changeTextNewPass}
                placeholder={'Enter new password...'}
              />
              <Input
                onChangeText={this.changeTextNewPass}
                placeholder={'Confirm new password...'}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={this.moveToMain}>
                  <Text style={{fontFamily: 'TimesNewRoman', fontSize: 23}}>
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapDispatchToProps = {
  changePassword,
};

const mapStateToProps = (state) => {
  return {
    msg: state.changePassword.msg,
    loading: state.changePassword.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(changePass);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('20%'),
  },
  loginBtn: {
    width: wp('50%'),
    backgroundColor: '#728dcc',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
