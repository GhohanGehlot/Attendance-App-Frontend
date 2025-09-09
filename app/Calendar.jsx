import { SafeAreaView, Text, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import {styles} from "../Styles/calendar";

export default function Calendar() {
  return (
    <SafeAreaView style={styles.container}>
      
      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        style={styles.calendar}
      />

      
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Attendance Stats</Text>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Attendance Percentage:</Text>
          <Text style={styles.statsValue}>--%</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Days Present:</Text>
          <Text style={styles.statsValue}>--</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Days Absent:</Text>
          <Text style={styles.statsValue}>--</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Overall Total Days:</Text>
          <Text style={styles.statsValue}>--</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}