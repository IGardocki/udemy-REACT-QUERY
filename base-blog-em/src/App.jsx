import { Posts } from "./Posts";
import "./App.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools' //ReactQueryDevtools wrapper must be inside QueryClientProvider

const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
      {/* </ReactQueryDevtools> */}
    </QueryClientProvider>

  );
}

export default App;
