import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import axios from "axios";
import {FloatingAction} from "react-native-floating-action";
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from "react-native-sqlite-2";
import {theme} from 'galio-framework';
import Product from "../../../../components/Product";
import {BASE_URL} from "../../../config";
import BackgroundFetch from "react-native-background-fetch";
import CustomCallLog from "../../../customNativeModules/CustomCallLog"
const db = SQLite.openDatabase("test.db", "1.0", "", 1);
const {width} = Dimensions.get('screen');

export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      accessToken: ''
    }
  }

  async componentDidMount() {
    const obj = this;
    await db.transaction(function (txn) {
      txn.executeSql("SELECT * FROM `todoList`", [], function (tx, res) {
        let list = [];
        console.log(res.rows.length)
        for (let i = 0; i < res.rows.length; ++i) {
          list.push(res.rows.item(i));
        }
        obj.setState({todoList: list})
      });
    })
    this.backgroundTaskStart();
    console.log(CustomCallLog.load(5).then(r=>{
      console.log(r)
    }));
  }

  backgroundTaskStart() {
    BackgroundFetch.configure({
      minimumFetchInterval: 15,
      forceAlarmManager: true,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
      requiresCharging: false,
      requiresDeviceIdle: false,
      requiresBatteryNotLow: false,
      requiresStorageNotLow: false
    }, async (taskId) => {
      this.addNewTodoListToSqLite();
      console.log("[js] Received background-fetch event: ", taskId);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
  }

  addNewTodoListToSqLite() {
    const obj = this;
    let temp = [];
    db.transaction(function (txn) {
      txn.executeSql("SELECT * FROM `TempTodoList`", [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log("item:", res.rows.item(i));
          obj.storeData(res.rows.item(i).title, res.rows.item(i).description, res.rows.item(i).todoTime, res.rows.item(i).todoDate)
        }
      });
    })
  }

  async storeData(title, description, todoTime, todoDate) {
    const token = await AsyncStorage.getItem('@accessToken');
    try {
      const response = await axios.post(`${BASE_URL}/todos/`, {
        title: title,
        description: description,
        todoDate: todoDate,
        todoTime: todoTime
      }, {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
    db.transaction(function (txn) {
      txn.executeSql("DROP TABLE IF EXISTS TempTodoList", []);
    });


  }

  async checked(uniqueId) {
    const token = await AsyncStorage.getItem('@accessToken');
    try {
      axios.delete(`${BASE_URL}/todos/${uniqueId}`, {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
      })
    } catch (e) {
      console.log(e);
    }
  }

  todoObject(title, description, todoDate, todoTime, todoStatus, uniqueId) {
    return {
      title: title,
      todoStatus: todoStatus,
      uniqueId: uniqueId,
      description: description,
      image: 'https://source.unsplash.com/lkMJcGDZLVs/840x840',
      dateAndTime: "Date :" + todoDate + " " + " Time :" + todoTime,
      horizontal: true,
    };

  }

  render() {
    const obj = this;
    return (
      <>
        <View style={styles.componentBgColor}>
          <ScrollView style={{backgroundColor: '#f5f4f2'}}>
            {this.state.todoList.map(item => (
              <Product
                product={this.todoObject(item.title, item.description, item.todoDate, item.todoTime, item.todoStatus, item.uniqueId)}
                horizontal
              />))}
          </ScrollView>
        </View>
        <FloatingAction
          animated={false}
          onPressMain={() => this.props.navigation.navigate('Create')}
        />
      </>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  },
  componentBgColor: {
    backgroundColor: theme.COLORS.WHITE
  }
  ,
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  }
});
