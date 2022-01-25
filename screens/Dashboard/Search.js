import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import {
  COLORS,
  SIZES,
  FONTS,
  images,
  dummyData,
  icons,
} from "../../constants";
import { IconButton, TextButton, CategoryCard } from "../../components";

const Search = () => {
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);
  const scrollViewRef = useRef();
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  function renderTopSearch() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text style={{ ...FONTS.h2, marginHorizontal: SIZES.padding }}>
          Top Searches{" "}
        </Text>
        <FlatList
          horizontal
          data={dummyData?.top_searches}
          listKey="Top-searches"
          keyExtractor={(item) => `Top-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <TextButton
              label={item.label}
              contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                padding: SIZES.radius,
                marginRight:
                  index === dummyData?.top_searches.length - 1
                    ? SIZES.padding
                    : 0,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.gray10,
                margin: 10,
              }}
              labelStyle={{
                color: COLORS.gray50,
              }}
            />
          )}
        />
      </View>
    );
  }

  function renderBrowseCategory() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text style={{ ...FONTS.h2, marginHorizontal: SIZES.padding }}>
          Browse Category{" "}
        </Text>
        <FlatList
          numColumns={2}
          data={dummyData?.categories}
          listKey="Categories"
          keyExtractor={(item) => `Categories-${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
              sharedElementPrefix="Search"
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                marginTop: SIZES.radius,
                marginLeft:
                  (index + 1) % 2 === 0 ? SIZES.radius : SIZES.padding,
              }}
              imageStyle={{
                borderRadius: SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate("CourseListing", {
                  category: item,
                  sharedElementPrefix: "Search",
                })
              }
            />
          )}
        />
      </View>
    );
  }

  function renderSearchBar() {
    const inputRange = [0, 55];
    const searchBarAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [55, 0],
          Extrapolate.CLAMP
        ),
        opacity: interpolate(
          scrollY.value,
          inputRange,
          [1, 0],
          Extrapolate.CLAMP
        ),
      };
    });
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
            height: 70,
          },
          searchBarAnimatedStyle,
        ]}
      >
        <Shadow>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              width: SIZES.width - SIZES.padding * 2,
              borderRadius: SIZES.radius,
            }}
          >
            <Image
              source={icons.search}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.gray40,
              }}
            />
            <TextInput
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                ...FONTS.h4,
              }}
              placeholder="Search for Topics, Educator & Course"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        </Shadow>
      </Animated.View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.ScrollView
        contentContainerStyle={{
          marginTop: 100,
          paddingBottom: 300,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        onScrollEndDrag={(e) => {
          if (
            e.nativeEvent.contentOffset > 10 &&
            e.nativeEvent.contentOffset < 50
          ) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 60,
              animated: true,
            });
          }
        }}
      >
        {renderTopSearch()}
        {renderBrowseCategory()}
      </Animated.ScrollView>

      {renderSearchBar()}
    </View>
  );
};

export default Search;
