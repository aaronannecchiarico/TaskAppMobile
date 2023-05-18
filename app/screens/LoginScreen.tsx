import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Button } from "app/components"
import { spacing } from "app/theme"
import { useStores } from "app/models"
import { useAuth0 } from 'react-native-auth0'

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { authUserStore } = useStores()
  const {authorize, getCredentials, user} = useAuth0();

  const onPress = async () => {
      try {
          try{
            await authorize();
          }catch(error){
            console.tron.log('Auth0 Error calling authorize()', error);
          }
          
          try{
            const { accessToken } = await getCredentials();
            if(user){
              authUserStore.saveUser(user);
            }else{
              console.tron.log('Auth0 Error calling getCredentials() - no user');
            }
  
            if(accessToken){
              authUserStore.saveAccessToken(accessToken);
            }else{
              console.tron.log('Auth0 Error calling getCredentials() - no accessToken');
            }
          }catch(error){
            console.tron.log('Auth0 Error calling getCredentials()', error);
          }
          
      
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
