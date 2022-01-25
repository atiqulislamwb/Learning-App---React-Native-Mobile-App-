import React, {
  useRef,
  createRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { Home, Search, Profile } from "../index.js";
import { COLORS, SIZES, FONTS, constants } from "../../constants";
import { Shadow } from "react-native-shadow-2";
import { connect } from "react-redux";
const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
  ...bottom_tab,
  ref: createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = bottom_tabs.map((_, i) => i * SIZES.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: 80,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onButtonTabPress }) => {
  const containerRef = useRef();
  const [measureLayout, setMeasureLayout] = useState([]);

  useEffect(() => {
    let ml = [];
    bottom_tabs.forEach((bottom_tab) => {
      bottom_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === bottom_tabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {bottom_tabs.map((item, i) => (
        <TouchableOpacity
          key={`Bottom-${i}`}
          ref={item.ref}
          style={{
            flex: 1,
            paddingHorizontal: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => onButtonTabPress(i)}
        >
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ color: COLORS.white, marginTop: 3, ...FONTS.h3 }}>
            {item.label}{" "}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const MainLayout = ({ appTheme }) => {
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const onButtonTabPress = useCallback((bottomTabIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: bottomTabIndex * SIZES.width,
    });
  });

  function renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          horizontal
          ref={flatListRef}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          scrollEnabled={false}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `Main-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contenOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label == constants.screens.home && <Home />}
                {item.label == constants.screens.search && <Search />}
                {item.label == constants.screens.profile && <Profile />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  function renderBottomTab() {
    return (
      <View
        syle={{
          paddingBottom: SIZES.height > 800 ? 20 : 5,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor1,
        }}
      >
        <Shadow size={[SIZES.width - SIZES.padding * 2, 85]}>
          <View
            style={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: appTheme?.backgroundColor2,
            }}
          >
            <Tabs scrollX={scrollX} onButtonTabPress={onButtonTabPress} />
          </View>
        </Shadow>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderContent()}
      {renderBottomTab()}
    </View>
  );
};
function mapStateProps(state) {
  return {
    appTheme: state.appTheme,
  };
}

function mapDispatchProps(dispatch) {
  return {};
}

export default connect(mapStateProps, mapDispatchProps)(MainLayout);
