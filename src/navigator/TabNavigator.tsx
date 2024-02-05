import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import TasksScreen from "../screens/Tasks/TasksScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AddTask from "../screens/Tasks/AddTask";
import { ReactNode } from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "./RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TabStackParamList = {
  Dashboard: undefined;
  Tasks: undefined;
  AddTask: undefined;
  Settings: undefined;
  Notifications: undefined;
};

type Props = {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void | undefined;
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: Props) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignContent: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#7fa451",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 10,
          right: 10,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 15,
                }}
              >
                <MaterialCommunityIcons
                  name="view-dashboard"
                  size={28}
                  color="#7fa451"
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 15,
                }}
              >
                <FontAwesome name="tasks" size={28} color="#7fa451" />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="AddTask"
        component={AddTask}
        options={{
          tabBarIcon: () => {
            return <AntDesign name="plus" size={28} color="white" />;
          },
          tabBarButton: ({ onPress, children }) => (
            <CustomTabBarButton onPress={onPress} children={children} />
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddTask");
          },
        })}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 15,
                }}
              >
                <Ionicons name="notifications" size={28} color="#7fa451" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 15,
                }}
              >
                <Feather name="settings" size={28} color="#7fa451" />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#b4e37b",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNavigator;
