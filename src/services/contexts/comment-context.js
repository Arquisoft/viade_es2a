const commentContext = Object.freeze({
  "@context": {
    "@version": 1.1,
    comments: { "@container": "@list", "@id": "viade:comments" },
    comment: { "@id": "viade:comment", "@type": "@id" },
    dateCreated: { "@id": "viade:dateCreated", "@type": "xsd:date" },
    text: { "@id": "viade:text", "@type": "xsd:string" },
    viade: "http://arquisoft.github.io/viadeSpec/",
    xsd: "http://www.w3.org/2001/XMLSchema#"
  }
});
export default commentContext;
