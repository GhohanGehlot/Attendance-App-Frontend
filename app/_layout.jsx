import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import Login from "./login";


export default function Layout(){

    const Drawer = createDrawerNavigator();
   
    return(
        
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home}/>
                <Drawer.Screen name="Logout" component={Login}/>
            </Drawer.Navigator>
       
    )
    


}