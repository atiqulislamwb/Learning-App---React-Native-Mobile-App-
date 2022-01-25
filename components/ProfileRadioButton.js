import React,{useRef ,useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Image,
    Animated,
 


} from 'react-native';

import {COLORS , SIZES , FONTS , icons } from '../constants'
import {connect} from 'react-redux'
const ProfileRadioButton=({ icon, label , isSelected , onPress ,appTheme})=>{

    const radioAnimated = useRef(new Animated.Value(0)).current
    const circleColorAnimated= radioAnimated.interpolate({
      inputRange:[0, 17],
      outputRange:[COLORS.gray40, COLORS.primary]
    }) 

    const lineColorAnimated=radioAnimated.interpolate({
      inputRange:[0, 17],
      outputRange:[COLORS.additionalColor4 , COLORS.additionalColor13]
    })

    useEffect(()=>{
      if(isSelected){
         Animated.timing(radioAnimated , {
           toValue:17 ,
           duration:300,
           useNativeDriver:false
         }).start()
      }else{
          Animated.timing(radioAnimated , {
           toValue:0 ,
           duration:300,
           useNativeDriver:false
         }).start()
      }
    },[isSelected])


 return(
          <View style={{
                   flexDirection:"row",
                    height:80,
                   alignItems:'center'
          }} >

          <View  style={{
                      width:40,
                      height:40,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:20,
                      backgroundColor:appTheme?.backgroundColor3,
          }} >

            <Image source={icon}  style={{  width:25, height:25 , tintColor:COLORS.primary }} resizeMode='contain'  />

          </View>

          

           <View style={{
                    
                      flex:1,
                      marginLeft:SIZES.radius,

                  }} 
                      
                  >
                    {label &&
                     <Text  
                     style={{color: appTheme?.textColor, ...FONTS.body3}}
                     > 
                      {label}        
                     </Text>
                     }
          

                  </View>

                 <TouchableOpacity 
                  onPress={onPress} 
                   style={{width:40, 
                         height:40 ,
                      alignItems:'center',
                      justifyContent:'center', }}>

                      <Animated.View
                        style={{
                          width:'100%',
                          height:5,
                          borderRadius:3,
                          backgroundColor:lineColorAnimated,

                        }}
                      />

                        <Animated.View
                        style={{
                          position:'absolute',
                          left:radioAnimated,
                          width:25,
                          height:25,
                          borderRadius:15,
                          borderWidth:5,
                          borderColor:circleColorAnimated,
                          backgroundColor:appTheme?.backgroundColor1,
                              }} 
                      />

                   
                 </TouchableOpacity>
                 

          </View>
         )
 }

function mapStateProps(state){
  return{
    appTheme: state.appTheme,
  }
}

function mapDispatchProps(dispatch){
  return{
 
    }
  }
 export default connect(mapStateProps ,mapDispatchProps)(ProfileRadioButton);
