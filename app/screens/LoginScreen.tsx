import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Button } from "app/components"
import { spacing } from "app/theme"

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {
  handleLogin:() => Promise<void>;
  navigation: any //TODO
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({
  handleLogin,
  navigation,
}) {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="Task Bids" style={$header} />
      <Button
        text="Login"
        onPress={async () => {
          try{
            await handleLogin();
            navigation.navigate('User')
          }catch(error){
            console.tron.log("Error calling handleLogin()", error)
          }
        }}
        style={$button}
      />
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
