import { Pressable, Text, View } from "react-native";
import { styles } from "../Styles/home.js";
import { useNavigation } from "expo-router";

function AttendanceBox() {

    const navigate = useNavigation();

  return (
    <Pressable style={styles.attendanceBox} onPress={() => {navigate.navigate('Calendar' , {name: 'Calendar'})}}>
      <Text style={styles.attendanceText}>Accounts</Text>
      <View style={styles.rightSection}>
        <Text style={styles.attendancePerc}>75%</Text>
      </View>
    </Pressable>
  );
}

export default AttendanceBox;
