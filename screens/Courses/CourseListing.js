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
} from "../../constants";
import { SharedElement } from "react-native-shared-element";
import {
  IconButton,
  LineDevider,
  HorizontalCourseCard,
  FilterModal,
  TwoPointSlider,
} from "../../components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
const HEADER_HEIGHT = 250;
const CourseListing = ({ navigation, route }) => {
  const { category, sharedElementPrefix } = route.params;

  const flatListRef = useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleSharedValue = useSharedValue(80);
  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);

  function renderHeader() {
    const inputRange = HEADER_HEIGHT - 50;
    handleSharedValue.value = withDelay(
      500,
      withTiming(0, {
        duration: 500,
      })
    );

    const headerFadeAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(handleSharedValue.value, [80, 0], [0, 1]),
      };
    });

    const headerTranslateAnimationStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: handleSharedValue.value }],
      };
    });

    const headerHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [HEADER_HEIGHT, 120],
          Extrapolate.CLAMP
        ),
      };
    });

    const headerOnScrollHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [0, 200],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    });

    const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [50, 130],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    });
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: "hidden",
          },
          headerHeightAnimatedStyle,
        ]}
      >
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={StyleSheet.absoluteFill}
        >
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>

        <Animated.View
          style={[
            {
              position: "absolute",
              top: -80,
              right: 0,
              textAlign: "center",
              color: COLORS.white,
              ...FONTS.h2,
            },
            headerShowOnScrollAnimatedStyle,
          ]}
        >
          <Text>{category?.title}</Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 70,
              left: 30,
            },
            headerOnScrollHeightAnimatedStyle,
          ]}
        >
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={StyleSheet.absoluteFill}
          >
            <Text
              style={{ position: "absolute", color: COLORS.white, ...FONTS.h2 }}
            >
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>

        <Animated.View style={headerFadeAnimatedStyle}>
          <IconButton
            icon={icons.back}
            iconStyle={{ tintColor: COLORS.primary }}
            containerStyle={{
              position: "absolute",
              top: 30,
              left: 30,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              if (scrollY.value > 0 && scrollY.value <= 200) {
                flatListRef.current?.scrollToOffset({
                  offset: 0,
                  animated: true,
                });

                setTimeout(() => {
                  handleSharedValue.value = withTiming(
                    80,
                    {
                      duration: 500,
                    },
                    () => {
                      runOnJS(navigation.goBack());
                    }
                  );
                }, 100);
              }
            }}
          />
        </Animated.View>

        <Animated.Image
          source={images.mobile_image}
          style={[
            {
              position: "absolute",
              right: 40,
              bottom: -40,
              width: 100,
              height: 200,
            },
            headerFadeAnimatedStyle,
            headerTranslateAnimationStyle,
          ]}
        />
      </Animated.View>
    );
  }

  function renderResult() {
    return (
      <FlatList
        ref={flatListRef}
        data={dummyData.courses_list_2}
        keyExtractor={(item) => `Courses-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 270,
              marginBottom: SIZES.base,
            }}
          >
            <Text style={{ flex: 1, ...FONTS.body3 }}>5,761 Result </Text>
            <IconButton
              icon={icons.filter}
              iconStyle={{ width: 20, height: 20, tintColor: COLORS.white }}
              containerStyle={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                filterModalSharedValue1.value = withTiming(0, {
                  duration: 100,
                });
                filterModalSharedValue2.value = withTiming(100, {
                  duration: 500,
                });
              }}
            />
          </View>
        }
        renderItem={({ item, index }) => (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index === 0 ? SIZES.radius : SIZES.padding,
            }}
            onPress={() =>
              navigation.navigate("CourseDetails", { selectedCourse: item })
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <LineDevider
            lineStyle={{
              backgroundColor: COLORS.gray20,
            }}
          />
        )}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderResult()}
      {renderHeader()}
      <FilterModal
        filterModalSharedValue1={filterModalSharedValue1}
        filterModalSharedValue2={filterModalSharedValue2}
      />
    </View>
  );
};

CourseListing.sharedElements = (route, otherRoute, showing) => {
  if (otherRoute.name === "Dashboard") {
    const { category, sharedElementPrefix } = route.params;
    return [
      { id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}` },
      {
        id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`,
      },
    ];
  }
};

export default CourseListing;
