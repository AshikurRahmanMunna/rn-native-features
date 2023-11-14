export const getMapPreview = (
  lat: number,
  lng: number,
  original: boolean = false
) => {
  const imagePreviewUrl = original
    ? `https://maps.google.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=`
    : "https://staticmapmaker.com/img/google-placeholder.png";
  return imagePreviewUrl;
};

export const getAddress = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.display_name as string;
  return address;
};
