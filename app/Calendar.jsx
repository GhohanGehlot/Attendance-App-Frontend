import { Pressable, Text, View } from "react-native";
import { CalendarList, CalendarProvider } from "react-native-calendars";
import { styles } from "../Styles/calendar";
import { Menu } from "react-native-paper";
import { useState } from "react";
import { useStore } from "../Store/calendar.store";

export default function Calendar({ route }) {
  const { id, subject } = route.params;
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [menuDate, setMenuDate] = useState("");

  
  const attendance = useStore((state) => state.attendance);
  const markPresent = useStore((state) => state.markPresent);
  const markAbsent = useStore((state) => state.markAbsent);
  const clearAttendance = useStore((state) => state.clearAttendance);
  const attendancePerc = useStore((state) => state.attendancePerc);

  
  const tracker = attendance[id]?.attendanceTracker ?? { present: 0, absent: 0 };
 

  
  function present(date) {

    markPresent(id, date);
    setVisibleMenu(false);
  }

  
  function absent(date) {
    markAbsent(id, date);
    setVisibleMenu(false);
  }

  
  function Clear(date) {
    clearAttendance(id, date);
    setVisibleMenu(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 400 }}>
        <CalendarProvider>
          <CalendarList
            id={id}
            futureScrollRange={24}
            horizontal={true}
            pagingEnabled={true}
            style={styles.calendar}
            markingType={"custom"}
            dayComponent={({ date }) => {
              const dayData = attendance[id]?.days?.[date.dateString];
              const presentCount = dayData?.present ?? 0;
              const absentCount = dayData?.absent ?? 0;
              const isCurrentDay = menuDate === date.dateString;

              
              let bgColor = "white";
              if (presentCount > absentCount && presentCount > 0) bgColor = "green"; 
              else if (absentCount > presentCount && absentCount > 0) bgColor = "red"; 
              else if (presentCount > 0 || absentCount > 0) bgColor = "#ffa90a"; 

              return (
                <View
                  style={{
                    height: 35,
                    width: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: bgColor,
                    borderWidth: isCurrentDay ? 1.5 : 0,
                    borderColor: isCurrentDay ? "#6A994E" : "transparent",
                    borderRadius: 6,
                  }}
                >
                  <Menu
                    visible={visibleMenu && isCurrentDay}
                    onDismiss={() => setVisibleMenu(false)}
                    anchor={
                      <Pressable
                        onPress={() => {
                          setMenuDate(date.dateString);
                          setVisibleMenu(true);
                        }}
                        style={{ alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 15 }}>{date.day}</Text>
                        {(presentCount > 0 || absentCount > 0) && (
                          <Text style={{ fontSize: 10, color: "#333" }}>
                            P:{presentCount} A:{absentCount}
                          </Text>
                        )}
                      </Pressable>
                    }
                  >
                    <Menu.Item title="Present" onPress={() => present(date.dateString)} />
                    <Menu.Item title="Absent" onPress={() => absent(date.dateString)} />
                    <Menu.Item title="Clear" onPress={() => Clear(date.dateString)} />
                  </Menu>
                </View>
              );
            }}
          />
        </CalendarProvider>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>{subject}</Text>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Attendance Percentage:</Text>
          <Text style={styles.statsValue}>{`${attendancePerc(id)}%`}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Lectures Present:</Text>
          <Text style={styles.statsValue}>{tracker.present}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Lectures Absent:</Text>
          <Text style={styles.statsValue}>{tracker.absent}</Text>
        </View>

      
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Overall Total Lectures:</Text>
          <Text style={styles.statsValue}>{tracker.present + tracker.absent}</Text>
        </View>
      </View>
    </View>
  );
}
