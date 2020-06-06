import React from 'react';
import {PermissionsAndroid, ScrollView, View} from "react-native";
import CallLog from "../../../components/CallLog";
import CustomCallLogs from "../../customNativeModules/CustomCallLog"

export default class CallLogHistory extends React.Component {

  constructor() {
    super();
    this.state = {
      callHistory: []
    }
  }

  componentDidMount = async () => {
    await this.requestReadCallLogPermission();
    await CustomCallLogs.load(30).then(callHistory => {
      console.log(callHistory)
      this.setState({callHistory: callHistory})
    })
  }

  async requestReadCallLogPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: "Auto Verification OTP",
          message: "need access to read sms, to verify OTP"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log("sms read permissions denied", "denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  callObject(dateTime, duration, name, phoneNumber, type) {
    return {
      dateTime: dateTime,
      duration: duration,
      name: name,
      phoneNumber: phoneNumber,
      type: type,
      image: 'https://source.unsplash.com/lkMJcGDZLVs/840x840'
    }
  }

  render() {
    return (
      <>
        <View>
          <ScrollView style={{backgroundColor: '#f5f4f2'}}>
            {this.state.callHistory.map(item => (
              <CallLog
                callLog={this.callObject(item.dateTime, item.duration, item.name, item.phoneNumber, item.type)}
                horizontal
              />))}
          </ScrollView>
        </View>
      </>
    );
  }

}
