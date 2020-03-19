/**
 *
 */
function addWebTiledLayer(map, WebTiledLayer, tileInfo, imageid, versionid) {
  const layer = new WebTiledLayer(
    `https://service.siweiearth.com/wmts/seis/v3/wmts/image_tile/${imageid}/${versionid}?access_token=9277ff7eef009cc136b6d242f35a674b&product_id=2&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={level}&TileCol={col}&TileRow={row}`,
    { tileInfo: tileInfo }
  );
  console.log(tileInfo);
  map.addLayer(layer);
}

export default { addWebTiledLayer };
