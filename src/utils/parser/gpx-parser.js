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

    let routes = parsedData.tracks.map(track => parseTrack(track, waypoints));
    if (!routes || !routes.length)
      routes = parsedData.routes.map(track => parseTrack(track, waypoints));

    onComplete(routes);
  };

const parseTrack = (track, waypoints) => {
  let points = parsePoints(track);

  if (!points || !points.length)
    points = { lat: 0, lng: 0 };

  return {
    name: track.name ? track.name : 'GPX No name',
    description: track.description,
    points,
    waypoints
  };
};

const parsePoints = track => {
  if (track.segments)
    return track.segments.map(segment => segment.map(trkpt => {
      return {
        lng: trkpt.lon,
        lat: trkpt.lat,
        elevation: trkpt.elevation
      }
    })).flat();

  else if (track.points)
    return track.points.map(point => {
      return {
        lng: point.lon,
        lat: point.lat,
        elevation: point.elevation
      }
    });

  else return [];
};

export const parse = (gpxData, onComplete) => {
  parseGpx(gpxData, handleParse(onComplete));
};

export const parseRemote = (uri, onComplete) => {
  parseRemoteGpxFile(uri, handleParse(onComplete));
};