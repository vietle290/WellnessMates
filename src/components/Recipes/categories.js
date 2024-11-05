import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CachedImage } from "../../helpers/image";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{ flex: 1, alignItems: "center", marginHorizontal: 4 }}
            >
              <View
                style={{
                  borderRadius: 6,
                  padding: 6,
                  backgroundColor: isActive ? "#FFA400" : "rgba(0,0,0,0.1)",
                }}
              >
                <CachedImage
                  uri={cat.strCategoryThumb}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
              </View>
              <Text style={{ color: "gray", fontSize: 16 }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
  );
}
