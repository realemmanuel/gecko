import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Logo from "../components/Logo";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "Home">
>;

const HomeScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  useLayoutEffect(() => {
    const getUserToken = async () => {
      try {
        const value = await AsyncStorage.getItem("userId");
        if (value !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        throw new Error();
      }
    };

    getUserToken();
  }, []);

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <ScrollView>
        <View className="mt-5">
          <Logo />
        </View>

        <Image
          className="w-[90%] mx-auto h-[500px]"
          source={require("../assets/images/onboarding.png")}
          style={{ resizeMode: "contain" }}
        />

        <Text className="text-center text-[28px] font-medium">
          Easy Task Management
        </Text>
        <Text className="my-3 text-center text-[14px] font-light w-[90%] mx-auto text-gray-600">
          quickly add tasks, set due dates, and add descriptions with ease using
          our task manager app. Simplify your workflow and stay organized.
        </Text>

        <View className="my-5 flex space-y-4 pb-10">
          {isLoggedIn ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Dashboard")}
              className="w-[90%] mx-auto bg-[#87cb34] p-4 rounded-lg"
            >
              <Text className="text-center text-[20px] font-[300]">
                Dashboard
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("Signin")}
              className="w-[90%] mx-auto bg-[#87cb34] text-[#cbeba4] p-4 rounded-lg"
            >
              <Text className="text-center text-[20px] font-[300]">
                Sign in
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            className="w-[90%] mx-auto bg-transparent border-[1px] border-gray-300 p-4 rounded-lg"
          >
            <Text className="text-center text-[20px] font-[300]">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
