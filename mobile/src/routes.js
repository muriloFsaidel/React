import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

//páginas da aplicação
import Main from './pages/Main';
import Profile from './pages/Profile';

// instanciando as rotas da aplicação para serem mostradas em tela
const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            //escolha 'tela'
            screen: Main,
            navigationOptions: {
                title: 'DevRadar',
            },
        },
        Profile:{
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'
            },
        },
    },{
        // estilo padrão para ambas as rotas
        defaultNavigationOptions:{
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#7D40E7',
                
            }
        }
    })
);

export default Routes;