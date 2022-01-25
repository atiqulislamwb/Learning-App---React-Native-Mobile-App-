import React from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
     Image,
    ImageBackground
} from 'react-native';

import {COLORS , SIZES , FONTS , icons } from '../constants'
import IconLabel from './IconLabel.js'

const HorizontalCourseCard=({
  containerStyle , course , onPress ,
})=>{

  return(
      <TouchableOpacity 
      style={{
        ...containerStyle,
        flexDirection:'row'
      }} 
       
       onPress={onPress}
         >
            <ImageBackground  source={course.thumbnail} style={{
                width:130,
                height:130,
                marginBottom:SIZES.radius
            }}
             imageStyle={{
               borderRadius:SIZES.radius
             }}

             resizeMode="cover"
             > 

             <View style={{
               position:'absolute',
               top:10,
               right:10,
               width:30,
                
                
                height:30,
               alignItems:'center',
               justifyContent:'center',
               borderRadius:5,
               backgroundColor:COLORS.white
             }}>
             <Image source={icons.favourite} resizeMode="contain" style={{
               width:20, height:20, tintColor:course.is_favourite ? COLORS.secondary : COLORS.additionalColor4
             }} />
               
             </View>
            </ImageBackground>

            <View style={{flex:1, marginLeft: SIZES.base}} >
                <Text style={{ ...FONTS.h3 , fontSize: 18 }}  >{course.title}</Text>
                <View style={{
                  flexDirection:'row',
                  alignItems:"center",
                  marginTop:SIZES.base
                }} >
                   <Text style={{
                     ...FONTS.body4
                   }} >By {course.instructor} </Text>
                     
                   <IconLabel  icon={icons.time} label={course.duration} containerStyle={{
                     marginLeft:SIZES.base
                   }} 
                    iconStyle={{
                       width:15,
                       height:15,
                    }}
                    labelStyle={{
                      ...FONTS.body4
                    }}
                   />
                </View>
                 
                  <View style={{
                  flexDirection:'row',
                  alignItems:"center",
                  marginTop:SIZES.base
                 
                }} >
                     <Text style={{
                     ...FONTS.h2,
                     color:COLORS.primary
                   }} >${course.price.toFixed()} </Text>
                    

                   <IconLabel  icon={icons.star} label={course.ratings} containerStyle={{
                     marginLeft:SIZES.base
                   }} 
                    iconStyle={{
                       width:15,
                       height:15,
                       tintColor:COLORS.primary2
                    }}
                    labelStyle={{
                      ...FONTS.body4
                    }}
                   />

                </View>

            </View>

      </TouchableOpacity>

  )

}

export default HorizontalCourseCard;