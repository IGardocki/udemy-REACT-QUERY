import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";

export function Loading() {
  // use React Query `useIsFetching` to determine whether or not to display
  // this is uper cool becasue it lets us look if anything is
  // loading in the loading component itself
  // We can do global handling
  const isFetching = useIsFetching(); // returns number of calls in fetching state
  const display = isFetching ? "inherit" : "none";

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
