import { useState } from 'react'
import { View, FlatList } from 'react-native'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { CATEGORIES } from '@/utils/data/product'



export default function Home() {

  const [category, setCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(selectedCategory: string) {

    setCategory(selectedCategory) //selectedCategory
    
  }


  return (
    <View className="flex-1 pt-8">
      <Header title="Faca o seu pedido" cardQuantityItems={3}/>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <CategoryButton 
            title={item} 
            isSelected={item === category} 
            onPress={() => handleCategorySelect(item)}/>
        )}
        horizontal
        className='max-h-10 mt-5'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:12, paddingHorizontal: 20}}
      />

     
    </View>
  )
}