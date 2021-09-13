import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, Pressable, FlatList, Modal } from 'react-native'
import { list } from '../mock/data'
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

export default Home = ({ navigation }) => {
  const [lists, setLists] = useState(list)
  const [data, setData] = useState({})
  const [dataItems, setDataItems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  
  const isFocused = useIsFocused()

  useEffect(()=>{
    const newData = navigation.addListener('focus', (e)=>{
      console.log("Back to Home Screen", lists)
    })
  }, [list])
  
  return (
    <View style={styles.container}>
      <View
        style={styles.top}
      >
        <Text
          style={{
            fontSize: 30,
            marginRight: 10,

          }}
        >Create new Shopping List</Text>
        <Pressable
          onPress={()=>{
            navigation.navigate("New List")
          }}
        >
          <FontAwesome name="plus-square" size={64} color="black" />
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <View style={styles.modalView}>
            <View style={styles.modalList}>
              <Text style={styles.modalTitle}>Shopping List: {data.shoppingListName}</Text>
              <FlatList 
                keyExtractor={ dataItems => dataItems.id}
                data={dataItems}
                renderItem={(item, index)=>{
                  return (
                    <View style={{marginTop: 10}}>
                      <View style={styles.modalItemView}>
                        <Text style={{fontSize: 20}}>{item.index+1}.</Text>
                        <Text style={{fontSize: 20, marginRight: 50}}>{item.item.name}</Text>
                        <Text style={{fontSize: 20}}>{item.item.price}</Text>
                      </View>
                      <View style={{borderBottomWidth: 2, width: "100%"}}></View>
                    </View>
                  )
                }}
              />
              <Text style={{fontSize: 22, marginTop: 10}}>Total: {data.total}</Text>
            </View>
            <Pressable
              style={styles.modalBtn}
              onPress={()=>setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>Close</Text>
            </Pressable>
          </View> 
        </View>
      </Modal>

      <View style={styles.bottom}>
        {lists.length === 0 && <ImageBackground 
          source={require('../assets/background.png')}
          style={styles.background}
          resizeMode="cover"
        />}
        <FlatList 
          keyExtractor={item => item.id}
          data={lists}
          renderItem={({item, index}) => {
            return (
              <Pressable style={styles.listBtn}
                onPress={()=>{
                  setModalVisible(true)
                  setData(item)
                  setDataItems(item.items)
                  console.log("dataItems", dataItems)
                }}
              >
                <Text style={{
                  backgroundColor: item.color,
                  fontSize: 40,
                  color: "#fff",
                  borderRadius: 80,
                }}> {item.shoppingListName[0]} </Text>
                <View style={{marginHorizontal: 20}}>
                  <Text style={{fontSize: 20}}>{item.shoppingListName}</Text>
                  <Text style={{fontSize: 16}}>Total: {item.total}</Text>
                </View>
              </Pressable>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    backgroundColor: '#fff',
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  bottom: {
    flex: 9,
    width: "100%",
    justifyContent: 'center'
  },
  background: {
    width: "100%",
    height: "85%",
  },
  listBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 20,
    elevation: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
    width: "95%",
    height: "95%",
  },
  modalList: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
  },
  modalItemView: {
    flexDirection: "row",
    alignItems: "center"
  },
  modalBtn: {
    width: "100%",
    padding: 10,
    backgroundColor: "#aaa"
  },
  modalBtnText: {
    textAlign: "center",
    fontSize: 20,
  },
});
