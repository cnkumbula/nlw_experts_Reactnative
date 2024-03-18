import { forwardRef } from "react";
import { Image, ImageProps, TouchableOpacity, TouchableOpacityProps, View ,Text } from "react-native";

type ProductDataProps = {
  title: string
  description: string
  thumbnail: ImageProps
  quantity?: number
}


type ProductProps = TouchableOpacityProps &  {
  data: ProductDataProps
  
}
export const Product = forwardRef<TouchableOpacity, ProductProps> (({data, ...rest}, 
  ref) => {
  return(
    <TouchableOpacity 
      ref={ref}
      className="w-full flex-row items-center pb-4"
      {...rest}
    >
      <Image source={data.thumbnail} className="w-20 h-20 rounded-md"/>

      <View className="flex-1 ml-3 ">

        <View className="flex-row items-center">
          <Text className="text-slate-100 font-subtitle text-base flex-1">
            {data.title}
          </Text>

          {data.quantity && 
            <View className="bg-lime-300 w-10 h-6 rounded-full items-center justify-center top-1 -right-0.2">     
              <Text className="text-slate-900 font-subtitle text-sm">
                x{data.quantity}        
              </Text> 
            </View>
          }

          {/*{data.quantity && 
            <Text className="text-slate-400 font-subtitle text-sm">
              x{data.quantity}        
            </Text> 
          }*/}

        </View>

        <Text className="text-slate-400 font-subtitle text-xs leading-5 mt-0.5">
          {data.description}
        </Text>

      </View>

      </TouchableOpacity>
  )

})