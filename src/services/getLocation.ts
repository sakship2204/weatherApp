export async function getCoordinates(locationInput: string) {
  if (typeof locationInput !== "string") {
    console.error("Expected locationInput to be a string:", locationInput);
    return null;
  }

  const trimmedLocation = locationInput.trim();

  if (!trimmedLocation) {
    return null;
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", trimmedLocation);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Geocoding request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      // Nominatim returns coordinates as strings inside an array of matches
      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);

      console.log(`Location: ${data[0].display_name}`);

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      return { latitude, longitude, location: data[0].display_name };
    } else {
      console.log("No results found for that location.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
}
