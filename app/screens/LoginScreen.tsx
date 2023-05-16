import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Button } from "app/components"
import { spacing } from "app/theme"
// import { useStores } from "app/models"
import { useAuth0 } from 'react-native-auth0'

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const {authorize} = useAuth0();

  const onPress = async () => {
      try {
          await authorize();
      } catch (e) {
          console.log(e);
      }
  };

  // Pull in navigation via hook
  return (
    <Screen style={$root} preset="scroll">
      <Text text="Task Bids" style={$header} />
      <Button text="Login" onPress={onPress} style={$button}/>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}
const $header: TextStyle = {
  fontWeight: "bold",
  fontSize: spacing.large,
  marginTop: spacing.huge,
  marginBottom: spacing.medium,
}

const $button: ViewStyle = {
  marginBottom: spacing.medium,
  marginTop: spacing.medium,
}
// const $login: TextStyle = {
//   fontWeight: "bold",
//   fontSize: spacing.medium,
//   marginVertical: spacing.medium,
// }
