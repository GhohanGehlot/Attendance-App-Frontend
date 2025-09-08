import { Pressable, SafeAreaView, Text } from 'react-native';
import {styles}  from'../Styles/home.js';




function AttendanceBox(){
    return(
        <Pressable style={styles.attendanceBox} >
            <Text style= {styles.attendanceText}>Accounts</Text>
            <Text style= {styles.attendancePerc}>75%</Text>
        </Pressable>
    )
}

export default AttendanceBox;