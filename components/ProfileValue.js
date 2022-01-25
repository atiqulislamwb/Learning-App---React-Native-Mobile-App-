import React from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Image,

} from 'react-native';

import {COLORS , SIZES , FONTS , icons } from '../constants'
import {connect} from 'react-redux'
const ProfileValue=({icon, label , value, onPress,appTheme})=>{
       return(
               <TouchableOpacity  
               
               style={{
                   flexDirection:"row",
                   height:80,
                   alignItems:'center'
               }}
               onPress={onPress} 
                >
                  <View style={{
                      width:40,
                      height:40,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:20,
                      backgroundColor:appTheme?.backgroundColor3,

                  }} 
                    
                  >
          <Image 
          source={icon} 
          
          style={{  width:25, height:25 , tintColor:COLORS.primary }} 
          
          resizeMode='contain' 
          
           /> 
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
                        <Text  
                     style={{color: appTheme?.textColor, ...FONTS.body3}}
                     > 
                      {value}        
                     </Text>

                  </View>
              
                <Image
 
           source={icons.right_arrow} style={{
             width:15, 
             height:15,

               }}  />
      
                </TouchableOpacity>
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

export default connect(mapStateProps, mapDispatchProps)( ProfileValue);