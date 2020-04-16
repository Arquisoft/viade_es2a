export const getMarkerIcon = id => {
    if (window.google)
        return new window.google.maps.MarkerImage(
            `img/icon/marker/${id}.svg`,
            null,
            null, /* origin */
            null,
            new window.google.maps.Size(32, 32)
        );
};