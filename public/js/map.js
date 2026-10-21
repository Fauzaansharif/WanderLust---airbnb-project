const map = new mapboxgl.Map({
  accessToken: mapToken,
  container: "map",
  style: "mapbox://styles/mapbox/outdoors-v12",
  center: listing.geometry.coordinates,
  zoom: 15,
});
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25, className: "my-class" }).setHTML(
      `<h4> ${listing.location}</h4> <p>Exact location provided after booking</p>`,
    ),
  )
  .addTo(map);
