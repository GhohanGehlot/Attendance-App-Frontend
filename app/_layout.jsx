import { createDrawerNavigator } from "@react-navigation/drawer"
import Home from "./Home";
import Login from "./Login";
import { useState } from "react";
import Signup from "./Signup";
import Calendar from "./calendar";


export default function Layout(){

    const Drawer = createDrawerNavigator();
    const [isLoggedIn , setIsLoggedIn] = useState(true);
   

   
    return(
        
            <Drawer.Navigator initialRouteName="Home">
        
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login}/>
            <Drawer.Screen name="Signup" component={Signup}/>
            <Drawer.Screen name="Calendar" component={Calendar}/>
                
                
            </Drawer.Navigator>
       
    )
    


}