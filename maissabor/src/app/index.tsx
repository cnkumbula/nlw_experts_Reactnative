import { useState, useRef } from 'react'
import { View, FlatList, SectionList, Text } from 'react-native'
import { Link } from 'expo-router'


import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { CATEGORIES, MENU } from '@/utils/data/product'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-stores'





export default function Home() {

  const cartStore = useCartStore()
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)
  
  function handleCategorySelect(selectedCategory: string) {

    setCategory(selectedCategory) //selectedCategory

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

    if(sectionListRef.current){
      sectionListRef.current?.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true
      })
    }


    
  }


  return (
    <View className="flex-1 pt-8">
      <Header title="Faca o seu pedido" cardQuantityItems={cartQuantityItems}/>

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
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item}) => (
          <Link href={`/product/${item.id}`} asChild>
             <Product data={item}/>
          </Link>
         
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