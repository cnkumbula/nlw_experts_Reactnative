import { useState } from "react"

import { View, Text, ScrollView, Alert, Linking } from "react-native"

import { useNavigation } from "expo-router"

import { Feather } from "@expo/vector-icons"

import { KeyboardAwareScrollView }from "react-native-keyboard-aware-scroll-view"

import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button"

import { ProductCartProps, useCartStore } from "@/stores/cart-stores"

import { formatCurrency } from "@/utils/functions/format-currency"
import { add } from "@/stores/helpers/cart-in-memory"




export default function Cart() { 

  const [address, setaddress] = useState("")
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const PHONE_NUMBER = "+258"


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

  function handleOrder() {

    if(address.trim().length === 0){
      return Alert.alert("Endereço obrigatório", "Por favor, insira o endereço de entrega")
    }

    const products = cartStore.products.map((product) => 
    `\n ${product.quantity}x ${product.title}`).join("")
      
    //Alert.alert("Seu pedido", `Ola, gostaria de fazer o pedido: \n ${products} \n Endereco: ${address}`)
    //console.log(products)

    const message = `
    Ola, gostaria de fazer o pedido: 
    \n ${products} 
    \n Endereco: ${address}
    \n Total: ${total}
    `

    //console.log(message)
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    cartStore.clear()
    navigation.goBack()
    //Alert.alert("Seu pedido", `Ola, gostaria de fazer o pedido: \n ${products} \n Endereco: ${address}`)
    




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
        <Input 
        placeholder = "Insira o endereco de entrega"
        onChangeText = {(address) => setaddress(address)}
        blurOnSubmit = {true}
        onSubmitEditing = {handleOrder}
        returnKeyType="send"
        />
      </View>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
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