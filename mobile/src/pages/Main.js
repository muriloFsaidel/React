import React, {useState,useEffect} from 'react';
import {StyleSheet, Image, View, Text, TextInput,TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';
//request.. == requisição de permissão da localização atual
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';

import api from '../services/api';
import {Connect, Disconnect, SubscribeToNewDevs} from '../services/socket';

//navigation é uma propriedade automática criada pelo componente createStackNavigator()
function Main({ navigation }){
    //estado para armazenar todos o devs do mongoDB
    const [devs, setDevs] = useState([]);

    //estado para armazenar a localização atual de acordo com a latitude&longitude do GPS
    const [currentRegion, setCurrentRegion] = useState(null);

    const [techs, setTechs] = useState('');

useEffect(() =>{
    async function loadInitialPosition(){
        //ctrl+space mostra todos os retornos da função
        //granted == permissão concedida? (V F)
        const {granted} = await requestPermissionsAsync();

        if(granted){
            //pegando localização atual 
            const { coords } = await getCurrentPositionAsync({
                //por GPS
                enableHighAccuracy: true,
           });

           const {latitude, longitude} = coords;
           
           //atualizando o estado
           setCurrentRegion({
               latitude,
               longitude,
               //zoom
               latitudeDelta: 0.04,
               longitudeDelta: 0.04,
           })
        }
    }

    loadInitialPosition();
},[]);

//monitorando o estado de devs a cada alteração
useEffect(() => {
    //dev(propriedade) representa o novo dev cadastrado
    //...devs são devs já cadastrados
    //verificando se foi adicionado algum dev
    //e atualiza o estado    
    SubscribeToNewDevs(dev => setDevs([...devs, dev]))
}, [devs]);

function  setupWebsocket(){
    
    //descarta conexões anteriores
    Disconnect();

    //pegando as coordenadas atuais
    const { latitude, longitude} = currentRegion;

    //e passando para o socket
    Connect(
        latitude,
        longitude,
        techs
    );
}

async function loadDevs(){
    const {latitude, longitude} = currentRegion; 

    //obtendo dados de devs do servidor backend
    //api.get(/search, params) = fazendo uma requisição ao servidor backend pelo método get através da rota search
    const response =  await api.get('/search',{
        params: {
            latitude,
            longitude,
            techs
        }
    });
    //atribuindo todos os dados de devs ao estado
    setDevs(response.data.devs);
    setupWebsocket();

}

function handleRegionChanged(region){
    //console.log(region);
    //atualiza o estado com as coordenas da nova localização(region);
    setCurrentRegion(region);
}

// se a Região atual não foi concedida
if(!currentRegion){
    //então é nula(useState)
    return null;
}

    return  (
        <>
        <MapView 
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion} 
        style={styles.map}
        >   
        {devs.map(dev => (  
            /* Marcador de localização de acordo com as coordenadas*/
            <Marker
            key={dev._id}
            coordinate={{  
                longitude : dev.location.coordinates[0],   
                latitude : dev.location.coordinates[1],                           
               }}
            >  
               <Image
               style={styles.avatar} 
               source={{ uri: dev.avatar_url }}
               />
               
               <Callout  onPress={() => {
                   //navegação para outro componente(Profile) com o objeto nome de usuário
                   navigation.navigate('Profile', { github_username: dev.github_username});
               }}>
                   <View style={styles.callout}>                       
                       <Text  style={styles.devName}> {dev.name}  </Text>
                       <Text  style={styles.devBio}> {dev.bio}</Text>
                       <Text  style={styles.devTechs}> {dev.techs.join(', ')} </Text>
                   </View>
               </Callout>
           </Marker>
        ))}
        </MapView>
        <View style={styles.searchForm}>
            <TextInput 
            style={styles.searchInput} 
            placeholder="buscar devs por techs..."
            placeholderTextColor="#999"
            //coloca a primeira letra da primeira "word" em maiúsculo
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            //atualiza o estado a cada mudança de texto
            onChangeText={setTechs}
            />

        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#FFF" />
         </TouchableOpacity> 
        </View>
        </>
    );
}


const styles = StyleSheet.create({
    map:{
        flex: 1,
    },

    avatar:{
      width: 54,
      height: 54,  
      borderRadius: 4,
      borderWidth: 4,
      borderColor:'#FFF'
    },

    callout:{
        width: 260,
    },

    devName:{
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio:{
        color: '#666',
        marginTop: 5,
    },

    devTechs:{
       marginTop: 5,
    },

    searchForm:{
        //para ficar independente do container MapView
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        //fixar posição em cima do mapa
        zIndex: 5,
        //para ficar um do lado do outro em linha
        flexDirection: 'row',
    },

    searchInput:{
        flex:1,
        height:50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        //shadow settings
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 4,
            height: 4,
        },
        //visual shadow
        elevation: 2
    },

    loadButton:{
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15

    }
})

export default Main;

// flex : 1 == 100% da div
//{JavaScript{objeto}}
/* map== while, enquanto houver devs repetir os componentes
dev == propriedade que representa os dados no formato de vetor
<img src=''/> == <Image source={{ uri: dev.avatar_url }}/>
Callout=onClick
View == <div>
TextInput = <input type="text">
TouchableOpacity == botão estilizável 
MaterialIcons == icone
a View com TextInput is over the MapView

*/