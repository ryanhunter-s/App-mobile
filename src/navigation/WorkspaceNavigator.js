import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkspaceScreen from '../screens/dashboard/Workspace/WorkspaceScreen';

const Stack = createNativeStackNavigator();

export default function WorkspaceNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Workspace" component={WorkspaceScreen} />
    </Stack.Navigator>
  );
}