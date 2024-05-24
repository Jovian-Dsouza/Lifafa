import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Redeem from "./screens/Redeem";
import ContractTestScreen from "./screens/contractTest";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Redeem: undefined;
  ContractTestScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Redeem"
        component={Redeem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractTestScreen"
        component={ContractTestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}