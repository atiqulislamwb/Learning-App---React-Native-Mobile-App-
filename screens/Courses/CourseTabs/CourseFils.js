import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { FlatList, AnimatedFlatList } from "react-native-gesture-handler";
import {
  COLORS,
  SIZES,
  FONTS,
  images,
  dummyData,
  icons,
} from "../../../constants";

import {
  IconButton,
  LineDevider,
  HorizontalCourseCard,
  IconLabel,
  TextButton,
} from "../../../components";

const CourseFiles = () => {
  function renderStudents() {
    let students = [];
    if (dummyData.course_details?.students.length > 3) {
      students = dummyData.course_details?.students.slice(0, 3);
    } else {
      students = dummyData.course_details?.students;
    }
    return (
      <View>
        <Text
          style={{ ...FONTS.h3, fontSize: 25, marginTop: 20, marginBottom: 20 }}
        >
          Students
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: ScrollView.radius,
            alignItems: "center",
          }}
        >
          {students.map((item, index) => (
            <View
              style={{ marginLeft: index > 0 ? SIZES.radius : 0 }}
              key={`Students-${index}`}
            >
              <Image
                source={item?.thumbnail}
                style={{ width: 80, height: 80 }}
              />
            </View>
          ))}

          {dummyData?.course_details?.students.length > 3 && (
            <TextButton
              label="View All"
              labelStyle={{ color: COLORS.primary, ...FONTS.h3 }}
              contentContainerStyle={{
                backgroundColor: COLORS.null,
                marginLeft: 5,
              }}
            />
          )}
        </View>
      </View>
    );
  }

  function renderFiles() {
    return (
      <View syle={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h2, fontSize: 25, marginTop: 20 }}>
          {" "}
          Files{" "}
        </Text>
        {dummyData?.course_details?.files.map((item, index) => (
          <View
            key={`Files-${index}`}
            style={{ flexDirection: "row", marginTop: SIZES.radius }}
          >
            <Image
              source={item?.thumbnail}
              style={{ width: 80, height: 80, marginLeft: 5 }}
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ ...FONTS.h2 }}>{item?.name} </Text>
              <Text style={{ color: COLORS.gray30, ...FONTS.body3 }}>
                {item?.author}{" "}
              </Text>
              <Text style={{ ...FONTS.body4 }}>{item?.upload_date} </Text>
            </View>

            <IconButton
              icon={icons.menu}
              iconStyle={{ width: 25, height: 25, tintColor: COLORS.black }}
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                marginRight: 10,
              }}
            />
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {renderStudents()}
      {renderFiles()}
    </ScrollView>
  );
};

export default CourseFiles;
