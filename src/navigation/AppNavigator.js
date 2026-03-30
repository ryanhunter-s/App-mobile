import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import WorkspaceScreen from "../screens/dashboard/Workspace/WorkspaceScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Workspace" component={WorkspaceScreen} />
    </Stack.Navigator>
  );
}