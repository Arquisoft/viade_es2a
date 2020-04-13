export const getMarkerIcon = id => {
    return new window.google.maps.MarkerImage(
        `img/icon/marker/${id}.svg`,
        null,
        null, /* origin */
        null,
        new window.google.maps.Size(32, 32)
    );
};