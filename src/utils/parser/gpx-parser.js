import { parseGpx, parseRemoteGpxFile } from "viade-gpx-parse";

const handleParse = onComplete =>
  (err, parsedData) => {
    if (err)
      throw err;

    let waypoints = parsedData.waypoints.map(wp => {
      return {
        name: wp.name,
        description: wp.desc,
        lng: wp.lon,
        lat: wp.lat,
        elevation: wp.elevation
      }
    });

    const routes = parsedData.tracks.map(track => parseTrack(track, waypoints));
    onComplete(routes);
  };

const parseTrack = (track, waypoints) => {
  const points = parsePoints(track);

  return {
    name: track.name,
    description: track.description,
    points,
    waypoints
  };
};

const parsePoints = track => {
  return track.segments.map(segment => segment.map(trkpt => {
    return {
      lng: trkpt.lon,
      lat: trkpt.lat,
      elevation: trkpt.elevation
    }
  })).flat();
};

export const parse = (gpxData, onComplete) => {
  parseGpx(gpxData, handleParse(onComplete));
};

export const parseRemote = (uri, onComplete) => {
  parseRemoteGpxFile(uri, handleParse(onComplete));
};