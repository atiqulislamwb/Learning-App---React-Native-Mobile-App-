import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { COLORS, SIZES, FONTS, icons } from "../constants";
import IconLabel from "./IconLabel.js";

const VerticalCourseCard = ({ containerStyle, course }) => {
  return (
    <TouchableOpacity
      style={{
        width: 260,
        ...containerStyle,
      }}
    >
      <Image
        source={course.thumbnail}
        style={{
          width: "100%",
          height: 150,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,
        }}
      />

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={icons.play}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flexShrink: 1,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              fontSize: 18,
            }}
          >
            {" "}
            {course.title}
          </Text>

          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={{
              marginTop: SIZES.base,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCourseCard;
