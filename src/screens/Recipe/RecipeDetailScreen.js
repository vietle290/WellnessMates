import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../../components/Recipes/loading";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      //   console.log('got meal data: ',response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  return (
    <View>
      <StatusBar style={"light"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 40, marginLeft: 15 }}
        >
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={28}
            color="black"
          />
          {/* <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" /> */}
        </TouchableOpacity>

        {/* recipe image */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <CachedImage
            uri={item.strMealThumb}
            // sharedTransitionTag={item.strMeal} // this will only work on native image (now using Image from expo-image)
            style={{
              width: wp(100),
              height: hp(50),
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          />
        </View>

        {/* meal description */}
        {loading ? (
          <Loading size="large" style={{ marginTop: 50 }} />
        ) : (
          <View style={{ paddingHorizontal: 20 }}>
            {/* name and area */}
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {meal?.strMeal}
            </Text>
            <Text style={{ fontSize: hp(2) }}>{meal?.strArea}</Text>

            {/* misc */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "#fbbf24",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: "white",
                    borderRadius: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
                  <Text style={{ fontWeight: "bold" }}>MN</Text>
                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{ fontSize: hp(2) }}>35</Text>
                  <Text style={{ fontSize: hp(1.3) }}>Mins</Text>
                </View>
              </View>

              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "#fbbf24",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: "white",
                    borderRadius: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
                  <Text style={{ fontWeight: "bold" }}>SV</Text>
                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{ fontSize: hp(2) }}>03</Text>
                  <Text style={{ fontSize: hp(1.3) }}>Servings</Text>
                </View>
              </View>

              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "#fbbf24",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: "white",
                    borderRadius: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
                  <Text style={{ fontWeight: "bold" }}>KL</Text>
                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{ fontSize: hp(2) }}>103</Text>
                  <Text style={{ fontSize: hp(1.3) }}>Calories</Text>
                </View>
              </View>

              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "#fbbf24",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: "white",
                    borderRadius: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>MD</Text>

                  {/* <Square3Stack3DIcon
                    size={hp(4)}
                    strokeWidth={2.5}
                    color="#525252"
                  /> */}
                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{ fontSize: hp(1.3) }}>Easy</Text>
                </View>
              </View>
            </View>

            {/* ingredients */}
            <Text style={{ fontSize: hp(2.5), fontWeight: "bold" }}>
              Ingredients
            </Text>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View
                    key={i}
                    style={{ flexDirection: "row", marginHorizontal: 10 }}
                  >
                    <View
                      style={{
                        height: hp(1.5),
                        width: hp(1.5),
                        backgroundColor: "#fbbf24",
                        borderRadius: 10,
                      }}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: hp(1.7),
                          fontWeight: "bold",
                          marginHorizontal: 10,
                        }}
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text style={{ fontSize: hp(1.7) }}>
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* instructions */}
            <Text style={{ fontSize: hp(2.5), fontWeight: "bold" }}>
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }}>{meal?.strInstructions}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
