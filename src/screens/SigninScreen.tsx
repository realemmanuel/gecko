import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { handleLogin } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "Signin">
>;

const SigninScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const navigation = useNavigation<NavigationProp>();

  const registerUser = async () => {
    try {
      const formData = {
        email: email.toLowerCase(),
        password,
      };

      const registrationResult = await handleLogin(formData);

      if (!registrationResult.isAuthenticated) {
        setResponse(registrationResult.response);
      } else {
        const { userId } = registrationResult;

        if (userId) {
          await AsyncStorage.setItem("userId", userId);

          setResponse(registrationResult.response);
          navigation.navigate("Dashboard");
        }
      }
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 pb-5">
      <ScrollView>
        <TouchableOpacity
          onPress={navigation.goBack}
          className="flex-row items-center p-5"
        >
          <Ionicons name="arrow-back" size={30} color="#446752" />
          <Text className="text-[#446752]">Go Back</Text>
        </TouchableOpacity>

        <Text className="text-center text-[40px] font-[500] text-[#446752]">
          Sign In
        </Text>

        <Image
          className="w-[90%] mx-auto h-[500px] relative bottom-16"
          source={require("../assets/images/login.png")}
          style={{ resizeMode: "contain" }}
        />

        <Text className="text-center text-[14px] font-light w-[90%] mx-auto text-gray-600 relative bottom-32">
          Welcome back to gecko! Have a productive day😃
        </Text>

        <View className="flex relative bottom-20 space-y-4 pb-5">
          <View className="flex-row space-x-3 items-center bg-[#44675238] w-[90%] mx-auto p-3 rounded-lg">
            <Ionicons name="mail-outline" size={30} color="#446752" />
            <TextInput
              className="h-[40px] w-[90%] text-[15px] font-medium text-[#446752]"
              placeholder="Email Address"
              value={email}
              onChangeText={(enteredEmail) => setEmail(enteredEmail)}
            />
          </View>
          <View className="flex-row space-x-3 items-center bg-[#44675238] w-[90%] mx-auto p-3 rounded-lg">
            <Ionicons name="lock-closed-outline" size={30} color="#446752" />
            <TextInput
              className="h-[40px] w-[90%] text-[15px] font-medium text-[#446752]"
              placeholder="Enter Password"
              value={password}
              onChangeText={(enteredPassword) => setPassword(enteredPassword)}
            />
          </View>

          <TouchableOpacity
            onPress={registerUser}
            className="w-[90%] mx-auto bg-[#b4e37b] p-4 rounded-lg"
          >
            <Text className="text-center text-[20px] font-[300]">Sign in</Text>
          </TouchableOpacity>

          {response.length > 0 && (
            <Text className="text-center text-[15px] font-[300]">
              {response}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;
