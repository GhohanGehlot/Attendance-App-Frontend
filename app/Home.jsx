import { Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import AttendanceBox from "../components/AttendanceBox";
import { ScrollView } from "react-native-gesture-handler";
import AddButton from "../components/floatingAdd";
import { useState } from "react";
import { styles } from "../Styles/home.js";
import { useSubject } from "../Store/subject.store.js";



export default function Home(){

  const [modalVisible , setModalVisible] = useState(false);
  const [subjectName , setSubjectName] = useState(""); 

   const subjects = useSubject((state) => state.subjects);
   const setSubject = useSubject((state) => state.setSubject);
   

  function onPress(){
     setModalVisible(false);
     setSubject(subjectName);
     setSubjectName('');    

  }
  

    return(
      <SafeAreaView style={{ flex: 1 }}>

          <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
          >
            <View style={styles.modalWrapper}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Subject</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Enter subject name"
                  value={subjectName} 
                  onChangeText={(text) => setSubjectName(text)} 
                />
                <Pressable style={styles.submitBtn} onPress={() => onPress()}>
                  <Text style={styles.submitText}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </Modal>


      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        { subjects.map((subject) => {
          if(subject.name === '') return;
           return <AttendanceBox key={subject.id} subjectName={subject.name} subjectId={subject.id}  />
        })}
          
          

        </ScrollView>
        <AddButton onPress={() => {setModalVisible(!modalVisible);}}/>
      </View>
    </SafeAreaView>
    );

}