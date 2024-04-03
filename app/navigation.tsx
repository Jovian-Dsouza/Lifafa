import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import Login from "./screens/Login";

export type RootStackParamList = {
  Login: undefined;
  UserProfile: undefined;
  UserPortfolio: undefined;
  SupportedChains: undefined;
  TransferTokens: undefined;
  TransferNFT: undefined;
  OrderDetails: {
    orderId: string;
  };
  NftOrderDetails: {
    orderId: string;
  };
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
    </Stack.Navigator>
  );
}