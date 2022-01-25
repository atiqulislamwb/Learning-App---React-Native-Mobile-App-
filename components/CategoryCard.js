import React from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    ImageBackground,
    Image,
    StyleSheet

} from 'react-native';

import {COLORS , SIZES , FONTS , icons } from '../constants'

import {SharedElement } from 'react-native-shared-element'
const CategoryCard=({category , containerStyle , onPress , sharedElementPrefix})=>{
  
  return(
     <TouchableOpacity onPress={onPress} 
     style={{
       height:150,
       width:200,
       ...containerStyle
     }}   
     >
      <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={styles.absoluteFillObject}
      >
      
      <Image
       source={category?.thumbnail}
       style={{
           height:'100%',
           width:'100%',
           }}
      resizeMode="cover"
      
      />

       </SharedElement>

        
       <View style={{
         position:'absolute',
         bottom:50,
         left:5,

       }} 
       >
        <SharedElement
         id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          style={styles.absoluteFillObject}
        >
    
       <Text  
       style={{
         color:COLORS.primary, ...FONTS.h2,}} 
       >{category?.title}
       </Text>
        </SharedElement>
       </View>

     </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
  absoluteFillObject:{
     
  }
})


export default CategoryCard;