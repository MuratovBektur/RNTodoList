import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import TodoList from './TodoList';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Todo() {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('all')
    const [searchText, setSearchText] = useState('')

    const [list, setList] = React.useState(
        [
            { id: 1, text: "Задача 1", isArchived: false, isRead: false },
            { id: 2, text: "Задача 2", isArchived: false, isRead: false },
            { id: 3, text: "Задача 3", isArchived: false, isRead: false },
            { id: 4, text: "Задача 4", isArchived: false, isRead: false },
            { id: 5, text: "Задача 5", isArchived: false, isRead: false },
            { id: 6, text: "Задача 6", isArchived: false, isRead: false },
            { id: 7, text: "Задача 7", isArchived: false, isRead: false },
            // { id: 8, text: "Задача 8", isArchived: false, isRead: false },
            // { id: 9, text: "Задача 9", isArchived: false, isRead: false },
            // { id: 10, text: "Задача 10", isArchived: false, isRead: false },
            // { id: 11, text: "Задача 11", isArchived: false, isRead: false },
            // { id: 12, text: "Задача 12", isArchived: false, isRead: false },
            // { id: 13, text: "Задача 13", isArchived: false, isRead: false },
            // { id: 14, text: "Задача 14", isArchived: false, isRead: false },
            // { id: 15, text: "Задача 15", isArchived: false, isRead: false },
            // { id: 16, text: "Задача 16", isArchived: false, isRead: false },
        ]
    )


    React.useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('todo-list')
                setList(jsonValue != null ? JSON.parse(jsonValue) : list)
            } catch (e) {
            }
        }
        getData()
    }, [])

    const filterBySearchText = (text) => {
        return status == "all" ? 
        list.filter(item => item.text.toUpperCase().includes(text.toUpperCase())) 
        : list.filter(item => item[status]).filter(item => item.text.toUpperCase().includes(text.toUpperCase())) 
    }




    const filteredList = React.useMemo(() => {
        
        if (searchText === '') {
            return status == "all" ? list : list.filter(item => item[status])
        }
        return filterBySearchText(searchText)
    }, [list, status, searchText])

    React.useEffect(() => {
        const storeData = async (list) => {
            try {
                const jsonValue = JSON.stringify(list)
                await AsyncStorage.setItem('todo-list', jsonValue)
            } catch (e) {
            }
        }
        storeData(list)

    }, [list])


    const onChangeText = (text) => { setText(text) }



    const setNewText = (id, text) => setList((list) => list.map(item => item.id == id ? { ...item, text } : item))



    const onDeleteItem = (id) => setList(() => list.filter(item => item.id !== id))

    const onArchivedItem = (id) => setList(() => list.map(item => item.id === id ? { ...item, isArchived: !item.isArchived } : item))

    const onDoneItem = (id) => setList(() => list.map(item => item.id === id ? { ...item, isRead: !item.isRead } : item))

    const onAddItem = () => {
        console.log('text', text);
        if (text == '' || text == null) return
        setList((list) => list.concat({ id: new Date(), text, isArchived: false, isRead: false }))
        setText(null)
    }

    const onSearch = (text) => setSearchText(() => text)

    return (
        <View style={{ flex: 1 }}>

            <ScrollView >

                <TodoList newText={setNewText} onSearch={onSearch} setStatus={(status) => setStatus(status)} onArchivedItem={onArchivedItem} onDeleteItem={onDeleteItem} onDoneItem={onDoneItem} list={filteredList} />
            </ScrollView>

            <TextInput
                style={styles.textInput}
                placeholder='Добавить задачу'
                value={text}

                onChangeText={onChangeText}
                onSubmitEditing={onAddItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    textInput: {
        width: "100%",
        height: 40,
        paddingHorizontal: 20,
        borderWidth: StyleSheet.hairlineWidth
    }
})

export default Todo;