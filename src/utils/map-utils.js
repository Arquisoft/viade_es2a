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

export const getLocation = (onSuccess, onError) => {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(pos => {
            onSuccess({
                lng: pos.coords.longitude,
                lat: pos.coords.latitude,
                altitude: pos.coords.altitude,
                accuracy: pos.coords.accuracy
            });
        }, onError);
    else onError();
};

export const computeDistance = polyline => {
    if (polyline)
        return formatDistance(window.google.maps.geometry.spherical.computeLength(polyline.getPath().getArray()));
};

export const formatDistance = distance => {
    let rawDistance = parseFloat(distance);
    if (Number.isNaN(rawDistance))
        return '-';

    let metters = rawDistance < 1000;
    if (!metters)
        rawDistance /= 1000;

    let d = Math.round((rawDistance + Number.EPSILON) * 100) / 100;
    return d + (metters ? 'm' : 'km');
};