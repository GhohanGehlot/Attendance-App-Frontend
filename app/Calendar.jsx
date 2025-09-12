import { Pressable, SafeAreaView, Text, View } from "react-native";
import { CalendarList, CalendarProvider } from "react-native-calendars";
import {styles} from "../Styles/calendar";
import { Menu } from "react-native-paper";
import { useState } from "react";

export default function Calendar({ route }) {

  const {id , subject} = route.params;
  const [visibleMenu , setVisibleMenu] = useState(false);
  const [menuDate , setMenuDate] = useState("");
  const [attendance , setAttendance ] = useState({});
  const [attendanceTracker , setAttendanceTracker] = useState({
    present : 0, 
    absent : 0,
    
  })


  function present(date){
    if(attendance[date] === "present" || attendance[date] === "absent"){
      return;
    }
    setAttendance(prev => ({
      ...prev , [date] : "present"
    }))
    setAttendanceTracker({ present: attendanceTracker.present + 1 , absent : attendanceTracker.absent});
    setVisibleMenu(false);
    
                  
                      
  }

  function absent(date){
    if(attendance[date] === "present" || attendance[date] === "absent"){
      return;
    }
     setAttendance(prev => ({
      ...prev , [date] : "absent"
    }))
    setAttendanceTracker({ present: attendanceTracker.present , absent : attendanceTracker.absent + 1});
    setVisibleMenu(false);
       
  }

  function Clear(date){
    if(attendance[date] === ""){
      return;
    }
    const newAttendance = {...attendance};
    delete newAttendance[date];
    setAttendance(newAttendance);
     if(attendance[date] === "present"){
      setAttendanceTracker({ present: attendanceTracker.present - 1 , absent : attendanceTracker.absent});
    }else if(attendance[date] === "absent") {
     setAttendanceTracker({ present: attendanceTracker.present , absent : attendanceTracker.absent - 1});
    }
    setVisibleMenu(false);

   
  }
 
    let totalPresentDays = attendanceTracker.present;
    let totalAbsentDays = attendanceTracker.absent;
    let totalDays = totalPresentDays + totalAbsentDays;
    let attendancePerc = Math.floor(totalPresentDays/totalDays * 100);
 

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
                
               

                dayComponent={({ date, state }) => {

                  const status = attendance[date.dateString];
                  
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
          <Text style={styles.statsValue}>{`${attendancePerc}% `}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Days Present:</Text>
          <Text style={styles.statsValue}>{totalPresentDays}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Days Absent:</Text>
          <Text style={styles.statsValue}>{totalAbsentDays}</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Overall Total Days:</Text>
          <Text style={styles.statsValue}>{totalDays}</Text>
        </View>
      </View>
    </View>
  );
}