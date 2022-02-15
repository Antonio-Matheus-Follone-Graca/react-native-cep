import React,{Component, useEffect, useState } from 'react'

import{Text,View,StyleSheet,TextInput,Button,TouchableOpacity,Alert} from 'react-native'




export default class App extends Component{
  
  state={
  cep:'',
  dados:{
    logradouro:'',
    uf:'',
    cidade:'',
    bairro:''
  }
}
 

  handleCep = (value) => {
    // 00000-000
 
    this.setState({
      // regex 
      // cep pega o valor formatado do cep
        cep:value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
      })
    
  }

   buscar = () =>{
    if(this.state.cep.length<8){
      Alert.alert("cep incompleto")
      this.setState({dados:''})
    }
    else{
      // url que retorna um cep
        fetch (`https://viacep.com.br/ws/${this.state.cep}/json/`).then(res=>res.json()).then(data=>{
    
            this.setState({
              dados:data
            })
          
          })
          .catch(err=>{
            console.log(err)
          })
    }
  }
  

    render(){
    
      return(
        <View style={styles.container}>
    
          <Text style={styles.titulo}> Digite o CEP </Text>
            <TextInput placeholder='ex:01010-000' 
              style={styles.input}
              value={this.state.cep}
              onChangeText={( t )=>this.handleCep( t )} // funcao que chama o regex
              maxLength={9}
              keyboardType="numeric"
            />

           
          <TouchableOpacity style={styles.botao} onPress={this.buscar}>
            <Text style={{color:'#FFF'}}> Buscar </Text>
          </TouchableOpacity>

          <Text>   </Text>
          {this.state.dados.uf ? 
            <View style={styles.cep}> 
              <Text> cidade :{this.state.dados.localidade} </Text>
              <Text> logradouro :{this.state.dados.logradouro} </Text>
              <Text> Bairro :{this.state.dados.bairro} </Text>
              <Text> uf :{this.state.dados.uf} </Text>  
              </View>
              : null }         
        </View>
        )
    }
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