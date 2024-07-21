/**
 * Asynchronously fetches sessions data from the server.
 * If the response status is 401, logs the error message and signs out the user.
 * Otherwise, sets the fetched sessions data, and updates the loading state.
 * Logs an error message if an error occurs during the fetching process.
 */
const fetchSessions = async () => {
  setIsLoading(true);

  try {
    const res = await fetch("/api/sessions");

    if (res.status === 401) {
      // If the user is not authorized, log the error message and sign out
      console.log((await res.json()).error);
      signOut();
    } else {
      // If the user is authorized, set the fetched sessions data
      setSessions(await res.json());
    }
  } catch (error) {
    // Log an error message if an error occurs during the fetching process
    console.error("Error fetching sessions:", error);
  } finally {
    // Update the loading state
    setIsLoading(false);
  }
};

export default fetchSessions;
