import React from 'react';
import { Pressable, StyleSheet, Keyboard, TextInput, TouchableOpacity, View } from 'react-native';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faArchive, faTrash } from '@fortawesome/free-solid-svg-icons';


function TodoItem({ isRead, isArchived, text, onDelete, id, done, onArchived, newText }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: StyleSheet.hairlineWidth
        },
        actionsContainer: {
            flexDirection: 'row',
        },
        textStyle: {
            fontSize: 17,
            textDecorationLine: isRead ? "line-through" : 'none',
            color: isArchived ? 'rgba(0,0,0,.45)' : 'black',
            fontWeight: isArchived ? "200" : 'normal'
        }
    })

    const textInputRef = React.useRef()

    const [canEdit, setCanEdit] = React.useState(false)

    const [changedText, setChangedText] = React.useState('')

    const onExitBtn = (e) => {
        setCanEdit(false)
    }

    React.useEffect(() => {
        setChangedText(text)
        Keyboard.addListener('keyboardDidHide', onExitBtn);
        () => Keyboard.removeListener('keyboardDidHide', onExitBtn);

    }, [])

    React.useEffect(() => {
        if (canEdit) textInputRef.current.focus();
        else setChangedText(text)
    })

    const onEdit = (state) => {
        setCanEdit(() => state)
        if (!state) newText(id, changedText)

    }


    return (
            <View style={styles.container} >

                <Pressable style={{ marginRight: 10 }} onPress={() => done(id)}>

                    <TextInput
                        ref={textInputRef}
                        style={styles.textStyle}
                        editable={canEdit}
                        onChangeText={(txt) => { setChangedText(txt); console.log(txt); }}
                        onSubmitEditing={() => onEdit(false)}
                        value={changedText}
                    />
                </Pressable>

                <View style={styles.actionsContainer}>
                    <Pressable>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => onEdit(true)} >
                            <FontAwesomeIcon icon={faEdit} size={20} color={'green'} />
                        </TouchableOpacity>
                    </Pressable>

                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => onDelete(id)}>
                        <FontAwesomeIcon icon={faTrash} size={20} color={'red'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => onArchived(id)}>
                        <FontAwesomeIcon icon={faArchive} size={20} color={'grey'} />
                    </TouchableOpacity>

                </View>

            </View>

    );
}


export default TodoItem;