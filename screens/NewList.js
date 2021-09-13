//import react framework
import React, { useState } from 'react'
//import uuid to generate id for flatlist
import { v4 as uuidv4 } from 'uuid';
//import all components
import { StyleSheet, Text, View, Pressable, TextInput, FlatList } from 'react-native'
//import data which is all the lists
import { list } from '../mock/data'

//new list screen
export default NewList = ({ navigation }) => {
  //controls rerendering of the flat list
  const [selectedId, setSelectedId] = useState(true);
  //holds all the data of the list
  const [listItems, setListItems] = useState([])
  //name of list
  const [listName, setListName] = useState('')
  //total price
  const [total, setTotal] = useState(0)
  //function that finds a random hsl color
  const randomColor = () => {
    //calculates the hue between 0 and 360
    const hue = Math.round(Math.random() * 360)
    const color = `hsl(${hue}, 100%, 30%)`
    //returns color
    return color
  }

  //finds the total
  const calculateTotal = () => {
    var sum = 0;
    ///goes through each item
    listItems.forEach(item => {
      //if the price is a number
      if(!isNaN(item.price))
        //add the price of that item to the sum
        sum += item.price
    })
    //make it go to two decimal
    sum = sum.toFixed(2)
    setTotal(sum)
  }
  //render the new list screen
  return (
    //container for main screen
    <View style={styles.container}>
      {/* Top part */}
      <View style={styles.inputView}>
        <Text style={styles.title}>New List: </Text>
        {/* input list name */}
        <TextInput 
          style={styles.input}
          //default text
          placeholder="Name of list"
          //max characters
          maxLength={20}
          //rerender the hook when text changes
          onChangeText={text => {
            setListName(text)
          }}
        />
      </View>
      {/* add flat list of items */}
      <FlatList 
        style={styles.list}
        data={listItems}
        //converst key to id
        keyExtractor={item => item.id}
        //extra data rerenders when selectedID changes value
        extraData={selectedId}
        renderItem={({ item, index }) => {
          return (
            //displays new item
            <View>
              <View style={styles.inputView}>
                 {/* displays number of item */}
                <Text style={{fontSize: 20}}>{index+1}.</Text>
                {/* input text for name */}
                <TextInput 
                  style={styles.input}
                  //default text
                  placeholder="Name"
                  //max characters
                  maxLength={20}
                  //when text changes
                  onChangeText={text => {
                    //reset the item's name to text
                    item.name = text
                  }}
                  />
                  {/* input text for price */}
                <TextInput 
                  style={styles.input}
                  //change keyboard type to numbers
                  keyboardType="numeric"
                  //dafult text
                  placeholder="Price"
                  //max length
                  maxLength={10}
                  //when text changes
                  onChangeText={text => {
                    //reset the price by converting price text to float
                    item.price = parseFloat(text)
                    //call the calculate total function
                    calculateTotal()
                  }}
                />
              </View>

              {/* underline for each item */}
              <View style={{borderBottomWidth: 2, width: "100%"}}></View>
            </View>
          )
        }}
      />
      {/* auto calculates total at the bottom */}
      <Text style={styles.title}>Total: {total}</Text>
      {/* view for the add button */}
      <View style={styles.newItem}>
        {/* add button */}
        <Pressable style={styles.newItemBtn}
        //when clicked
          onPress={()=>{
            //create new item for list
            const newList = listItems
            const uuid = uuidv4()
            newList.push({id: uuid})
            console.log("New Item", newList)
            //update listItems
            setListItems(newList)
            //update selected to rerender flatlist
            setSelectedId(!selectedId)
          }}
        >
          {/* button to add item */}
          <Text style={styles.btnText}>Add Item</Text>
        </Pressable>
        {/* invisiable seperator to seperate between the add and subtract button */}
        <View style={{marginHorizontal: 10}}>{/* invisible seperator */}</View>
        {/* subtract button deletes an item from the list */}
        <Pressable style={styles.newItemBtn}
        // when clicked
          onPress={()=>{
            // update listItems
            const newList = listItems
            //delete last item
            newList.pop()
            console.log("Delete Item", newList)
            // update listItems
            setListItems(newList)
            // update selectedID to rerender list
            setSelectedId(!selectedId)
          }}
        >
          <Text style={styles.btnText}>Subtract Item</Text>
        </Pressable>
      </View>
{/* complete button */}
      <Pressable 
        style={styles.completeBtn}
        // when clicked
        onPress={()=> {
          // create data object to store the list
          const data = {
            // set the id to uuid
            id: uuidv4(),
            // set the shopping list name to what the user entered
            shoppingListName: listName,
            // store a random color for the home screen
            color: randomColor(),
            // save the total
            total: total,
            // store all the items
            items: listItems,
          }
          // add that to the list where all the lists are stored
          list.push(data)
          console.log(list)
          // go back to the top
          navigation.popToTop()
        }}
      >
        <Text style={styles.btnText}>Complete List</Text>
      </Pressable>
    </View>
  )
}
// all styles
const styles = StyleSheet.create({
  // flex which enables the flex layout
  container: {
    flex: 1,
    backgroundColor : "#fff",
    padding: 20,
  },
  // style for the window where all the items are
  list: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10
  },
  // title for the name list
  title: {
    fontSize: 24,
  },
  // style for the input list name
  listNameInput: {
    lineHeight: 60
  },
  // style that makes child components render horizontally
  inputView: {
    flexDirection: "row",
    // align vertically
    alignItems: "center"
  },
  // style for the input for item name and price
  input: {
    padding: 5,
    // flex grow makes component take up the whole width
    flexGrow: 1,
    marginVertical: 5,
    fontSize: 20,
  },
  // style that seperates the add and subtract item
  newItem: {
    justifyContent: "space-between",
    // renders the buttons horizontally
    flexDirection: "row",
  },
  // style for complete button
  newItemBtn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    // flex grow takes up whole width
    flexGrow: 1,
    marginVertical: 20,
    
  },
  // style that styles the text for buttons
  btnText: {
    color: "white", 
    fontSize: 20, 
    textAlign: "center"
  },
  // style that styles the text for complete button
  completeBtn: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10
  }
})