import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import TabNavigator from "./TabNavigator";
import AddTask from "../screens/Tasks/AddTask";

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  AddTask: undefined;
  Signin: undefined;
  Signup: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={TabNavigator}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddTask"
          component={AddTask}
        />
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Signin"
          component={SigninScreen}
        />
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignupScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
