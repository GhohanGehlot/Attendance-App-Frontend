import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Login from "./Login";
import { useState } from "react";
import Signup from "./Signup";
import Calendar from "./Calendar";
import { PaperProvider } from "react-native-paper";


export default function RootLayout() {

    const [isLoggedIn , setIsLoggedIn] = useState(true);

    

    return isLoggedIn ? <Layout/> : <AuthLayout/>

    
}



export  function Layout(){

    const Drawer = createDrawerNavigator();

    return(
        <PaperProvider>
            <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={CalendarLayout} /> 
            <Drawer.Screen name="Logout" component={AuthLayout} />
                
                
            </Drawer.Navigator>
        </PaperProvider>
            
       
    )

}

export  function AuthLayout(){

    const Stack = createStackNavigator();
    
     return (

      <PaperProvider>
             
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>

      </PaperProvider>
   
  );
}

export function CalendarLayout(){
    const Stack = createStackNavigator();

    return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} /> 
       <Stack.Screen name="Calendar" component={Calendar}/>
    </Stack.Navigator>

    )
}

