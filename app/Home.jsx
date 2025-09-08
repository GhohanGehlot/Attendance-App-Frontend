import { Pressable, SafeAreaView, Text } from "react-native";
import AttendanceBox from "../components/AttendanceBox";
import { ScrollView } from "react-native-gesture-handler";


export default function Home(){
    return(
      <SafeAreaView>
        <ScrollView>
          <AttendanceBox/>
          <AttendanceBox/>
          <AttendanceBox/>
          


        </ScrollView>
        
      </SafeAreaView>
    
    );
}