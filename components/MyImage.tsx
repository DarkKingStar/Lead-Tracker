import { Image } from "expo-image"
import type { PropsWithChildren } from "react"
import { ImageSourcePropType } from "react-native"

type  MyImageProps = PropsWithChildren<{
    imageUrl: ImageSourcePropType
  }>
  
export  const MyImage = (props:any,{imageUrl}:MyImageProps): JSX.Element =>{
    return <Image {...props} source={imageUrl}/>
}



