import React from 'react';
import { View, StatusBar, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../../../auth/FireBaseConfig';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { FIRESTORE_DB } from "../../../auth/FireBaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";


export const ProfileScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const [userData, setUserData] = useState(null);
  console.log(userData)

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      // Navigate to your sign-in or home screen, or any other desired behavior
      navigation.navigate('Welcome'); // Change 'SignIn' to the appropriate screen name
    } catch (error) {
      console.error('Sign out failed: ', error);
    }
  };

  // Function to retrieve user data from AsyncStorage
  const retrieveUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const parsedUserData = JSON.parse(userDataString);
      // console.log(parsedUserData)
      if (parsedUserData) {
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Error retrieving user data from AsyncStorage:', error);
    }
  }
  

  useEffect(() => {
    retrieveUserData();
  }, []);
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ height: '100%', backgroundColor: '#eeeced' }}>
        <View style={ProfileStyles.above}>
          <View style={ProfileStyles.circularImageContainer}>
            <Image
              style={ProfileStyles.circularImage}
              source={require('../../../assets/WellnessMateIcon.png')}
            />
          </View>
          <Text style={ProfileStyles.name}>{userData && userData.email}</Text>
          <Text style={ProfileStyles.job}>Wellness Mate</Text>
        </View>

        <View style={ProfileStyles.below}>
          <FlatList
            data={[ { key: 'Sign Out', icon:'logout' }]}
            renderItem={({ item }) => (
             
              <TouchableOpacity onPress={item.key === 'Sign Out' ? handleSignOut : null}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 40,
                    marginHorizontal: 30,
                  }}>
                  <AntDesign name={item.icon} size={24} />
                  <Text style={ProfileStyles.item}>{item.key}</Text>
                  <AntDesign name="right" size={24} />
                </View>
                
              </TouchableOpacity>
            )}
           
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const ProfileStyles = StyleSheet.create({
  circularImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // Half of the width/height to create a circle
    overflow: 'hidden', // Hide the overflow outside the circle
  },
  circularImage: {
    width: 200,
    height: 200,
  },
  name: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  job: {
    fontSize: 14,
    marginBottom: 20,
  },
  above: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#eeeced',
  },
  below: {
    height: '60%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
  },
  item: {
    fontSize: 14,
  },
});
