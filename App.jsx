import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PRIMARY = '#9395D3';


const DEFAULT_TODOS = [
  {
    id: '1',
    title: 'Todo Title',
    detail: 'Todo subTitle',
    completed: false,
  },
  {
    id: '2',
    title: 'Practice JavaScript',
    detail: 'Closures, promises, async/await',
    completed: true,
  },
  {
    id: '3',
    title: 'Create Todo App',
    detail: 'CRUD operations with hooks',
    completed: false,
  },
];

export default function App() {
  const [todos, setTodos] = useState(DEFAULT_TODOS);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (!title.trim()) return;

    if (editId) {
      setTodos(todos.map(t =>
        t.id === editId ? { ...t, title, detail } : t
      ));
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          title,
          detail,
          completed: false,
        },
      ]);
    }

    setTitle('');
    setDetail('');
    setShowAdd(false);
  };

  const deleteTodo = id => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const editTodo = item => {
    setTitle(item.title);
    setDetail(item.detail);
    setEditId(item.id);
    setShowAdd(true);
  };

  const toggleDone = id => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

 
  if (showAdd) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={PRIMARY} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowAdd(false)}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Add Task</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Detail"
            style={styles.input}
            value={detail}
            onChangeText={setDetail}
          />

          <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
            <Text style={styles.addText}>
              {editId ? 'UPDATE' : 'ADD'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} />
      <View style={styles.header}>
        <Text style={styles.headerText}>TODO APP</Text>
        <TouchableOpacity onPress={() => setShowAdd(true)}>
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.title,
                  item.completed && { textDecorationLine: 'line-through' },
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.sub}>{item.detail}</Text>
            </View>

           
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => editTodo(item)}
              >
                <Text style={styles.actionIcon}> <Icon name="edit" size={24} color="#8C8CFF" /></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => deleteTodo(item.id)}
              >
                <Text style={styles.actionIcon}><Icon name="delete" size={24} color="#8C8CFF" /></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => toggleDone(item.id)}
              >
                <Text style={styles.actionIcon}><Icon name="check-circle" size={24} color="#8C8CFF" /></Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE0F2',
  },
  header: {
    height: 70,
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  plus: {
    fontSize: 28,
    color: '#fff',
  },
  back: {
    color: '#fff',
    fontSize: 24,
    marginRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  sub: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionIcon: {
    fontSize: 16,
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  addBtn: {
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
