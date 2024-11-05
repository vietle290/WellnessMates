import { View, Text, ScrollView, Image, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
// import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../../components/Recipes/categories";
import axios from "axios";
import Recipes from "../../components/Recipes/recipes";
export default function RecipeHomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      Alert.alert(err);
      console.log("error: ", err.message);
    }
  };
  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      Alert.alert(err);
      console.log("error: ", err.message);
    }
  };

  return (
   

    <View
      style={{ flex: 1, backgroundColor: "white", padding: 10, paddingTop: 40 }}
    >
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ marginTop: 20 }}
      >
        <View
          style={{ marginLeft: 20, marginBottom: 2, flexDirection: "column" }}
        >
          <View>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "gray" }}>
              Make your own food,
            </Text>
          </View>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "gray" }}>
            stay at <Text style={{ color: "#FFA400" }}>home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F9F6EE",
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
            onFocus={() => {
              navigation.navigate("RecipeSearch");
            }}
          />
          <View
            style={{ backgroundColor: "white", borderRadius: 10, padding: 3 }}
          >
            {/* <MagnifyingGlassIcon size={25} strokeWidth={3} color="gray" /> */}
          </View>
        </View>

        {/* categories */}
        <View>
          {categories?.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
