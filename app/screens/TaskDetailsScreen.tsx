import { observer } from "mobx-react-lite"
import { Image, StyleSheet, Text, View } from "react-native"
import { Button } from "@rneui/themed"

const styles = StyleSheet.create({
  taskDetailsContainer: {
    display: "flex",
    flexGrow: 1,
    fontFamily: "Helvetica",
  },
  headerContainer: {
    display: "flex",
    paddingTop: 40,
    flexDirection: "row",
    padding: 15,
    fontFamily: "Helvetica",
    backgroundColor: "#c0d9f9",
  },
  headerTitle: {
    alignSelf: "center",
    flexGrow: 1,
    alignItems: "center",
  },
  backButtonContainer: {
    alignItems: "flex-start",
  },
  backButton: {
    fontSize: 30,
  },
  top: {
    flexGrow: 1,
    padding: "5px",
    backgroundColor: "#c0d9f9",
  },
  details: {
    flexGrow: 1,
    paddingTop: 15,
    paddingLeft: 35,
    paddingRight: 30,
  },
  detailsTitle: {
    fontSize: 22,
    fontFamily: "Helvetica",
  },
  detailsCreatorContainer: {
    paddingTop: 20,
  },
  creatorProfilePicContainer: { display: "flex", flexDirection: "row", alignItems: "center" },
  pfp: { width: 50, height: 50, borderRadius: 30 },
  creatorName: { fontSize: 19, paddingLeft: 10 },
  description: {
    paddingTop: 15,
    paddingRight: 10,
    fontSize: 18,
  },
  bidContainer: {
    flexGrow: 1,
    // border: "1px green dotted",
    padding: "5px",
  },
  floatingBid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90vw",
    padding: 20,
    backgroundColor: "#2e314d",
    alignSelf: "center",
    borderRadius: 7,
  },
})

type TaskDetailProps = {
  title: string
  firstName: string
  lastName: string
  pfpLink: string
  description: string
  highestBid: string
}

export const TaskDetailsScreen = observer(
  ({ title, firstName, lastName, pfpLink, description, highestBid }: TaskDetailProps) => {
    return (
      <View style={styles.taskDetailsContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.backButtonContainer}>
            <Button type="clear">
              <Text style={styles.backButton}>{"<"}</Text>
            </Button>
          </View>
          <View style={styles.headerTitle}>
            <Text style={{ fontSize: 20 }}>Task Details</Text>
          </View>
        </View>
        <View style={styles.top}>
          <View style={{ height: "250px" }}></View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>{title || "Test Title"}</Text>
          <View style={styles.detailsCreatorContainer}>
            <Text style={{ fontSize: 16, color: "gray", paddingBottom: 10 }}>Creator</Text>
            <View style={styles.creatorProfilePicContainer}>
              {pfpLink && (
                <Image
                  style={styles.pfp}
                  source={{
                    uri: pfpLink,
                  }}
                />
              )}
              <Text style={styles.creatorName}>
                {firstName || "First"} {lastName || "Last"}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 16, paddingTop: 20 }}>Description</Text>
          <Text style={styles.description}>{description || "Placeholder description"}</Text>
        </View>
        <View style={styles.bidContainer}>
          <View style={styles.floatingBid}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ paddingTop: 10, fontSize: 16, color: "white" }}>Highest Bid</Text>
              <Text style={{ paddingTop: 15, paddingBottom: 10, fontSize: 16, color: "white" }}>
                {highestBid || "$0.00 USD"}
              </Text>
            </View>
            <Button radius="10" size="lg" color={"#f9f08d"} style={{ width: 200 }}>
              <Text style={{ borderRadius: 20, fontSize: 18 }}>Place a Bid</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  },
)
