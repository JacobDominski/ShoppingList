//import react framework
import React, {useState, useEffect} from 'react'
//import react native components
import { StyleSheet, Text, View, ImageBackground, Pressable, FlatList, Modal } from 'react-native'
//import list data
import { list } from '../mock/data'
//import icons
import { FontAwesome } from '@expo/vector-icons';
//import useIsFocused to identify when to rerender data
import { useIsFocused } from '@react-navigation/native';

//function for home screen
export default Home = ({ navigation }) => {
  //lists stores all of the different lists the user has made
  const [lists, setLists] = useState(list)
  //data stores the data of one list once clicked on
  const [data, setData] = useState({})
  //data items stores the items of the lilst once clicked on
  const [dataItems, setDataItems] = useState([])
  //this hook determines if to show the modal
  const [modalVisible, setModalVisible] = useState(false)
  //will run when the home screen rerenders which updates the lists
  const isFocused = useIsFocused()
  //runs when home screen rerenders
  useEffect(()=>{
    const newData = navigation.addListener('focus', (e)=>{
      console.log("Back to Home Screen", lists)
    })
  }, [list])
  //returns homescreen
  return (
    //main container for holding all components
    //centers all child components horizontally and veritcally
    <View style={styles.container}>
      {/* view component holds components for the menu */}
      {/* makes child components render horizontally with flexDirection */}
      <View
        style={styles.top}
      >
        {/* Title create new shopping list */}
        <Text
          style={{
            fontSize: 30,
            marginRight: 10,

          }}
        >Create new Shopping List</Text>
        {/* button that navigates to new list screen */}
        <Pressable
          onPress={()=>{
            navigation.navigate("New List")
          }}
        >
          {/* icon to represent new list */}
          <FontAwesome name="plus-square" size={64} color="black" />
        </Pressable>
      </View>
      {/* popup view of list items */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>setModalVisible(false)}
      >
        {/* centers popup with justifyContent and alignItems */}
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          {/* The popup background */}
          <View style={styles.modalView}>
            {/* Everything in the list like the name and all the contents */}
            <View style={styles.modalList}>
              {/* name of the list as the title */}
              <Text style={styles.modalTitle}>Shopping List: {data.shoppingListName}</Text>
              {/* displays all the items of the list */}
              <FlatList 
                //because there's no key, we redifine key as id
                keyExtractor={ dataItems => dataItems.id}
                //displays all the items in the list
                data={dataItems}
                //displays the individual item in the list
                renderItem={(item, index)=>{
                  return (
                    // seperates the items in the list
                    <View style={{marginTop: 10}}>
                      {/* view that puts the text components in a row */}
                      <View style={styles.modalItemView}>
                        {/* number of item */}
                        <Text style={{fontSize: 20}}>{item.index+1}.</Text>
                        {/* name of item */}
                        <Text style={{fontSize: 20, marginRight: 50}}>{item.item.name}</Text>
                        {/* price of item */}
                        <Text style={{fontSize: 20}}>{item.item.price}</Text>
                      </View>
                      {/* adds an underline under each item */}
                      <View style={{borderBottomWidth: 2, width: "100%"}}></View>
                    </View>
                  )
                }}
              />
              {/* displays the total of all the items in the list */}
              <Text style={{fontSize: 22, marginTop: 10}}>Total: {data.total}</Text>
            </View>
            {/* close button to close the popup */}
            <Pressable
              style={styles.modalBtn}
              onPress={()=>setModalVisible(false)}
            >
              {/* text that says close for the button */}
              <Text style={styles.modalBtnText}>Close</Text>
            </Pressable>
          </View> 
        </View>
      </Modal>
      {/* View below the new shopping list button */}
      <View style={styles.bottom}>
        {/* checks if there are any lists, if no, display image background */}
        {/* to let user no they need to add a new list */}
        {lists.length === 0 && <ImageBackground 
        // background image source
          source={require('../assets/background.png')}
          // makes background stretch phone
          style={styles.background}
          resizeMode="cover"
        />}
        {/* displays all the lists */}
        {/* displays none if there are no lists */}
        <FlatList 
          //keyExtractor converts key to id
          keyExtractor={item => item.id}
          //uses the lists as the data
          data={lists}
          //renders the components
          renderItem={({item, index}) => {
            return (
              // each list being displayed is a clilckable button to open a popup
              <Pressable style={styles.listBtn}
                //when clicked
                onPress={()=>{
                  //enable the popup
                  setModalVisible(true)
                  //initialize the data of the list
                  setData(item)
                  //initialize all the items in the data of the list
                  setDataItems(item.items)
                  console.log("dataItems", dataItems)
                }}
              >
                {/* Displays the first letter of the list name */}
                <Text style={{
                  backgroundColor: item.color,
                  fontSize: 40,
                  color: "#fff",
                  borderRadius: 80,
                }}> {item.shoppingListName[0]} </Text>
                {/* Group the list name and total */}
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

// all the styles used
const styles = StyleSheet.create({
  //centers the main component horizontally and vertically while giving it a light grey background color
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //this is for the top section of the home page
  //flex is set to one while bottom is set to 9
  top: {
    flex: 1,
    backgroundColor: '#fff',
    width: "100%",
    padding: 10,
    //makes child components render horizontally
    flexDirection: "row",
    //centers horizontally on the main axis
    justifyContent: "center",
    //centers vertically
    alignItems: "center",
    elevation: 5,
  },
  //setting flex to 9 will create more room for the bottom 9:1
  bottom: {
    flex: 9,
    width: "100%",
    //centers horizontally
    justifyContent: 'center'
  },
  background: {
    width: "100%",
    height: "85%",
  },
  listBtn: {
    backgroundColor: "#fff",
    //makes child components render horizontally
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
  //aligns all the components for each list item
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
