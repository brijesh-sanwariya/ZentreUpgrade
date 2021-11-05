import React, {
  useState,
} from 'react'
import {
  View,
  ViewStyle
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import Animated from "react-native-reanimated"
const {
  interpolateNode,
} = Animated

import { useTransition, mix } from './helper'
import { Colors, Ic_Arrow_Down, Styles } from '../../res'
import { Text } from '../../components'

interface Props {
  title: string,
  isRequired?: boolean,
  items: { name: string, id: string }[],
  containerStyle?: ViewStyle
  onSelected?: (item) => void
  value?: { name: string, id: string } | null
}
const LIST_ITEM_HEIGHT = 54

function DropDownList({
  title,
  isRequired,
  items,
  containerStyle,
  onSelected,
  value
}: Props) {
  if (items.length === 0)
    return null

  const [selectedText, setSelectedText] = useState<{ name: string, id: string }>(value ? value : items[0])
  const [open, setOpen] = useState(false)
  const transition = useTransition(open)
  const height = mix(transition, 0, LIST_ITEM_HEIGHT * items.length)
  const bottomRadius = interpolateNode(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [4, 0],
  })

  const borderBottomWidth = interpolateNode(transition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View>
          <Animated.View
            style={[styles.AnimatedContainer, {
              borderBottomWidth: borderBottomWidth,
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            }]}>
            <Text
              text={selectedText.name}
              size={14}
              font={'regular'}
              color={Colors.black}
            />
            <Ic_Arrow_Down color={Colors.grey2} />
          </Animated.View>
          <View style={{
            width: Styles.WIDTH - moderateScale(40),
            height: 1,
            backgroundColor: Colors.grey1,
            alignSelf: 'center',
            marginTop: -1,
          }} />
        </View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.items, {
        height,
        borderColor: Colors.grey1
      }]}>
        {
          items.map((item: { name: string, id: string }, key) => (
            <TouchableWithoutFeedback
              key={key}
              onPress={() => {
                onSelected && onSelected(item)
                setSelectedText(item)
                setOpen((prev) => !prev)
              }}>
              <Item
                isLast={key === items.length - 1}
                item={item}
              />
            </TouchableWithoutFeedback>
          ))
        }
      </Animated.View>

      <View style={styles.titleContainer}>
        <Text
          text={title}
          color={Colors.grey2}
          size={12}
          font={'regular'}
        />
        {
          isRequired && (
            <Text
              text={" *"}
              color={Colors.grey2}
              size={12}
              font={'regular'}
            />
          )
        }
      </View>
    </View>
  )
}

function Item({ isLast, item }) {
  const bottomRadius = isLast ? 4 : 0
  return (
    <View style={[styles.itemContainer, {
      borderBottomLeftRadius: bottomRadius,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: isLast ? 1 : 0,
      borderColor: Colors.grey1,
      borderBottomRightRadius: bottomRadius,
    }]}>
      <Text
        text={item.name}
        size={14}
        font={'regular'}
        color={Colors.black}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: Styles.WIDTH,
    paddingHorizontal: '10@ms'
  },
  AnimatedContainer: {
    height: '56@ms',
    backgroundColor: "white",
    paddingHorizontal: '10@ms',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.grey1,
  },
  items: {
    overflow: "hidden",
  },
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: '10@ms',
    borderBottomWidth: 1,
    borderColor: Colors.grey1,
    height: LIST_ITEM_HEIGHT,
  },
  titleContainer: {
    position: 'absolute',
    left: '20@ms',
    top: -8,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: '6@ms'
  },
})

export default DropDownList