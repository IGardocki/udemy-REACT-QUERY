import { toast } from "@/components/app/toast";
import { QueryCache, QueryClient } from "@tanstack/react-query";
function errorHandler(errorMsg: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = "react-query-toast";

  if (!toast.isActive(id)) {
    const action = "fetch";
    const title = `could not ${action} data: ${
      errorMsg ?? "error connecting to server"
    }`;
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClient = new QueryClient({
    // queryCache lets us set up an error handler in
    // the queryClient
    // super cool bc we can do global error handling
    queryCache: new QueryCache({
        onError: error =>{errorHandler(error.message)}
    })
});