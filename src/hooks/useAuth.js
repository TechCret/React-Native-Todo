import React from 'react';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import {BASE_URL} from '../config';
import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from "react-native-sqlite-2";

const db = SQLite.openDatabase("test.db", "1.0", "", 1);


export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => {
      return ({
        login: async (username, password) => {
          console.log(username, password);
          const {data} = await axios.post(`${BASE_URL}/api/login`, {
            username: username,
            password: password,
          })
          const user = {
            username: data.username,
            token: data.accessToken,
          };
          console.log(user.token)
          console.log(user.token)
          console.log(user.token)
          await AsyncStorage.setItem('@accessToken', user.token)
          await AsyncStorage.setItem('@roleList', data.roleList.toString())
          await SecureStorage.setItem('user', JSON.stringify(user));
          fetchTodoList(user.token);
          dispatch(createAction('SET_USER', user));
        },
        logout: async () => {
          alert("sdfsfsd")
          await SecureStorage.removeItem('user');
          await AsyncStorage.removeItem('@accessToken');
          await AsyncStorage.removeItem('@roleList');
          dispatch(createAction('REMOVE_USER'));

        },
        register: async (email, password) => {
          await sleep(2000);
          await axios.post(`${BASE_URL}`, {
            username: email,
            email,
            password,
          });
        },
      });
    },
    [],
  );

  function fetchTodoList(token) {
    try {
      axios.get(`http://192.168.0.103:5490/todos/`, {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
        saveTodoToSql(res.data.data);
      })
    } catch (e) {
      console.log(e);
    }
  }

  function saveTodoToSql(todoList) {
    console.log("------------------------")
    console.log(todoList)
    db.transaction(function (txn) {
      txn.executeSql("DROP TABLE IF EXISTS todoList", []);
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS todoList(user_id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),description VARCHAR(30),todoDate VARCHAR(30),todoTime VARCHAR(30),todoStatus VARCHAR(30),uniqueId VARCHAR(30))",
        []
      );
      for (let key in todoList) {
        txn.executeSql("INSERT INTO todoList (title,description,todoDate,todoTime,todoStatus,uniqueId) " +
          "VALUES (:title,:description,:todoDate,:todoTime,:todoStatus,:uniqueId)",
          [`${todoList[key].title}`, `${todoList[key].description}`, `${todoList[key].todoDate}`, `${todoList[key].todoTime}`, `${todoList[key].todoStatus}`, `${todoList[key].uniqueId}`]);
      }
    });
  }

  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStorage.getItem('user').then(user => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    });
  }, []);
  return {auth, state};
}
