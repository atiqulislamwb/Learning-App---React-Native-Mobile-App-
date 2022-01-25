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

const CourseChapter = () => {
  function renderHeader() {
    return (
      <View
        style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}
      >
        <Text style={{ ...FONTS.h2 }}>{dummyData.course_details?.title} </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...FONTS.body4, color: COLORS.gray30 }}>
            {dummyData.course_details?.number_of_students}{" "}
          </Text>
          <IconLabel
            icon={icons.time}
            label={dummyData.course_details?.duration}
            containerStyle={{ marginLeft: SIZES.radius }}
            iconStyle={{ height: 15, width: 15 }}
            labelStyle={{ ...FONTS.body4 }}
          />
        </View>
        <View
          style={{
            marginTop: SIZES.radius,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={images.profile}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: "center",
            }}
          >
            <Text style={{ ...FONTS.h3, fontSize: 18 }}>
              {dummyData.course_details?.instructor?.name}{" "}
            </Text>
            <Text style={{ ...FONTS.body5 }}>
              {dummyData.course_details?.instructor?.title}{" "}
            </Text>
          </View>

          <TextButton
            label="Follow"
            contentContainerStyle={{ width: 80, height: 25, borderRadius: 15 }}
            labelStyle={{ ...FONTS.h3 }}
          />
        </View>
      </View>
    );
  }

  function renderChapter() {
    return (
      <View>
        {dummyData?.course_details?.videos?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                height: 70,
                alignItems: "center",
                backgroundColor: item?.is_playing
                  ? COLORS.additionalColor11
                  : null,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: SIZES.padding,
                  alignItems: "center",
                  height: 70,
                }}
              >
                <Image
                  source={
                    item?.is_complete
                      ? icons.completed
                      : item?.is_playing
                      ? icons.play_1
                      : icons.lock
                  }
                  style={{ height: 40, width: 40 }}
                />

                <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                  <Text style={{ ...FONTS.h3 }}>{item?.title} </Text>
                  <Text style={{ ...FONTS.body4, color: COLORS.gray30 }}>
                    {item?.duration}{" "}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={{ ...FONTS.body4, color: COLORS.gray30 }}>
                    {item?.size}{" "}
                  </Text>
                  <Image
                    source={
                      item?.is_downloaded ? icons.completed : icons.download
                    }
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: SIZES.base,
                      tintColor: item?.is_lock ? COLORS.additionalColor4 : null,
                    }}
                  />
                </View>
              </View>

              {item?.is_playing && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    height: 5,
                    width: item?.progress,
                    backgroundColor: COLORS.primary,
                  }}
                ></View>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  function renderPopularCourses() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <View
          style={{ flexDirection: "row", paddingHorizontal: SIZES.padding }}
        >
          <Text style={{ flex: 1, ...FONTS.h2 }}> Popular Courses </Text>
          <TextButton
            label="Sell All"
            contentContainerStyle={{ width: 80, height: 25, borderRadius: 15 }}
            labelStyle={{ ...FONTS.h3 }}
          />
        </View>

        <FlatList
          data={dummyData.courses_list_2}
          keyExtractor={(item) => `Course-List-${item.id}`}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index === 0 ? SIZES.radius : SIZES.padding,
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <LineDevider
              lineStyle={{ height: 1, marginVertical: SIZES.radius }}
            />
          )}
        />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {renderHeader()}
      <LineDevider lineStyle={{ height: 1, marginVertical: SIZES.radius }} />
      {renderChapter()}
      {renderPopularCourses()}
    </ScrollView>
  );
};

export default CourseChapter;
