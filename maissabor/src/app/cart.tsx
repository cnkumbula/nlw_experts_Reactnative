import { View, Text, ScrollView, Alert } from "react-native"

import { Feather } from "@expo/vector-icons"

import { KeyboardAwareScrollView }from "react-native-keyboard-aware-scroll-view"

import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { Input } from "@/components/input"
import { Button } from "@/components/button"

import { ProductCartProps, useCartStore } from "@/stores/cart-stores"

import { formatCurrency } from "@/utils/functions/format-currency"
import colors from "tailwindcss/colors"
import { LinkButton } from "@/components/link-button"


export default function Cart() { 

  const cartStore = useCartStore()

  const total = formatCurrency(cartStore.products.reduce((total, product) => total + 
  product.price * product.quantity,0))

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover produto", `Deseja remover o item ${product.title}?`, [
      {
        text: "Sim",
        onPress: () => {
          cartStore.remove(product.id)

        }
      },
      {
        text: "Nao",
        /*onPress: () => {
          console.log("nao removendo")

        }*/
      }
    ]
    )
  }


  return (
    <View className="flex-1 pt-8">
     <Header title="Seu carrinho" />
     <KeyboardAwareScrollView>
     <ScrollView>
      
      { cartStore.products.length > 0 ? (
      <View className="flex-1 p-5">
        {
          cartStore.products.map((product) => (
            <Product 
            key={product.id} 
            data={product}
            onPress={() => handleProductRemove(product)}
            />
          ))
        }
      </View>
      ):(
      <Text className="text-slate-400 font-body text-center my-8">
      O seu carrinho esta vazio
      </Text>
      )}
      </ScrollView>
      </KeyboardAwareScrollView>
      <View className="flex-row gap-2 items-center mt-5 mb-4 mx-2">
        <Text className="text-white text-xl font-subtitle text-center">Total:</Text>
        <Text className="text-lime-400 font-heading text-2xl">
          {total}
        </Text> 
      </View>

      <View className="p-5">
        <Input placeholder="Insira o endereco de entrega"/>
      </View>

      <View className="p-5 gap-5">
        <Button>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={24} />
          </Button.Icon>
        </Button>

        <LinkButton title="voltar para ao cardapio" href="/"/>
      </View>

      
    </View>
  )
}