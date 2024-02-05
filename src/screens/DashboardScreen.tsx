// DashboardScreen.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import Logo from "../components/Logo";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

type DashboardNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Dashboard">,
  NativeStackNavigationProp<RootStackParamList>
>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("userId");
        if (value !== null) {
          setUserId(value);
        } else {
          navigation.navigate("Home");
        }
      } catch (e) {
        setUserId("UserId Not Found");
      }
    };

    getData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 m-5">
      <ScrollView>
        <View className="flex flex-col space-y-5 pb-28">
          <View className="flex flex-row justify-between items-center mb-3">
            <Logo />
            <View className="flex flex-row gap-5 items-center">
              <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
                <Ionicons
                  name="notifications-outline"
                  size={27}
                  color="black"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Ionicons name="settings-outline" size={27} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="my-2 flex flex-col space-y-2">
            <Text className="text-[15px] font-[300] text-black">
              Good morning,
            </Text>
            <Text className="text-[25px] font-[600] text-black">
              Keep it going!
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center space-x-3">
            <View className="w-[185px] h-[120px] border-[1px] border-gray-400 rounded-2xl p-3 flex flex-col space-y-10">
              <View className="flex flex-row items-center space-x-2">
                <MaterialCommunityIcons
                  name="format-list-checkbox"
                  size={24}
                  color="#44641d"
                />
                <Text className="text-[14px] font-[600] text-[#44641d]">
                  Daily Task
                </Text>
              </View>

              <View className="flex flex-row items-center space-x-2">
                <Text className="text-[30px] font-[900] text-black">12</Text>
                <Text className="text-[16px] font-[600] text-gray-500">
                  Tasks
                </Text>
              </View>
            </View>

            <View className="w-[185px] h-[120px] border-[1px] border-gray-400 rounded-2xl p-3 flex flex-col space-y-10">
              <View className="flex flex-row items-center space-x-2">
                <MaterialCommunityIcons
                  name="format-list-checkbox"
                  size={24}
                  color="#44641d"
                />
                <Text className="text-[14px] font-[600] text-[#44641d]">
                  In Progress
                </Text>
              </View>

              <View className="flex flex-row items-center space-x-2">
                <Text className="text-[30px] font-[900] text-black">5</Text>
                <Text className="text-[16px] font-[600] text-gray-500">
                  Tasks
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full rounded-2xl p-5 bg-[#87cb34] flex flex-row justify-between mb-3">
            <View className="flex flex-row items-center space-x-2">
              <Feather name="alert-octagon" size={24} color="#263712" />
              <Text className="text-[#263712] text-[14px] font-[400]">
                Client Meeting
              </Text>
            </View>

            <View className="flex flex-row items-end space-x-[2px]">
              <Text className="text-[#263712] text-[30px] font-[900]">
                12:00
              </Text>
              <Text className="text-[#263712] text-[14px] font-[400] mb-1">
                am
              </Text>
            </View>
          </View>

          <View className="w-full flex flex-col space-y-5">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-[25px] font-[500]">Today's Tasks</Text>

              <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
                <Text className="text-gray-500 text-[14px] font-[400]">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row space-x-3 overflow-auto">
              <ScrollView horizontal={true} className="flex flex-row gap-5">
                <View className="bg-[#6544fa] w-[280px] h-[250px] p-3 rounded-2xl"></View>
                <View className="bg-[#6544fa] w-[280px] h-[250px] p-3 rounded-2xl"></View>
                <View className="bg-[#6544fa] w-[280px] h-[250px] p-3 rounded-2xl"></View>
              </ScrollView>
            </View>
          </View>

          <Text>{userId}</Text>

          <TouchableOpacity onPress={logout}>
            <Text>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
            <Text>Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
