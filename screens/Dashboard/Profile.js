import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  COLORS,
  SIZES,
  FONTS,
  images,
  dummyData,
  icons,
} from "../../constants";

import {
  IconButton,
  TextButton,
  LineDevider,
  ProgressBar,
  ProfileValue,
  ProfileRadioButton,
} from "../../components";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/themeAction.js";

const Profile = ({ toggleTheme, appTheme }) => {
  const [newCourseNotification, setNewCourseNotification] = useState(false);
  const [studyReminder, setStudyReminder] = useState(false);

  function toggleThemeHandler() {
    if (appTheme?.name === "light") {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
        }}
      >
        <Text style={{ ...FONTS.h1, color: appTheme?.textColor }}>
          Profile{" "}
        </Text>
        <IconButton
          icon={icons.sun}
          iconStyle={{ tintColor: appTheme?.tintColor }}
          onPress={() => toggleThemeHandler()}
        />
      </View>
    );
  }

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor2,
        }}
      >
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}
        >
          <Image
            source={images.profile}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              borderWidth: 2,
              borderColor: COLORS.white,
            }}
          />
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                backgroundColor: COLORS.primary,
              }}
            >
              <Image
                source={icons.camera}
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            atiqulislamwb
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4,
            }}
          >
            Javascript Developer & Cloud Architect(AWS)
          </Text>

          <ProgressBar
            progress="80%"
            containerStyle={{
              marginTop: SIZES.radius,
            }}
          />

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.body4 }}>
              Overall Progress{" "}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>80% </Text>
          </View>

          <TextButton
            label="+ Become Member "
            contentContainerStyle={{
              height: 35,
              borderRadius: 20,
              marginTop: SIZES.padding,
              backgroundColor: appTheme?.backgroundColor4,
              paddingHorizontal: SIZES.radius,
            }}
            labelStyle={{
              color: appTheme?.textColor2,
            }}
          />
        </View>
      </View>
    );
  }

  function renderProfileSection1() {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue
          icon={icons.profile}
          label="atiqulislamwb"
          value="Atiqul Islam"
        />
        <LineDevider />
        <ProfileValue
          icon={icons.email}
          label="Email"
          value="atiqulislamrussell0@gmail.com"
        />
        <LineDevider />
        <ProfileValue
          icon={icons.call}
          label="Contact Number"
          value="+8801775481006"
        />
      </View>
    );
  }
  function renderProfileSection2() {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue icon={icons.star} label="Page" />
        <LineDevider />
        <ProfileRadioButton
          icon={icons.new_icon}
          label="New Course Notification"
          isSelected={newCourseNotification}
          onPress={() => setNewCourseNotification(!newCourseNotification)}
        />
        <LineDevider />
        <ProfileRadioButton
          icon={icons.reminder}
          label="Study Reminder"
          isSelected={studyReminder}
          onPress={() => setStudyReminder(!studyReminder)}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor1,
      }}
    >
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {renderProfileCard()}
        {renderProfileSection1()}
        {renderProfileSection2()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});

function mapStateProps(state) {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
}

function mapDispatchProps(dispatch) {
  return {
    toggleTheme: (themeType) => {
      return dispatch(toggleTheme(themeType));
    },
  };
}

export default connect(mapStateProps, mapDispatchProps)(Profile);
