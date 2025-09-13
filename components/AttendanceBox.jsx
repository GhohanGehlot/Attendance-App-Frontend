import { Pressable, Text, View } from "react-native";
import { styles } from "../Styles/home.js";
import { useNavigation } from "expo-router";
import { useSubject } from "../Store/subject.store.js";
import { useStore } from "../Store/calendar.store.js";


function AttendanceBox({ subjectName , subjectId }) {

    const navigate = useNavigation();
    
    const removeSubject = useSubject((state) => state.removeSubject);
    const attendancePerc = useStore((state) => state.attendancePerc);

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
        <Text style={styles.attendancePerc}>{`${attendancePerc()}%`}</Text>
       
      </View>
    </Pressable>
  );
}

export default AttendanceBox;
