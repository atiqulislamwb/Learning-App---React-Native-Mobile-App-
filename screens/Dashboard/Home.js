import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
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
import { useNavigation } from "@react-navigation/native";
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  LineDevider,
  CategoryCard,
  HorizontalCourseCard,
} from "../../components";

const Section = ({ containerStyle, onPress, title, children }) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
          }}
        >
          {title}
        </Text>

        <TextButton
          contentContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          label="See All"
          onPress={onPress}
        />
      </View>
      {children}
    </View>
  );
};

const Home = () => {
  const navigation = useNavigation();

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row ",
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ ...FONTS.h2 }}> Hello User! </Text>
          <Text style={{ color: COLORS.gray50, ...FONTS.body3 }}>
            {" "}
            Saturday , 22th January 2022{" "}
          </Text>
        </View>

        <IconButton
          icon={icons.notification}
          iconStyle={{ tintColor: COLORS.black }}
        />
      </View>
    );
  }

  function renderStartLearning() {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          marginTop: SIZES.padding,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
      >
        <View style={{}}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body2,
            }}
          >
            How To{" "}
          </Text>

          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Make your brand more visible with our checklist
          </Text>

          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4,
            }}
          >
            By Jhon Doe
          </Text>
        </View>

        <Image
          source={images.start_learning}
          style={{
            width: "100%",
            height: 110,
            marginTop: SIZES.padding,
          }}
        />

        <TextButton
          label="Start Learning"
          contentContainerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{
            color: COLORS.black,
            ...FONTS,
          }}
        />
      </ImageBackground>
    );
  }

  function renderCourses() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dummyData?.courses_list_1}
        listKey="courses"
        keyExtractor={(item) => `Courses-${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        renderItem={({ item, index }) => (
          <VerticalCourseCard
            course={item}
            containerStyle={{
              marginLeft: index === 0 ? 10 : SIZES.radius,
              padding: SIZES.radius,
              marginRight: -15,
            }}
          />
        )}
      />
    );
  }

  function renderCategories() {
    return (
      <Section title="Categories">
        <FlatList
          data={dummyData?.categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          listKey="Categories"
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          keyExtractor={(item) => `Categories-${item.id}`}
          renderItem={({ item, index }) => (
            <CategoryCard
              sharedElementPrefix="Home"
              category={item}
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                marginRight:
                  index === dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() =>
                navigation.navigate("CourseListing", {
                  category: item,
                  sharedElementPrefix: "Home",
                })
              }
            />
          )}
        />
      </Section>
    );
  }
  function renderPopularCourse() {
    return (
      <Section
        title="Popular Courses"
        containerStyle={{
          marginTop: 30,
        }}
      >
        <FlatList
          data={dummyData?.courses_list_2}
          showsVerticalScrollIndicator={false}
          listKey="Courses"
          contentContainerStyle={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
          }}
          keyExtractor={(item) => `Categories-${item.id}`}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              course={item}
              onPress={() =>
                navigation.navigate("CourseDetails", { selectedCourse: item })
              }
            />
          )}
          ItemSeparatorComponent={() => (
            <LineDevider
              linstyle={{
                backgroundColor: COLORS.gray20,
                marginBottom: 10,
              }}
            />
          )}
        />
      </Section>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {renderStartLearning()}
        {renderCourses()}
        <LineDevider
          linstyle={{
            marginVertical: SIZES.padding,
          }}
        />

        {renderCategories()}
        {renderPopularCourse()}
      </ScrollView>
    </View>
  );
};

export default Home;
