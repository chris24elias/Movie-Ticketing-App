import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider, StatusBar } from "native-base";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Navigation } from "./src/navigation";

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
          <Navigation />
          <StatusBar barStyle="light-content" />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
