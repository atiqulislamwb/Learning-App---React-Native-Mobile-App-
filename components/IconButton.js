import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity, 
} from 'react-native';

import {COLORS } from '../constants'

const IconButton =({containerStyle , icon , iconStyle , onPress })=>{
      

  return(
      <TouchableOpacity
       onPress={onPress}
       style={{
         ...containerStyle
       }}
      >
      <Image
       source={icon}
       resizeMode="contain"
       style={{
         height:30,
         width:30,
         tintColor: COLORS.white,
         ...iconStyle
       }}
      
      />
      </TouchableOpacity>
  )
}

export default IconButton;