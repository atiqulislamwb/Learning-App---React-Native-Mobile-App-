import React, {
  useRef,
  useEffect,
  useState,
  createRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  Keyboard,
} from "react-native";
import {
  COLORS,
  SIZES,
  FONTS,
  images,
  constants,
  dummyData,
  icons,
} from "../../constants";
import { IconButton, LineDevider } from "../../components";
import Video from "react-native-video";

import CourseChapter from "./CourseTabs/CourseChapter.js";
import CourseFiles from "./CourseTabs/CourseFils.js";
import CourseDiscussions from "./CourseTabs/CourseDiscussions.js";

const course_details_tabs = constants.course_details_tabs.map(
  (course_details_tab) => ({
    ...course_details_tab,
    ref: createRef(),
  })
);

const TabsIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = course_details_tabs.map((_, i) => i * SIZES.width);
  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        height: 4,
        width: tabIndicatorWidth,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [{ translateX }],
      }}
    />
  );
};

const Tabs = ({ scrollX, onTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];
    course_details_tabs.forEach((course_details_tab) => {
      course_details_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });
          if (ml.length === course_details_tabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View ref={containerRef} style={{ flex: 1, flexDirection: "row" }}>
      {measureLayout.length > 0 && (
        <TabsIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {course_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            key={`Tab-${index}`}
            ref={item.ref}
            onPress={() => {
              onTabPress(index);
              Keyboard.dismiss();
            }}
          >
            <Text
              style={{ ...FONTS.h3, fontSize: SIZES.height > 800 ? 17 : 18 }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CourseDetails = ({ navigation, route }) => {
  const [courseDetail, setCourseDetail] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const onTabPress = useCallback((tabIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  });

  useEffect(() => {
    const { selectedCourse } = route.params;
    setCourseDetail(selectedCourse);
  }, []);

  function renderHeaderComponent() {
    return (
      <>
        <View style={{ flex: 1 }}>
          <IconButton
            icon={icons.back}
            iconStyle={{ width: 20, height: 20, tintColor: COLORS.primary }}
            containerStyle={{
              width: 40,
              height: 40,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              backgroundColor: COLORS.white,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            icon={icons.media}
            iconStyle={{ tintColor: COLORS.white }}
            containerStyle={{
              width: 40,
              height: 40,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          <IconButton
            icon={icons.favourite_outline}
            iconStyle={{ tintColor: COLORS.white }}
            containerStyle={{
              width: 40,
              height: 40,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </>
    );
  }
  function renderHeader() {
    if (playVideo) {
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.radius,
          paddingBottom: SIZES.base,
          backgroundColor: COLORS.black,
          alignItems: "flex-end",
        }}
      >
        {renderHeaderComponent()}
      </View>;
    } else {
      return (
        <View
          style={{
            position: "absolute",
            top: SIZES.height > 800 ? 40 : 20,
            left: 0,
            right: 0,
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            zIndex: 1,
          }}
        >
          {renderHeaderComponent()}
        </View>
      );
    }
  }

  function renderVideoSection() {
    return (
      <View
        style={{
          height: SIZES.height > 800 ? 220 : 200,
          backgroundColor: COLORS.gray90,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageBackground
          source={courseDetail?.thumbnail}
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            icon={icons.play}
            iconStyle={{ width: 25, height: 25 }}
            containerStyle={{
              width: 50,
              height: 50,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => setPlayVideo(true)}
          />
        </ImageBackground>
        {playVideo && (
          <Video
            source={{ uri: dummyData?.sample_video_url }}
            controls={true}
            style={{
              position: "absolute",
              top: 0,
              right: 0,

              left: 0,
              backgroundColor: COLORS.black,
            }}
            isLooping
          />
        )}
      </View>
    );
  }

  function renderContent() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ height: 60, backgroundColor: COLORS.white }}>
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>

        <LineDevider
          lineStyle={{
            backgroundColor: COLORS.gray20,
          }}
        />

        <Animated.FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          data={constants?.course_details_tabs}
          keyExtractor={(item) => `Course${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                }}
              >
                {index === 0 && <CourseChapter />}
                {index === 1 && <CourseFiles />}
                {index === 2 && <CourseDiscussions />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        color: COLORS.white,
      }}
    >
      {renderHeader()}
      {renderVideoSection()}
      {renderContent()}
    </View>
  );
};

export default CourseDetails;
