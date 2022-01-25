import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import { COLORS, SIZES, FONTS, icons, constants } from "../constants";
import {
  IconButton,
  LineDevider,
  TextButton,
  TwoPointSlider,
} from "./index.js";

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

const ClassTypeOption = ({
  containerStyle,
  classType,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor3,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={{
          height: 40,
          width: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80,
        }}
      />
      <Text
        style={{
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3,
        }}
      >
        {classType.label}{" "}
      </Text>
    </TouchableOpacity>
  );
};

const ClassLabelOption = ({
  containerStyle,
  classLevel,
  isLastItem,
  isSelected,
  onPress,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          ...containerStyle,
        }}
        onPress={onPress}
      >
        <Text style={{ flex: 1, ...FONTS.body3 }}>{classLevel.label} </Text>
        <Image
          source={isSelected ? icons.checkbox_on : icons.checkbox_off}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
      {!isLastItem && <LineDevider lineStyle={{ height: 1 }} />}
    </>
  );
};

const FilterModal = ({ filterModalSharedValue1, filterModalSharedValue2 }) => {
  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedClassLevel, setSelectedClassLevel] = useState("");
  const [selectedCreatedWithin, setSelectedCreatedWithin] = useState("");

  const filterModalMainContainer = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue1.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue1.value,
        },
      ],
    };
  });
  const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
    };
  });

  const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue2.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
        },
        filterModalContainerAnimatedStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.primary,
          },
          filterModalBgAnimatedStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              height: SIZES.height,
              width: SIZES.width,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: COLORS.white,
            },
            filterModalContainerAnimatedStyle,
          ]}
        >
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                width: 60,
              }}
            />

            <Text
              style={{
                flex: 1,
                textAlign: "center",
              }}
            >
              Filter{" "}
            </Text>

            <TextButton
              label="Cancel"
              contentContainerStyle={{ width: 60, backgroundColor: null }}
              labelStyle={{ color: COLORS.black, ...FONTS.h3 }}
              onPress={() => {
                filterModalSharedValue1.value = withTiming(SIZES.height, {
                  duration: 500,
                });

                filterModalSharedValue2.value = withDelay(
                  500,
                  withTiming(SIZES.height, {
                    duration: 100,
                  })
                );
              }}
            />
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                {" "}
                Class type{" "}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                {constants.class_types.map((item, index) => {
                  return (
                    <ClassTypeOption
                      key={`Class-${index}`}
                      classType={item}
                      isSelected={selectedClassType === item?.id}
                      containerStyle={{
                        marginLeft: index === 0 ? 0 : SIZES.base,
                      }}
                      onPress={() => {
                        setSelectedClassType(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>

            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text style={{ ...FONTS.H3 }}> Class Label</Text>

              <View>
                {constants.class_levels.map((item, index) => (
                  <ClassLabelOption
                    key={`ClassType-${index}`}
                    classLevel={item}
                    isLastItem={index === constants.class_levels.length - 1}
                    isSelected={selectedClassLevel == item?.id}
                    onPress={() => {
                      setSelectedClassLevel(item.id);
                    }}
                  />
                ))}
              </View>
            </View>

            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text style={{ ...FONTS.H3 }}> Created Within</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {constants.created_within.map((item, index) => (
                  <TextButton
                    key={`CreatedWithIn-${index}`}
                    label={item?.label}
                    contentContainerStyle={{
                      height: 45,
                      paddingHorizontal: SIZES.radius,
                      marginLeft: index % 3 === 0 ? 0 : SIZES.radius,
                      marginTop: SIZES.radius,
                      borderRadius: SIZES.radius,
                      borderWidth: 1,
                      borderColor: COLORS.primary,
                      backgroundColor:
                        item?.id === selectedCreatedWithin
                          ? COLORS.primary3
                          : null,
                    }}
                    labelStyle={{
                      color:
                        item?.id === selectedCreatedWithin
                          ? COLORS.white
                          : COLORS.primary3,
                      ...FONTS.body3,
                    }}
                    onPress={() => {
                      selectedCreatedWithin(item?.id);
                    }}
                  />
                ))}
              </View>
            </View>

            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text style={{ ...FONTS.H3 }}> Created Within</Text>

              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TwoPointSlider
                  values={[20, 15]}
                  max={60}
                  postfix="min"
                  onValuesChange={(vlaues) => console.log(vlaues)}
                />
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              height: 50,
              marginBottom: 30,
              paddingHorizontal: SIZES.padding,
            }}
          >
            <TextButton
              label="Reset"
              contentContainerStyle={{
                flex: 1,
                borderRadius: SIZES.radius,
                borderColor: COLORS.gray20,
                backgroundColor: null,
              }}
              labelStyle={{ color: COLORS.black, ...FONTS.h3 }}
            />
            <TextButton
              label="Apply"
              contentContainerStyle={{
                flex: 1,
                borderRadius: SIZES.radius,
                borderColor: COLORS.primary,
                backgroundColor: COLORS.primary,
              }}
              labelStyle={{ color: COLORS.black, ...FONTS.h3 }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FilterModal;
