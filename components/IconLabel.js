import React from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Image,

} from 'react-native';

import {COLORS , SIZES , FONTS , icons } from '../constants'

const IconLabel=({
  continerStyle,
  icon,
  iconStyle,
  label,
  labelStyle
})=>{
    
  return(
         <View style={{
              flexDirection:'row',
              alignItems:'center',
              ...continerStyle

         }} >
           <Image
            source={icon}
            style={{
              width:20,
              height:20,
              tintColor: COLORS.gray30,
              ...iconStyle
            }}
            /> 

            <Text style={{
               marginLeft:SIZES.base,
               color:COLORS.gray30,
               ...FONTS.body3,
               ...labelStyle
            }} > {label} </Text>
         </View>
  ) 
}

export default IconLabel;