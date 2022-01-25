import React from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    
} from 'react-native';

import {COLORS ,  FONTS  } from '../constants'

const TextButton=({
   contentContainerStyle,
   onPress,
   disabled,
   label,
   labelStyle

})=>{


  return(
      <TouchableOpacity
       style={{
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:COLORS.primary,
         ...contentContainerStyle
       }}
       onPress={onPress}
       disabled={disabled}

      > 
      <Text
       style={{
         color:COLORS.white,
         ...FONTS.h3,
         ...labelStyle
       }}
      >{label} </Text>
      </TouchableOpacity>
  )
}

export default TextButton