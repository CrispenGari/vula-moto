import { api } from "@/convex/_generated/api";
import Product from "@/src/components/Product/Product";
import ProductSkeleton from "@/src/components/Product/ProductSkeleton";
import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";

const Page = () => {
  const ids = useQuery(api.api.items.getByCategoryWithoutPagination, {
    category: "all",
    order: "desc",
  });

  const router = useRouter();
  const { settings } = useSettingsStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Near by Items`,
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 40 }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/(tabs)/home");
                }
              }}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          ),
          headerLargeTitleStyle: { fontFamily: FONTS.bold, fontSize: 25 },
          headerTitleStyle: { fontFamily: FONTS.bold, color: COLORS.white },
          headerStyle: {
            backgroundColor: COLORS.tertiary,
          },
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.main,
        }}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 100,
          paddingTop: Platform.select({
            ios: 150,
          }),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            flexWrap: "wrap",
            width: "100%",
            flex: 1,
          }}
        >
          {!!!ids ? (
            Array(4)
              .fill(9)
              .map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            <>{ids?.map((id) => <Product id={id} key={id} />)}</>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Page;
