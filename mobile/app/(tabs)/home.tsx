import HomeHeader from "@/src/components/Headers/HomeHeader";
import LocalMapSellers from "@/src/components/LocalMapSellers/LocalMapSellers";
import ProductsContainer from "@/src/components/ProductsContainer/ProductsContainer";
import { COLORS, FONTS } from "@/src/constants";
import { useLocationStore } from "@/src/store/locationStore";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { user } = useUser();
  const { settings } = useSettingsStore();
  const [category, setCategory] = React.useState("all");
  const { location } = useLocationStore();
  const localProductsBottomSheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <>
      <Tabs.Screen
        options={{
          header: (props) => (
            <HomeHeader
              {...props}
              category={category}
              setCategory={setCategory}
            />
          ),
        }}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 100,
        }}
        style={{ flex: 1, backgroundColor: COLORS.main }}
      >
        <LocalMapSellers />

        <ProductsContainer
          category="all"
          header="Newly Listed"
          navigateTo="new"
        />
        <ProductsContainer category="all" header="Near By" navigateTo="near" />
        <ProductsContainer category="service" header="Automotive Services" />
        <ProductsContainer category="spares" header="Automotive Spares" />
      </ScrollView>
    </>
  );
};

export default Page;
