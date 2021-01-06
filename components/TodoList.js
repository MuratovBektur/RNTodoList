import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import TodoItem from './TodoItem';



function TodoList({ list, onDeleteItem, onDoneItem, setStatus, onArchivedItem, newText, onSearch }) {

    const [active, setActive] = React.useState('all')

    const [searchText, setSearchText] = React.useState('')

    const setActiveStatus = (status) => {

        setStatus(status)
        setActive(status)

    }

    const onSearchItem = (text) => {
        setSearchText(() => text)
        onSearch(text)
    }

    const styles = StyleSheet.create({
        container: {
            paddingTop: 30,
            marginHorizontal: 20,
        },
        titleContainer: {
            alignItems: 'center',

        },
        title: {
            fontSize: 18
        },

        filterContainer: {
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        activeFilterItem: {
            paddingHorizontal: 10,
            marginHorizontal: 0,
            paddingVertical: 5,
            backgroundColor: "rgb(33, 150, 243)",
            borderWidth: 1,
            borderColor: 'rgb(33, 150, 243)'
        },
        filterItem: {
            paddingHorizontal: 10,
            marginHorizontal: 0,

            paddingVertical: 5,
            borderWidth: 1,
            borderColor: 'rgb(33, 150, 243)'
        },
        filterItemText: {
            color: 'black',
            fontWeight: "800"
        },
        activeFilterItemText: {
            color: 'white',
            fontWeight: "800"
        },
        textInputContainer: {
            flexDirection: 'row',
            justifyContent: 'center'
        },

        textInput: {
            // width: '50%',
            // alignSelf: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'grey'
        }


    })







    return (
        <View style={styles.container}>


            <View style={styles.titleContainer}>
                <Text style={styles.title}>Список задач</Text>
            </View>

            <View style={styles.filterContainer}>

                <TouchableOpacity onPress={() => setActiveStatus('all')} style={active == 'all' ? styles.activeFilterItem : styles.filterItem}>
                    <Text style={active == 'all' ? styles.activeFilterItemText : styles.filterItemText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveStatus('isRead')} style={active == 'isRead' ? styles.activeFilterItem : styles.filterItem}>
                    <Text style={active == 'isRead' ? styles.activeFilterItemText : styles.filterItemText}>Read</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveStatus('isArchived')} style={active == 'isArchived' ? styles.activeFilterItem : styles.filterItem}>
                    <Text style={active == 'isArchived' ? styles.activeFilterItemText : styles.filterItemText}>Archived</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Поиск задачи'
                    value={searchText}
                    onChangeText={onSearchItem}
                    onSubmitEditing={() => setSearchText('')}
                />
            </View>

            { list.length ?
                <FlatList data={list}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <TodoItem onDelete={onDeleteItem} newText={newText} done={onDoneItem} onArchived={onArchivedItem}  {...item} />} />
                // list.map(item => <TodoItem key={item.id} onDelete={onDeleteItem} done={onDoneItem}  {...item} />)
                : <Text style={{ textAlign: 'center', marginTop: 20 }}>Нет задач</Text>
            }



        </View>
    )
}


export default TodoList;