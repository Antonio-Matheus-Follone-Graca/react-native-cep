import React,{Component, useEffect, useState } from 'react'

import{Text,View,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native'




export default  function Cep(){
  // hooks dos campos que envolvem informações do cep
  const[cep,setCep]=useState("")
  const[logradouro,setLogradouro]=useState("")
  const[uf,setUf]=useState("")
  const[cidade,setCidade]=useState("")
  const[bairro,setBairro]=useState("")

  // funcao que formata os números do cep 
  handleCep = (value) => {
    // 00000-000
      // regex 
      // cep pega o valor formatado do cep
      setCep(value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2"))
     
    
  }

   buscar = () =>{
    if(cep.length<8){
      Alert.alert("cep incompleto")
      
    }
    else{
      // url que retorna um cep
        fetch (`https://viacep.com.br/ws/${cep}/json/`).then(res=>res.json()).then(data=>{
          setLogradouro(data.logradouro)
          setUf(data.uf)
          setBairro(data.bairro)
          setCidade(data.cidade)
          
          })
          .catch(err=>{
            console.log(err)
          })
    }
  }
      return(
        <View style={styles.container}>
    
          <Text style={styles.titulo}> Digite o CEP </Text>
            <TextInput placeholder='ex:01010-000' 
              style={styles.input}
              value={cep}
              onChangeText={( t )=>this.handleCep( t )} // funcao que chama o regex
              maxLength={9}
              keyboardType="numeric"
            />

           
          <TouchableOpacity style={styles.botao} onPress={this.buscar}>
            <Text style={{color:'#FFF'}}> Buscar </Text>
          </TouchableOpacity>

          <Text>   </Text>
          {uf ? 
            <View style={styles.cep}> 
              <Text> cidade :{cidade} </Text>
              <Text> logradouro :{logradouro} </Text>
              <Text> Bairro :{bairro} </Text>
              <Text> uf :{uf} </Text>  
              </View>
              : null }         
        </View>
        )
    
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    cep:{
      marginTop:10
    },
   
    input:{
      width:'90%',
      paddingHorizontal:20,
      paddingVertical:15,
      borderWidth:1,
      borderColor:'#c3c3c3',
      marginTop:10
    },
    botao:{
      marginTop:15,
      backgroundColor:'#5F9F9F',
      padding:20,
      justifyContent:'center',
      alignItems:'center'
    },
      titulo:{
        fontSize:25,
        color:'#000'
       
    }
})