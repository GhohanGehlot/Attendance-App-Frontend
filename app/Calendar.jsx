import { Pressable, SafeAreaView, Text, View } from "react-native";
import { CalendarList, CalendarProvider } from "react-native-calendars";
import {styles} from "../Styles/calendar";
import { Menu } from "react-native-paper";
import { useState } from "react";

export default function Calendar({ route }) {

  const {id , subject} = route.params;
  const [visibleMenu , setVisibleMenu] = useState(false);
  const [selectedDate , setSelectedDate] = useState(null);

  return (
    <View style={{ flex: 1 }}>
       
      <View style={{ height: 400 }}>


        
         
      <CalendarProvider
        onDateChanged = {(date) => {console.log(date)}} 
       >

          <CalendarList
                futureScrollRange={24}
                horizontal={true}
                pagingEnabled={true}
                style={styles.calendar}
                markingType={'custom'}
                dayComponent={({ date, state }) => (
                  <View>
                    <Pressable onPress={() => {
                      setSelectedDate(date.dateString);
                      setVisibleMenu(true);
                    }}>
                      <Text>{date.day}</Text>
                    </Pressable>

                    {visibleMenu && selectedDate === date.dateString && (
                      <View>
                        <Menu
                          visible={visibleMenu}
                          onDismiss={() => setVisibleMenu(false)}
                          anchor={<Text>{date.day}</Text>}
                        >
                          <Menu.Item title="Present" />
                          <Menu.Item title="Absent" />
                        </Menu>
                      </View>
                    )}
                  </View>
                )}


    onDayPress={(date) => {
      setSelectedDate(date.dateString);
      setVisibleMenu(true);
    }}
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