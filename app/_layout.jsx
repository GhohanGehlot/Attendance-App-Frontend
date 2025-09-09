import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Login from "./Login";
import { useState } from "react";
import Signup from "./Signup";
import Calendar from "./Calendar";


export default function RootLayout() {
    const [isLoggedIn , setIsLoggedIn] = useState(true);

    return isLoggedIn ? <Layout/> : <AuthLayout/>

    
}



export  function Layout(){

    const Drawer = createDrawerNavigator();

    return(
        
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} /> 
                <Drawer.Screen name="Calendar" component={Calendar}/>
            </Drawer.Navigator>
       
    )

}

export  function AuthLayout(){

    const Stack = createStackNavigator();

     return (
        
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

