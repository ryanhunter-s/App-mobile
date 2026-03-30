import { View, Text } from 'react-native';

export default function WorkspaceScreen({ route }) {
  const { workspaceId } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Workspace Detail</Text>
      <Text>ID: {workspaceId}</Text>
      <Text>Nombre: {workspaceId}</Text>
    </View>
  );
}