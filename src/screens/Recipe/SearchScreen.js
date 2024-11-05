import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import fetchMeals from "../../helpers/fetchSearchMeal";
import { Ionicons } from "@expo/vector-icons";


const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);

  const handleSearch = async () => {
    const data = await fetchMeals(searchTerm);

    if (data) {
      setMeals(data.meals);
    }
  };

  return (
    <ScrollView style={{ marginTop: 60 }}>
      <View>
        <View
          style={{ marginLeft: 20, marginBottom: 20, flexDirection: "column" }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={28}
            color="black"
          />
            {/* <ChevronLeftIcon size={25} strokeWidth={4.5} color="#fbbf24" /> */}
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "gray" }}>
              Search any food,
            </Text>
          </View>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "gray" }}>
            cook at <Text style={{ color: "#FFA400" }}>home</Text>
          </Text>
        </View>

        {/*Search bar*/}
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 6,
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={{
              fontSize: 18,
              flex: 1,
              marginBottom: 1,
              paddingLeft: 3,
              letterSpacing: 2,
            }}
           
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <View
            style={{ backgroundColor: "white", borderRadius: 10, padding: 3 }}
          >
            <TouchableOpacity onPress={handleSearch}>
              <Text>Search</Text>
              {/* <MagnifyingGlassIcon size={25} strokeWidth={3} color="gray" /> */}
            </TouchableOpacity>
          </View>
        </View>

        {meals === null ? (
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            No search results yet.
          </Text>
        ) : meals.length === 0 ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 300,
            }}
          >
            No meals found.
          </Text>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            {meals.map((meal) => (
              <Pressable
                style={{ width: "95%", marginLeft: 20 }}
                onPress={() => navigation.navigate("RecipeDetail", { ...meal })}
              >
                <View
                  key={meal.idMeal}
                  style={{ width: "95%", marginBottom: 10 }}
                >
                  <View
                    style={{
                      padding: 10,
                      alignItems: "center",
                      backgroundColor: "white",
                      justifyContent: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Image
                      source={{ uri: meal.strMealThumb }}
                      style={{ width: "100%", height: 200, borderRadius: 15 }}
                    />
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        alignSelf: "flex-start",
                        marginLeft: 10,
                      }}
                    >
                      {meal.strMeal}
                    </Text>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        marginLeft: 10,
                        fontSize: 16,
                      }}
                    >
                      {meal.strCategory}
                    </Text>
                    {/* Add more meal details here */}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
