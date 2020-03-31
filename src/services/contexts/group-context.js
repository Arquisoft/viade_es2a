const groupContext = Object.freeze({
    "@version": 1.1,
    "friends": {
      "@container": "@list",
      "@id": "viade:friends"
    },
    "name": {
      "@id": "schema:name",
      "@type": "xs:string"
    },
    "date": {
      "@id": "schema:dateCreated",
      "@type": "xs:long"
    },
    "description": {
      "@id": "schema:description",
      "@type": "xs:string"
    },
    "schema": "http://schema.org/",
    "viade": "http://arquisoft.github.io/viadeSpec/",
    "xs": "http://www.w3.org/2001/XMLSchema#"
  });

export default groupContext;
