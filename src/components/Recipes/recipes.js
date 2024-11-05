import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { CachedImage } from "../../helpers/image";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, meals }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 16, paddingVertical: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Recipes</Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <View style={{ paddingHorizontal: 110, paddingVertical: 150 }}>
            <Text style={{ fontSize: 25 }}>Loading...</Text>
          </View>
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
   
    <Pressable
      style={{
        width: "100%",
        paddingLeft: isEven ? 0 : 8,
        paddingRight: isEven ? 8 : 0,
      }}
      onPress={() => navigation.navigate("RecipeDetail", { ...item })}
    >
      <CachedImage
        uri={item.strMealThumb}
        style={{
          width: "100%",
          height: index % 3 == 0 ? hp(25) : hp(35),
          borderRadius: 35,
        }}
      />

      <Text
        style={{ fontSize: hp(1.5), fontWeight:600, marginLeft:5, marginBottom:5 }}
      >
        {item.strMeal.length > 20
          ? item.strMeal.slice(0, 20) + "..."
          : item.strMeal}
      </Text>
    </Pressable>
  );
};
