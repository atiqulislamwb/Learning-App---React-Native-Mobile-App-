import React from "react";
import { View } from "react-native";

import { COLORS } from "../constants";

const LineDevider = ({ linestyle }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 2,
        backgroundColor: COLORS.gray20,
        ...linestyle,
      }}
    />
  );
};

export default LineDevider;
