import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Login from "./Login";
import { useState } from "react";
import Signup from "./Signup";
import Calendar from "./Calendar";
import { PaperProvider } from "react-native-paper";
import { Text, View } from "react-native";
import { useStore } from "../Store/calendar.store";


export default function RootLayout() {

    const [isLoggedIn , setIsLoggedIn] = useState(true);

    

    return isLoggedIn ? <Layout/> : <AuthLayout/>

    
}


function CustomDrawerContent() {
  return (
    <View style={{ flex: 1, justifyContent: "justify-center", marginTop: 50 }}>
      <Text style={{ textAlign: "center", color: "#6A994E", fontWeight: "bold" }}>
        made with love ❤️ by Ghohan
      </Text>
    </View>
  );
}

export function Layout() {
  const Drawer = createDrawerNavigator();
  const avgAttendance = useStore((state) => state.avgAttendance());

  return (
    <PaperProvider>
      <Drawer.Navigator
        initialRouteName="Nmites lifeLine"
        drawerContent={() => <CustomDrawerContent />}
        screenOptions={{
          headerStyle: { backgroundColor: "#6A994E" },
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#fff",
          drawerActiveBackgroundColor: "#6A994E",
          drawerActiveTintColor: "#fff",
          headerRight: () => (
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                marginRight: 10,
              }}
            >
              Avg : {avgAttendance}%
            </Text>
          ),
        }}
      >
        <Drawer.Screen name="Nmites lifeLine" component={CalendarLayout} />
        {/* <Drawer.Screen name="Logout" component={AuthLayout} /> */}
      </Drawer.Navigator>
    </PaperProvider>
  );
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
      <Stack.Screen name="Home " component={Home} /> 
       <Stack.Screen name="Calendar" component={Calendar}/>
    </Stack.Navigator>

    )
}

