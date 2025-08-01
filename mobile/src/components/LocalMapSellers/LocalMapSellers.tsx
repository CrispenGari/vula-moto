import { View, Text, Dimensions, Platform, Image } from "react-native";
import React from "react";
import { useMeStore } from "@/src/store/useMeStore";
import { useLocationStore } from "@/src/store/locationStore";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { COLORS, FONTS } from "@/src/constants";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { calculateDistance } from "@/src/utils/distance";
import Animated, { SlideInLeft } from "react-native-reanimated";

const { height } = Dimensions.get("window");

const LocalMapSellers = () => {
  const { location } = useLocationStore();
  const { me } = useMeStore();
  const sellers = useQuery(api.api.users.getLocalSeller, {
    id: me?._id,
  });
  return (
    <View style={{}}>
      <View style={{}}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.bold,
            marginBottom: 10,
          }}
        >
          Services and Spares within your Radius..
        </Text>
      </View>

      <MapView
        initialRegion={{
          latitude: location.lat,
          longitude: location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: "100%",
          height: height * 0.4,
          marginTop: 10,
        }}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        pitchEnabled={true}
        followsUserLocation={true}
        showsTraffic={true}
        showsIndoorLevelPicker={true}
        loadingEnabled={true}
        provider={Platform.select({
          android: PROVIDER_GOOGLE,
          ios: PROVIDER_DEFAULT,
        })}
        region={{
          latitude: location.lat,
          longitude: location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lon,
          }}
          title="You"
          description="This is you."
          identifier="you"
        />

        {sellers?.map((seller, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: seller.location?.lat as any,
              longitude: seller?.location?.lon as any,
            }}
            title={seller.fullName}
            description={`${calculateDistance(
              {
                latitude: location.lat,
                longitude: location.lon,
              },
              {
                latitude: seller.location?.lat as any,
                longitude: seller.location?.lon as any,
              }
            )} away`}
            identifier={seller.fullName}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "cover",
                top: -3,
              }}
              //   source={require("@/assets/images/seller.png")}
            />
          </Marker>
        ))}
      </MapView>

      <Animated.View
        style={{
          paddingVertical: 20,
        }}
        entering={SlideInLeft.duration(200).delay(400)}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 18,
          }}
        >
          5+ services stations • 157+ spares listed near you.
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.regular,
            color: COLORS.secondary,
          }}
        >
          {location.address.name}, {location.address.street}{" "}
          {location.address.streetNumber}, {location.address.city}
        </Text>
      </Animated.View>
    </View>
  );
};

export default LocalMapSellers;
