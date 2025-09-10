import { SafeAreaView, Text, View } from "react-native";
import { CalendarList, CalendarProvider } from "react-native-calendars";
import {styles} from "../Styles/calendar";

export default function Calendar({ route }) {

  const {id , subject} = route.params;

  return (
    <View style={{ flex: 1 }}>
       
      <View style={{ height: 400 }}>
         
      <CalendarProvider  >

          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            style={styles.calendar}
            onDateChanged= {(date) => console.log(date)}
          />

      </CalendarProvider>

      </View>
      

      
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>{route.params.subject}</Text>

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
    </View>
  );
}