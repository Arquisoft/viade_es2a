const routeContext = Object.freeze({
    "@version": 1.1,
    "comments": {
        "@id":"viade:routeComments",
        "@type":"@id"
    },
    "description": {
        "@id": "schema:description",
        "@type": "xs:string"
    },
    "date": {
        "@id": "schema:uploadDate",
        "@type": "xs:long"
    },
    "media": {
        "@container": "@list",
        "@id": "viade:media"
    },
    "name": {
        "@id": "schema:name",
        "@type": "xs:string"
    },
    "author": {
        "@id": "schema:author",
        "@type": "@id"
    },
    "points": {
        "@container": "@list",
        "@id": "viade:points"
    },
    "waypoints": {
        "@container": "@list",
        "@id": "viade:waypoints"
    },
    "latitude": {
        "@id": "schema:latitude",
        "@type": "xs:double"
    },
    "longitude": {
        "@id": "schema:longitude",
        "@type": "xs:double"
    },
    "schema": "http://schema.org/",
    "viade": "http://arquisoft.github.io/viadeSpec/",
    "xs": "http://www.w3.org/2001/XMLSchema#"
});

export default routeContext;