import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

const {width} = Dimensions.get('screen');

export default class CallLog extends React.Component {

  render() {
    const obj = this;
    const {navigation, callLog, horizontal, full, style, priceColor, imageStyle} = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback >
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{uri: callLog.image}} style={imageStyles}/>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.productDescription}>
            <View style={{flexDirection: "row"}}>
              <Text size={18} style={styles.productTitle}>{callLog.name}</Text>
            </View>
            <Text size={12} style={styles.productTitle}>{callLog.phoneNumber}</Text>
            <Text size={12} style={styles.productTitle}>{callLog.type}</Text>
            <Text size={12} muted={!priceColor} color={priceColor}>{callLog.dateTime}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

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
