import { Pressable, SafeAreaView, Text, View } from "react-native";
import AttendanceBox from "../components/AttendanceBox";
import { ScrollView } from "react-native-gesture-handler";
import AddButton from "../components/floatingAdd";




export default function Home(){

    return(
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <AttendanceBox onPress/>
          <AttendanceBox />
          <AttendanceBox />
        </ScrollView>
        <AddButton onPress={() => console.log("Add clicked!")} />
      </View>
    </SafeAreaView>
    );

}