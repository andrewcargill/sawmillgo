export const getGeolocation = (onSuccess, onError) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const limitedLatitude = parseFloat(position.coords.latitude.toFixed(14));
          const limitedLongitude = parseFloat(position.coords.longitude.toFixed(14));
          onSuccess(limitedLatitude.toString(), limitedLongitude.toString());
        },
        (error) => {
          console.error(error);
          onError(error);
        }
      );
    } else {
      const error = "Geolocation is not supported by this browser.";
      console.error(error);
      onError(error);
    }
  };
  