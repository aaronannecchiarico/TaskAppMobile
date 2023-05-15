import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Button, FlatList, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { spacing } from "app/theme"
import { User, useStores } from "app/models"
import Auth0 from 'react-native-auth0';
import Config from "app/config"

interface UserScreenProps extends NativeStackScreenProps<AppStackScreenProps<"User">> {}

export const UserScreen: FC<UserScreenProps> = observer(function UserScreen() {
      // Are we refreshing the data?
      const [refreshing, setRefreshing] = React.useState(false)

      // Pull in one of our MST stores
      const { userStore } = useStores()
      const { users } = userStore
  
      useEffect(() => {
        // fetchUsers()r
      }, [])
  
      const fetchUsers = () => {
        setRefreshing(true)
        userStore.getUsers()
        setRefreshing(false)
      }

      const LoginButton = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const auth0 = new Auth0({
          domain: Config.AUTH0_DOMAIN,
          clientId: Config.AUTH0_CLIENT_ID,
        });
    
        const onPress = async () => {
            try {
                const response = await auth0.webAuth.authorize({
                    scope: 'openid profile email',
                    audience: `https://${Config.AUTH0_DOMAIN}/userinfo`,
                });
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        };
    
        return <Button onPress={onPress} title="Log in" />
      }
      const UserComponent = ({ item }) => {
        const user: User = item.item
        return (
          <View>
            <Text tx="userScreen.title"/>
            <Text style={$user} text={user.first_name} />
            <Text style={$user} text={user.last_name} />
          </View>
        )
      }

      const ObservedUser = observer(UserComponent)

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
    <Text preset="heading" tx={"userScreen.users"} style={$header} />
    <LoginButton />
    <FlatList
      data={users}
      renderItem={(item) => <ObservedUser item={item} />}
      extraData={{ extraDataForMobX: users.length > 0 ? users[0].auth_token : "" }}
      keyExtractor={(item) => item.id}
      onRefresh={fetchUsers}
      refreshing={refreshing}
    />
  </Screen>
  )
})

const $header: TextStyle = {
  marginTop: spacing.huge,
  marginBottom: spacing.medium,
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $user: TextStyle = {
  fontWeight: "bold",
  fontSize: spacing.medium,
  marginVertical: spacing.medium,
}
