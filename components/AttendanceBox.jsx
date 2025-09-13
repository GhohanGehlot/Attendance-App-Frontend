import { Pressable, Text, View } from "react-native";
import { styles } from "../Styles/home.js";
import { useNavigation } from "expo-router";
import { useStore } from "../Store/subject.store.js";

function AttendanceBox({ subjectName , subjectId }) {

    const navigate = useNavigation();
    
    const removeSubject = useStore((state) => state.removeSubject);

    function onDelete(id){
      removeSubject(id);
    }
   

  return (
    <Pressable style={styles.attendanceBox} onPress={() => {navigate.navigate('Calendar' , { id: subjectId ,subject: subjectName})}}>
       <Pressable
       style={{
            backgroundColor: "red",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => onDelete(subjectId)}
       > 
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>X</Text>
      </Pressable>
      <Text style={styles.attendanceText}>{subjectName}</Text>
      <View style={styles.rightSection}>
        <Text style={styles.attendancePerc}>75%</Text>
       
      </View>
    </Pressable>
  );
}

export default AttendanceBox;
