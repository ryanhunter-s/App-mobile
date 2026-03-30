import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { removeToken, getToken } from '../../utils/storage';
import { getWorkspaces } from '../../services/getWorkspace';
import { useState, useEffect } from 'react';
import { CardWorkspace } from '../../components/ui/CardWorkspace';

export default function DashboardScreen({ navigation }) {
  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await removeToken();
    navigation.replace('Login');
  };

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      if (!token) {
        navigation.replace('Login');
        return;
      }
      const res = await getWorkspaces();
      setWorkspace(res);

      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={"#fff"} size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome 👋
        </Text>

        <Text style={styles.subtitle}>
          This is your dashboard
        </Text>
      </View>

      {workspace.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={workspace}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CardWorkspace item={item} key={item.id} />}
        />
      )}

      {/* 🚪 Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: 'red',
          padding: 15,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "block",
    width: "100%",
    height: "100%",
    padding: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
  },
});