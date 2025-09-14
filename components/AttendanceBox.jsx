import { Pressable, Text, View } from "react-native";
import { styles } from "../Styles/home.js";
import { useNavigation } from "expo-router";
import { useSubject } from "../Store/subject.store.js";
import { useStore } from "../Store/calendar.store.js";
import { useState } from "react";


function AttendanceBox({ subjectName , subjectId }) {

    const navigate = useNavigation();

    const [ attendancePercentage , setAttendancePercentage] = useState();
    
    const removeSubject = useSubject((state) => state.removeSubject);
    // const attendancePerc = useStore((state) => state.attendancePerc);
    const present = useStore((state) => state.attendanceTracker.present);
  const absent = useStore((state) => state.attendanceTracker.absent);

   const attendancePerc = present + absent === 0 
  ? 0 
   : Math.floor((present / (present + absent)) * 100);


    function onDelete(id){
      removeSubject(id);
    }
   

  return (
    <Pressable style={styles.attendanceBox} onPress={() => {navigate.navigate('Calendar' , { id: subjectId ,subject: subjectName})}}>
       <Pressable
       style={styles.deleteButton}
          onPress={() => onDelete(subjectId)}
       > 
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>X</Text>
      </Pressable>
      <Text style={styles.attendanceText}>{subjectName}</Text>
      <View style={styles.rightSection}>
        <Text style={styles.attendancePerc}>{`${attendancePerc}%`}</Text>
       
      </View>
    </Pressable>
  );
}

export default AttendanceBox;
