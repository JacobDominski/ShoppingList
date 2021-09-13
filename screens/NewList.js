import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList } from 'react-native'
import { list } from '../mock/data'

export default NewList = ({ navigation }) => {
  //controls rerendering of the flat list
  const [selectedId, setSelectedId] = useState(true);
  //holds all the data of the list
  const [listItems, setListItems] = useState([])
  //name of list
  const [listName, setListName] = useState('')
  //total price
  const [total, setTotal] = useState(0)

  const randomColor = () => {
    const hue = Math.round(Math.random() * 360)
    const color = `hsl(${hue}, 100%, 30%)`
    return color
  }

  const calculateTotal = () => {
    var sum = 0;
    
    listItems.forEach(item => {
      if(!isNaN(item.price))
        sum += item.price
    })
    sum = sum.toFixed(2)
    setTotal(sum)
  }

  return (
    <View style={styles.container}>
       <View style={styles.inputView}>
        <Text style={styles.title}>New List: </Text>
        <TextInput 
          style={styles.input}
          placeholder="Name of list"
          maxLength={20}
          onChangeText={text => {
            setListName(text)
          }}
        />
      </View>
      {/* add flat list of items */}
      <FlatList 
        style={styles.list}
        data={listItems}
        keyExtractor={item => item.id}
        extraData={selectedId}
        renderItem={({ item, index }) => {
          return (
            <View>
              <View style={styles.inputView}>
                <Text style={{fontSize: 20}}>{index+1}.</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Name"
                  maxLength={20}
                  onChangeText={text => {
                    item.name = text
                  }}
                  />
                <TextInput 
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Price"
                  maxLength={10}
                  onChangeText={text => {
                    item.price = parseFloat(text)
                    calculateTotal()
                  }}
                />
              </View>
              <View style={{borderBottomWidth: 2, width: "100%"}}></View>
            </View>
          )
        }}
      />
      <Text style={styles.title}>Total: {total}</Text>
      
      <View style={styles.newItem}>
        <Pressable style={styles.newItemBtn}
          onPress={()=>{
            //create new item for list
            const newList = listItems
            const uuid = uuidv4()
            newList.push({id: uuid})
            console.log("New Item", newList)
            setListItems(newList)
            setSelectedId(!selectedId)
          }}
        >
          <Text style={styles.btnText}>Add Item</Text>
        </Pressable>
        <View style={{marginHorizontal: 10}}>{/* invisible seperator */}</View>
        <Pressable style={styles.newItemBtn}
          onPress={()=>{
            const newList = listItems
            newList.pop()
            console.log("Delete Item", newList)
            setListItems(newList)
            setSelectedId(!selectedId)
          }}
        >
          <Text style={styles.btnText}>Subtract Item</Text>
        </Pressable>
      </View>

      <Pressable 
        style={styles.completeBtn}
        onPress={()=> {
          const data = {
            id: uuidv4(),
            shoppingListName: listName,
            color: randomColor(),
            total: total,
            items: listItems,
          }
          list.push(data)
          console.log(list)
          navigation.popToTop()
        }}
      >
        <Text style={styles.btnText}>Complete List</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#fff",
    padding: 20,
  },
  list: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
  },
  listNameInput: {
    lineHeight: 60
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    padding: 5,
    flexGrow: 1,
    marginVertical: 5,
    fontSize: 20,
  },

  newItem: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  newItemBtn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    flexGrow: 1,
    marginVertical: 20,
    
  },
  btnText: {
    color: "white", 
    fontSize: 20, 
    textAlign: "center"
  },
  completeBtn: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10
  }
})