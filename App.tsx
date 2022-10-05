// @ts-nocheck
import { useCallback, useMemo } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import TaskContext, { Task } from "./app/models/Task";
import IntroText from "./app/components/IntroText";
import AddTaskForm from "./app/components/AddTaskForm";
import TaskList from "./app/components/TaskList";
import colors from "./app/styles/colors";

// NEW
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import Inicio from "./app/screens/Inicio";
import Config from "./app/screens/Config";
import Historial from "./app/screens/Historial";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

const { useRealm, useQuery, RealmProvider } = TaskContext;

function App() {
  const realm = useRealm();
  const result = useQuery(Task);

  const tasks = useMemo(() => result.sorted("createdAt"), [result]);

  const handleAddTask = useCallback(
    (description: string): void => {
      if (!description) {
        return;
      }

      // Everything in the function passed to "realm.write" is a transaction and will
      // hence succeed or fail together. A transcation is the smallest unit of transfer
      // in Realm so we want to be mindful of how much we put into one single transaction
      // and split them up if appropriate (more commonly seen server side). Since clients
      // may occasionally be online during short time spans we want to increase the probability
      // of sync participants to successfully sync everything in the transaction, otherwise
      // no changes propagate and the transaction needs to start over when connectivity allows.
      realm.write(() => {
        realm.create("Task", Task.generate(description));
      });
    },
    [realm]
  );

  const handleToggleTaskStatus = useCallback(
    (task: Task): void => {
      realm.write(() => {
        // Normally when updating a record in a NoSQL or SQL database, we have to type
        // a statement that will later be interpreted and used as instructions for how
        // to update the record. But in RealmDB, the objects are "live" because they are
        // actually referencing the object's location in memory on the device (memory mapping).
        // So rather than typing a statement, we modify the object directly by changing
        // the property values. If the changes adhere to the schema, Realm will accept
        // this new version of the object and wherever this object is being referenced
        // locally will also see the changes "live".
        task.isComplete = !task.isComplete;
      });

      // Alternatively if passing the ID as the argument to handleToggleTaskStatus:
      // realm?.write(() => {
      //   const task = realm?.objectForPrimaryKey('Task', id); // If the ID is passed as an ObjectId
      //   const task = realm?.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));  // If the ID is passed as a string
      //   task.isComplete = !task.isComplete;
      // });
    },
    [realm]
  );

  const handleDeleteTask = useCallback(
    (task: Task): void => {
      realm.write(() => {
        realm.delete(task);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
      });
    },
    [realm]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <AddTaskForm onSubmit={handleAddTask} />
        {tasks.length === 0 ? (
          <IntroText />
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTaskStatus={handleToggleTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// function App() {
//   const Tab = createBottomTabNavigator();
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName="Contador de ganado"
//         screenOptions={{
//           tabBarActiveTintColor: "#e91e63",
//         }}
//       >
//         <Tab.Screen
//           name="Contador de ganado"
//           component={Inicio}
//           options={{
//             tabBarIcon: ({ size, color }) => (
//               <MaterialCommunityIcons name={"cow"} color={color} size={size} />
//             ),
//             headerTitleAlign: "center",
//             tabBarLabel: () => {
//               return null;
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Historial"
//           component={Historial}
//           options={{
//             tabBarIcon: ({ size, color }) => (
//               <MaterialCommunityIcons
//                 name={"feature-search-outline"}
//                 color={color}
//                 size={size}
//               />
//             ),
//             headerTitleAlign: "center",
//             tabBarLabel: () => {
//               return null;
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Configuración"
//           component={Config}
//           options={{
//             tabBarIcon: ({ size, color }) => (
//               <Ionicons name={"settings"} color={color} size={size} />
//             ),
//             headerTitleAlign: "center",
//             tabBarLabel: () => {
//               return null;
//             },
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

function AppWrapper() {
  if (!RealmProvider) {
    return null;
  }
  return (
    <TailwindProvider utilities={utilities}>
      <RealmProvider>
        <App />
      </RealmProvider>
    </TailwindProvider>
  );
}

export default AppWrapper;
