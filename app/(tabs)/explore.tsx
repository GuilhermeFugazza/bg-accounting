import React, { useState, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, View, TextInputProps, Button, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
   return (
      <ThemedView style={styles.main}>
         <Image
            source={require('@/assets/images/darkbgabstract.png')}
            style={styles.headerImage}
         />
         <ThemedView style={styles.balance}>
            <View style={styles.balanceText}>
               <FontAwesome5 name="hand-holding-usd" size={34} color="green" style={styles.balanceIcon} />
               <Text style={styles.balanceNum}>Adicione despesas mensais, únicas ou recorrentes, referentes ao mês seguinte, assim podemos organizá-las com mais facilidade!</Text>
            </View>
         </ThemedView>
         <ThemedView style={styles.form}>
            <AnimatedInput placeholder="Nome da despesa" keyboardType="default" />
            <AnimatedInput placeholder="Valor" keyboardType="numeric" />
            <AnimatedInput placeholder="Quantidade de parcelas" keyboardType="numeric" />
            <TouchableOpacity style={styles.btnSave}>
               <Text style={styles.btnSaveText}>Salvar</Text>
            </TouchableOpacity>
         </ThemedView>
      </ThemedView>
   );
}

interface AnimatedInputProps extends TextInputProps {
   placeholder: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ placeholder, keyboardType }) => {
   const [isFocused, setIsFocused] = useState(false);
   const animatedWidth = useRef(new Animated.Value(0)).current;

   const handleFocus = () => {
      setIsFocused(true);
      Animated.timing(animatedWidth, {
         toValue: 1,
         duration: 300,
         useNativeDriver: false,
      }).start();
   };

   const handleBlur = () => {
      setIsFocused(false);
      Animated.timing(animatedWidth, {
         toValue: 0,
         duration: 300,
         useNativeDriver: false,
      }).start();
   };

   return (
      <View style={styles.inputContainer}>
         <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onFocus={handleFocus}
            onBlur={handleBlur}
         />
         <Animated.View
            style={[
               styles.animatedBorder,
               {
                  width: animatedWidth.interpolate({
                     inputRange: [0, 1],
                     outputRange: ['100%', '100%'],
                  }),
                  backgroundColor: isFocused ? '#555' : '#ddd',
                  alignSelf: 'flex-start',
               },
            ]}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      alignItems: "center",
      height: "100%",
      backgroundColor: "#fff",
   },
   headerImage: {
      width: "100%",
      height: 200,
   },
   balance: {
      alignItems: "center",
      padding: 40,
      paddingTop: 20,
      paddingBottom: 20,
      justifyContent: "center",
      display: "flex",
      backgroundColor: "#fff",
      borderColor: "#fff",
      borderStyle: "solid",
      borderWidth: 1,
      fontFamily: "sans-serif",
      borderRadius: 10,
      width: 300,
      height: 140, // Aumentar a altura para incluir o gráfico e a legenda
      position: "absolute",
      top: 110,
      // Shadow properties
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 }, // Adjust the height to move shadow down
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 10, // For Android
   },
   balanceText: {
      display: "flex",
      flexDirection: "row",
      color: "#191919",
      fontSize: 18,
      alignItems: "center",
      fontWeight: "100"
   },
   balanceIcon: {
      marginRight: 10,
   },
   balanceNum: {
      alignItems: "center",
      fontSize: 16,
      fontWeight: "200"
   },
   form: {
      margin: 30,
      marginTop: 100, // Ajuste conforme necessário para posicionar corretamente o formulário
      width: "90%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
   },
   inputContainer: {
      marginBottom: 10,
   },
   input: {
      height: 40,
      borderColor: "#ddd",
      borderWidth: 0,
      paddingLeft: 10,
      backgroundColor: "#fff",
   },
   animatedBorder: {
      height: 2,
      marginTop: -2,
   },
   btnSave: {
      marginLeft: "20%",
      marginTop: "15%",
      backgroundColor: "#0B90FF",
      width: "60%",
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15
   },
   btnSaveText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "900"
   },
});