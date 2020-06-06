import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Dimensions, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Block, Button, Input, Text, theme} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import {materialTheme} from '../../../constants';
import {AuthContext} from '../../contexts/AuthContext';


const {width} = Dimensions.get('window');

export function LoginScreen({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const {register, handleSubmit, watch, errors} = useForm();
  // const onSubmit = data => console.log(data)

  useEffect(() => {
    register({name: "username"}, {required: true});
    register({name: "password"}, {minLength: 1, maxLength: 4, required: true});
  }, [register]);

  async function onSubmit() {
    try {
      console.log(username, password)
      setLoading(true);
      await login(username, password);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }

  }

  return (
    <>
      <LinearGradient colors={['#6C24AA', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block middle>
              <Block row center space="between" style={{marginVertical: theme.SIZES.BASE * 1.875}}>
                <Block flex middle right>
                  <Button
                    round
                    onlyIcon
                    iconSize={theme.SIZES.BASE * 1.625}
                    icon="facebook"
                    iconFamily="font-awesome"
                    color={theme.COLORS.FACEBOOK}
                    shadowless
                    iconColor={theme.COLORS.WHITE}
                    style={styles.social}
                    onPress={() => Alert.alert('Not implemented')}
                  />
                </Block>
                <Block flex middle center>
                  <Button
                    round
                    onlyIcon
                    iconSize={theme.SIZES.BASE * 1.625}
                    icon="twitter"
                    iconFamily="font-awesome"
                    color={theme.COLORS.TWITTER}
                    shadowless
                    iconColor={theme.COLORS.WHITE}
                    style={styles.social}
                    onPress={() => Alert.alert('Not implemented')}
                  />
                </Block>
                <Block flex middle left>
                  <Button
                    round
                    onlyIcon
                    iconSize={theme.SIZES.BASE * 1.625}
                    icon="dribbble"
                    iconFamily="font-awesome"
                    color={theme.COLORS.DRIBBBLE}
                    shadowless
                    iconColor={theme.COLORS.WHITE}
                    style={styles.social}
                    onPress={() => Alert.alert('Not implemented')}
                  />
                </Block>
              </Block>
            </Block>
            <Block middle style={{paddingVertical: theme.SIZES.BASE * 2.625}}>
              <Text center color="white" size={14}>
                or be classical
              </Text>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  borderless
                  color="white"
                  placeholder="Email"
                  type="email-address"
                  autoCapitalize="none"
                  bgColor='transparent'
                  // onBlur={() => this.toggleActive('email')}
                  // onFocus={() => this.toggleActive('email')}
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={setUsername}
                  style={[styles.input]}
                  register={register}
                />
                <Text>{errors.username && 'Name is required.'}</Text>

                <Input
                  password
                  viewPass
                  borderless
                  color="white"
                  iconColor="white"
                  placeholder="Password"
                  bgColor='transparent'
                  // onBlur={() => this.toggleActive('password')}
                  // onFocus={() => this.toggleActive('password')}
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={setPassword}
                  // style={[styles.input, this.state.active.password ? styles.inputActive : null]}
                  register={register}
                />
                <Text>{errors.password && 'Password is required.'}</Text>

                <Text
                  color={theme.COLORS.WHITE}
                  size={theme.SIZES.FONT * 0.75}
                  onPress={() => Alert.alert('Not implemented')}
                  style={{alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2}}
                >
                  Forgot your password?
                </Text>
              </Block>
              <Block flex top style={{marginTop: 20}}>
                <Button
                  shadowless
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  style={{height: 48}}
                  onPress={onSubmit}
                >
                  SIGN IN
                </Button>
                <Button color="transparent" shadowless onPress={() => navigation.navigate('AboutUs')}>
                  <Text
                    center
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT * 0.75}
                    style={{marginTop: 20}}
                  >
                    {"About Us"}
                  </Text>
                </Button>
                <Button color="transparent" shadowless onPress={() => navigation.navigate('CallLog')}>
                  <Text
                    center
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT * 0.75}
                    style={{marginTop: 20}}
                  >
                    {"Read Read CallLog"}
                  </Text>
                </Button>
                <Button color="transparent" shadowless onPress={() => navigation.navigate('Privacy')}>
                  <Text
                    center
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT * 0.75}
                    style={{marginTop: 20}}
                  >
                    {"Read Read Privacy Policy"}
                  </Text>
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: `column`,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameInput: {
    borderColor: `black`,
    borderWidth: 2,
    width: `80%`,
    padding: 10
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomWidth: .5,
    borderBottomColor: 'grey',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 1
  },

  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
