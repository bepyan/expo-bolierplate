import { RootParamList } from "@types";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import AuthStack from "./AuthStack";
import NoAuthStack from "./NoAuthStack";
import ModalStack from "./ModalStack";
import { useAuthContext } from "@context";
import { forStackFade } from "@utils";

const Root = createStackNavigator<RootParamList>();

export default () => {
  const { auth } = useAuthContext();

  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={() => ({ headerShown: false })}
        mode="modal"
      >
        {!!!auth ? (
          <>
            <Root.Screen name="NoAuthStack" component={NoAuthStack} />
          </>
        ) : (
          <>
            <Root.Screen name="BottomTab" component={BottomTab} />
            <Root.Screen name="AuthStack" component={AuthStack} />
          </>
        )}
        <Root.Screen
          name="ModalStack"
          component={ModalStack}
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            gestureEnabled: false,
            cardStyleInterpolator: forStackFade,
          }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
};
