import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import {BASE_URL} from "../src/config";

const {width} = Dimensions.get('screen');

class Product extends React.Component {

  todoStatusCheck(todoStatus) {
    if (todoStatus === "COMPLETE")
      return true;
  }

  async todoComplete(uniqueId) {
    const token = await AsyncStorage.getItem('@accessToken');
    try {
      axios.delete(`${BASE_URL}/todos/${uniqueId}`, {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const obj = this;
    const {navigation, product, horizontal, full, style, priceColor, imageStyle} = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{uri: product.image}} style={imageStyles}/>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.productDescription}>
            <View style={{flexDirection: "row"}}>
              <Text size={18} style={styles.productTitle}>{product.title}</Text>
              <CheckBox
                center
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onIconPress={() => {
                  this.todoComplete(product.uniqueId).then(r => {
                    console.log("Complete")
                  });
                }}
                checked={this.todoStatusCheck(product.todoStatus)}
              />
            </View>
            <Text size={12} style={styles.productTitle}>{product.description}</Text>
            <Text size={12} muted={!priceColor} color={priceColor}>{product.dateAndTime}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default Product;

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginLeft: 10,
    marginRight: 10
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
  },
});
