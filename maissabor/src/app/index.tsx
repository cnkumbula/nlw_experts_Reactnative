import { useState } from 'react'
import { View, FlatList, SectionList, Text } from 'react-native'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { CATEGORIES, MENU } from '@/utils/data/product'
import { Product } from '@/components/product'





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

      <SectionList 
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item}) => (
          <Product data={item}/>
        )}

        renderSectionHeader={({section: {title}}) => (
          <Text className="text-slate-100 font-heading text-xl mt-8 mb-3">{title}</Text>
        )}

        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      
      />
      

     
    </View>
  )
}