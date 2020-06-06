import React from 'react';
import {AppState, Dimensions, KeyboardAvoidingView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import TimePicker from "react-native-24h-timepicker";
import DatePicker from "react-native-datepicker";
import SQLite from "react-native-sqlite-2";
import {Block, Button, Input} from 'galio-framework';
import materialTheme from "../../../../constants/Theme";
import theme from "../../../../constants/Theme";
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('screen');

const db = SQLite.openDatabase("test.db", "1.0", "", 1);

class Create extends React.Component {

  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      selectedHours: 0,
      selectedMinutes: 0,
      todoTime: "00.00",
      todoDate: '01-01-2020',
      appState: AppState.currentState
    }
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({todoTime: `${hour}:${minute}`});
    this.TimePicker.close();
    // this.props.navigation.navigate('Login')
  }

  onSubmit = async () => {
    const {title, description, todoTime, todoDate} = this.state;
    this.storeInSqLite(title, description, todoDate, todoTime);
  }

  storeInSqLite(title, description, todoDate, todoTime) {
    db.transaction(function (txn) {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS TempTodoList(todo_id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),description VARCHAR(100),todoDate VARCHAR(30), todoTime VARCHAR(30))",
        []
      );
      txn.executeSql("INSERT INTO TempTodoList (title,description,todoDate,todoTime) VALUES (:title,:description,:todoDate,:todoTime)", [`${title}`, `${description}`, `${todoDate}`, `${todoTime}`]);
    });
  }

  componentDidMount() {
    console.log(AppState.currentState)
    this.setState({todoDate: new Date})
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Block flex middle>
            <KeyboardAvoidingView behavior="padding" enabled>
              <Input
                placeholder="Title"
                bgColor="transparent"
                color={materialTheme.COLORS.PRIMARY}
                style={[styles.input, styles.inputTheme]}
                placeholderTextColor={materialTheme.COLORS.PRIMARY}
                iconContent={<Icon
                  name='user'
                  size={24}
                  color='black'
                />}
                onChangeText={(title) => this.setState({title: title})}
              />
              <Input
                placeholder="Description"
                bgColor="transparent"
                color={materialTheme.COLORS.PRIMARY}
                style={[styles.input, styles.inputTheme]}
                placeholderTextColor={materialTheme.COLORS.PRIMARY}
                iconContent={<Icon
                  name='user'
                  size={24}
                  color='grey'
                />}
                onChangeText={(description) => this.setState({description: description})}/>
              <View style={{flexDirection: "row"}}>
                <Text style={styles.text}
                >Select Time</Text>
                <Button
                  shadowless color="info"
                  onPress={() => this.TimePicker.open()}
                  style={[styles.button, styles.shadow]}>
                  {this.state.todoTime}
                </Button>
                <TimePicker
                  ref={ref => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.onCancel()}
                  onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                />
              </View>

              <View style={styles.containerDate}>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.todoDate}
                  mode="date"
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  minDate="01-01-2020"
                  maxDate="01-01-2025"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={date => {
                    this.setState({todoDate: date});
                  }}
                />
                <TouchableHighlight
                  style={[styles.buttonContainer,
                    styles.loginButton]}
                  onPress={this.onSubmit}>
                  <Text style={styles.loginText}>Add</Text>
                </TouchableHighlight>
              </View>
            </KeyboardAvoidingView>
          </Block>
        </View>
      </>
    )
  }
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
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateAndTimeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameInput: {
    borderColor: `black`,
    borderWidth: 2,
    width: `80%`,
    padding: 10
  },
  inputTheme: {
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PRIMARY,
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
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  containerDate: {
    flex: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 1
  },
  text: {

    fontSize: 14,
    marginTop: 33,
    marginRight: 10
  },
  button: {
    width: `60%`,
    backgroundColor: "#4EB151",
    borderRadius: 3,
    marginVertical: 25
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default Create;
