import { Pressable, SafeAreaView, Text, View } from "react-native";
import { CalendarList, CalendarProvider } from "react-native-calendars";
import {styles} from "../Styles/calendar";
import { Menu } from "react-native-paper";
import { useState } from "react";
import { useStore } from "../Store/calendar.store";

export default function Calendar({ route }) {

  const {id , subject} = route.params;
  const [visibleMenu , setVisibleMenu] = useState(false); 
  const [menuDate , setMenuDate] = useState(""); 
  
 

  const attendance = useStore((state) => state.attendance);
  const markPresent = useStore((state => state.markPresent));
  const markAbsent = useStore((state) => state.markAbsent);
  const clearAttendance = useStore((state) => state.clearAttendance);
  const attendancePerc = useStore((state) => state.attendancePerc);
  



  function present( date){
    if(attendance[id]?.days[date] === "present" || attendance[id]?.days[date] === "absent"){
      return;
    }
    markPresent(id ,date);
    setVisibleMenu(false);
    
                  
                      
  }

  function absent(date){
    if(attendance[id]?.days[date] === "present" ||attendance[id]?.days[date] === "absent"){
      return;
    }
     markAbsent(id ,date);
    setVisibleMenu(false);
       
  }

  function Clear(date){
    if(attendance[id]?.days[date] === ""){
      return;
    }


    clearAttendance(id ,date);
    
    
    setVisibleMenu(false);

   
  }
 
    

  const tracker = attendance[id]?.attendanceTracker ?? { present: 0, absent: 0 };
    
    
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
                markingType={'custom'}
                
               
                dayComponent={({ date }) => {

                  const status = attendance[id]?.days[date.dateString];
                  
                 return(
                  <View style={{height: 35 , width: 45 , alignItems: "center" , backgroundColor: status === "present" ? "green" : status === "absent" ? "red" : "white" }}>
                    <Pressable onPress={() => {
                      
                      setMenuDate(date.dateString)
                      setVisibleMenu(true);
                      
                      
                      }}>
                      <Text style= {{fontSize: 15 }}>{date.day}</Text>
                    </Pressable>
                    

                    {visibleMenu && menuDate === date.dateString && (
                     
                        <Menu
                          visible={visibleMenu}
                          onDismiss={() => setVisibleMenu(false)}
                          anchor={<Text>{date.day}</Text>}
                        >
                          <Menu.Item title="Present" onPress={() => present(date.dateString)} />
                          <Menu.Item title="Absent" onPress={() => absent(date.dateString)} />
                          <Menu.Item title="Clear" onPress={() => Clear(date.dateString)} />

                        </Menu>
                     
                    )}
                  </View>
                 ) 
                }}         
            />      
                       
      </CalendarProvider>

        

      </View>
            
               

      
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>{route.params.subject}</Text>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Attendance Percentage:</Text>
          <Text style={styles.statsValue}>{`${attendancePerc(id)}% `}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Days Present:</Text>
          <Text style={styles.statsValue}>{tracker.present}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Days Absent:</Text>
          <Text style={styles.statsValue}>{tracker.absent}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Overall Total Days:</Text>
          <Text style={styles.statsValue}>{tracker.present + tracker.absent}</Text>
        </View>
      </View>
    </View>
  );
}