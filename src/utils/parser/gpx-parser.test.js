import { parse } from './gpx-parser';

import '@testing-library/jest-dom/';

const testGPX = `<gpx creator="GPS Visualizer https://www.gpsvisualizer.com/" version="1.0">
<wpt lat="45.44283" lon="-121.72904"><ele>1374</ele><name>Vista Ridge Trailhead</name><sym>Trail Head</sym></wpt>
<wpt lat="45.41000" lon="-121.71349"><ele>1777</ele><name>Wy'East Basin</name></wpt>
<wpt lat="45.41124" lon="-121.70404"><ele>1823</ele><name>Dollar Lake</name></wpt>
<wpt lat="45.39260" lon="-121.69937"><ele>2394</ele><name>Barrett Spur</name><sym>Summit</sym></wpt>
<trk>
  <name>Barrett Spur 1</name>
  <extensions>
    <line xmlns="http://www.topografix.com/GPX/gpx_style/0/2">
      <color>9900ff</color>
    </line>
  </extensions>
  <trkseg>
    <trkpt lat="45.4431641" lon="-121.7295456"></trkpt>
    <trkpt lat="45.4428615" lon="-121.7290800"></trkpt>
    <trkpt lat="45.4425697" lon="-121.7279085"></trkpt>
    <trkpt lat="45.4424274" lon="-121.7267360"></trkpt>
    <trkpt lat="45.4422017" lon="-121.7260429"></trkpt>
    <trkpt lat="45.4416576" lon="-121.7252347"></trkpt>
    <trkpt lat="45.4406144" lon="-121.7241181"></trkpt>
    <trkpt lat="45.4398193" lon="-121.7224890"></trkpt>
    <trkpt lat="45.4387649" lon="-121.7226112"></trkpt>
    <trkpt lat="45.4383933" lon="-121.7224328"></trkpt>
    <trkpt lat="45.4377850" lon="-121.7224159"></trkpt>
    <trkpt lat="45.4372204" lon="-121.7226603"></trkpt>
    <trkpt lat="45.4347837" lon="-121.7226007"></trkpt>
    <trkpt lat="45.4332000" lon="-121.7216480"></trkpt>
    <trkpt lat="45.4334576" lon="-121.7223143"></trkpt>
    <trkpt lat="45.4321730" lon="-121.7222102"></trkpt>
    <trkpt lat="45.4316609" lon="-121.7219974"></trkpt>
    <trkpt lat="45.4303068" lon="-121.7220616"></trkpt>
    <trkpt lat="45.4270753" lon="-121.7209685"></trkpt>
    <trkpt lat="45.4267610" lon="-121.7211872"></trkpt>
    <trkpt lat="45.4260133" lon="-121.7212623"></trkpt>
    <trkpt lat="45.4257683" lon="-121.7214738"></trkpt>
    <trkpt lat="45.4257400" lon="-121.7217762"></trkpt>
    <trkpt lat="45.4259485" lon="-121.7226009"></trkpt>
    <trkpt lat="45.4249972" lon="-121.7223672"></trkpt>
    <trkpt lat="45.4246035" lon="-121.7219816"></trkpt>
    <trkpt lat="45.4238682" lon="-121.7219830"></trkpt>
    <trkpt lat="45.4226721" lon="-121.7216494"></trkpt>
    <trkpt lat="45.4224120" lon="-121.7217998"></trkpt>
    <trkpt lat="45.4211497" lon="-121.7218767"></trkpt>
    <trkpt lat="45.4193319" lon="-121.7208650"></trkpt>
    <trkpt lat="45.4186435" lon="-121.7202956"></trkpt>
    <trkpt lat="45.4185934" lon="-121.7200745"></trkpt>
    <trkpt lat="45.4178963" lon="-121.7196035"></trkpt>
    <trkpt lat="45.4171101" lon="-121.7198115"></trkpt>
    <trkpt lat="45.4166827" lon="-121.7193250"></trkpt>
    <trkpt lat="45.4161855" lon="-121.7190778"></trkpt>
    <trkpt lat="45.4159291" lon="-121.7193146"></trkpt>
    <trkpt lat="45.4153644" lon="-121.7193939"></trkpt>
    <trkpt lat="45.4151268" lon="-121.7191578"></trkpt>
    <trkpt lat="45.4148071" lon="-121.7191043"></trkpt>
    <trkpt lat="45.4146310" lon="-121.7187962"></trkpt>
    <trkpt lat="45.4142524" lon="-121.7187236"></trkpt>
    <trkpt lat="45.4142844" lon="-121.7185595"></trkpt>
    <trkpt lat="45.4133520" lon="-121.7180429"></trkpt>
    <trkpt lat="45.4131406" lon="-121.7181383"></trkpt>
    <trkpt lat="45.4130356" lon="-121.7179036"></trkpt>
    <trkpt lat="45.4118436" lon="-121.7168789"></trkpt>
    <trkpt lat="45.4109205" lon="-121.7156569"></trkpt>
    <trkpt lat="45.4104523" lon="-121.7145250"></trkpt>
    <trkpt lat="45.4104930" lon="-121.7143814"></trkpt>
    <trkpt lat="45.4102075" lon="-121.7140608"></trkpt>
    <trkpt lat="45.4099806" lon="-121.7134527"></trkpt>
  </trkseg>
  <trkseg>
    <trkpt lat="45.4099792" lon="-121.7134610"></trkpt>
    <trkpt lat="45.4091489" lon="-121.7134937"></trkpt>
    <trkpt lat="45.4086133" lon="-121.7132504"></trkpt>
    <trkpt lat="45.4080616" lon="-121.7127670"></trkpt>
    <trkpt lat="45.4076426" lon="-121.7126047"></trkpt>
    <trkpt lat="45.4075043" lon="-121.7122301"></trkpt>
    <trkpt lat="45.4070652" lon="-121.7118980"></trkpt>
    <trkpt lat="45.4068712" lon="-121.7114766"></trkpt>
    <trkpt lat="45.4067987" lon="-121.7108634"></trkpt>
    <trkpt lat="45.4064528" lon="-121.7106934"></trkpt>
    <trkpt lat="45.4057286" lon="-121.7110326"></trkpt>
    <trkpt lat="45.4056813" lon="-121.7108280"></trkpt>
    <trkpt lat="45.4055566" lon="-121.7109216"></trkpt>
    <trkpt lat="45.4047244" lon="-121.7093884"></trkpt>
    <trkpt lat="45.4039059" lon="-121.7083824"></trkpt>
    <trkpt lat="45.4037176" lon="-121.7077738"></trkpt>
    <trkpt lat="45.4034533" lon="-121.7074489"></trkpt>
    <trkpt lat="45.4026499" lon="-121.7071945"></trkpt>
    <trkpt lat="45.4019737" lon="-121.7067004"></trkpt>
    <trkpt lat="45.4018086" lon="-121.7067477"></trkpt>
    <trkpt lat="45.4014084" lon="-121.7063918"></trkpt>
    <trkpt lat="45.4013177" lon="-121.7059701"></trkpt>
    <trkpt lat="45.4011965" lon="-121.7058914"></trkpt>
    <trkpt lat="45.4010688" lon="-121.7053257"></trkpt>
    <trkpt lat="45.4008116" lon="-121.7054978"></trkpt>
    <trkpt lat="45.4006075" lon="-121.7053495"></trkpt>
    <trkpt lat="45.4005546" lon="-121.7054856"></trkpt>
    <trkpt lat="45.3991622" lon="-121.7049765"></trkpt>
    <trkpt lat="45.3985560" lon="-121.7042976"></trkpt>
    <trkpt lat="45.3981831" lon="-121.7042260"></trkpt>
    <trkpt lat="45.3973151" lon="-121.7036992"></trkpt>
    <trkpt lat="45.3967974" lon="-121.7036370"></trkpt>
    <trkpt lat="45.3963985" lon="-121.7033742"></trkpt>
    <trkpt lat="45.3945456" lon="-121.7029688"></trkpt>
    <trkpt lat="45.3920595" lon="-121.7015918"></trkpt>
    <trkpt lat="45.3907614" lon="-121.7012029"></trkpt>
    <trkpt lat="45.3906454" lon="-121.7010483"></trkpt>
    <trkpt lat="45.3906726" lon="-121.7008185"></trkpt>
    <trkpt lat="45.3909774" lon="-121.7008263"></trkpt>
    <trkpt lat="45.3911315" lon="-121.7004300"></trkpt>
    <trkpt lat="45.3909963" lon="-121.6998193"></trkpt>
    <trkpt lat="45.3908688" lon="-121.6997923"></trkpt>
    <trkpt lat="45.3917895" lon="-121.6994679"></trkpt>
    <trkpt lat="45.3926205" lon="-121.6994847"></trkpt>
    <trkpt lat="45.3925915" lon="-121.6992485"></trkpt>
    <trkpt lat="45.3928117" lon="-121.6995661"></trkpt>
  </trkseg>
</trk>
<trk>
  <name>Barrett Spur 2</name>
  <trkseg>
    <trkpt lat="45.3928201" lon="-121.6995658"></trkpt>
    <trkpt lat="45.3935449" lon="-121.6998805"></trkpt>
    <trkpt lat="45.3937897" lon="-121.6997710"></trkpt>
    <trkpt lat="45.3941789" lon="-121.6999492"></trkpt>
    <trkpt lat="45.3942372" lon="-121.7001375"></trkpt>
    <trkpt lat="45.3946353" lon="-121.6999452"></trkpt>
    <trkpt lat="45.3953599" lon="-121.7005823"></trkpt>
    <trkpt lat="45.3957081" lon="-121.7006533"></trkpt>
    <trkpt lat="45.3964324" lon="-121.7016813"></trkpt>
    <trkpt lat="45.3965766" lon="-121.7016905"></trkpt>
    <trkpt lat="45.3969060" lon="-121.7028225"></trkpt>
    <trkpt lat="45.3968739" lon="-121.7033856"></trkpt>
    <trkpt lat="45.3974854" lon="-121.7040597"></trkpt>
    <trkpt lat="45.3986110" lon="-121.7044455"></trkpt>
    <trkpt lat="45.3993308" lon="-121.7050832"></trkpt>
    <trkpt lat="45.4006454" lon="-121.7055117"></trkpt>
    <trkpt lat="45.4017924" lon="-121.7049952"></trkpt>
    <trkpt lat="45.4028690" lon="-121.7048065"></trkpt>
    <trkpt lat="45.4055213" lon="-121.7056599"></trkpt>
    <trkpt lat="45.4055606" lon="-121.7058477"></trkpt>
  </trkseg>
  <trkseg>
    <trkpt lat="45.4055556" lon="-121.7058619"></trkpt>
    <trkpt lat="45.4057016" lon="-121.7055424"></trkpt>
    <trkpt lat="45.4064672" lon="-121.7058247"></trkpt>
    <trkpt lat="45.4065550" lon="-121.7056490"></trkpt>
    <trkpt lat="45.4081392" lon="-121.7055042"></trkpt>
    <trkpt lat="45.4084785" lon="-121.7052201"></trkpt>
    <trkpt lat="45.4089125" lon="-121.7053029"></trkpt>
    <trkpt lat="45.4097597" lon="-121.7050730"></trkpt>
    <trkpt lat="45.4098359" lon="-121.7049047"></trkpt>
    <trkpt lat="45.4101859" lon="-121.7049419"></trkpt>
    <trkpt lat="45.4109946" lon="-121.7045409"></trkpt>
    <trkpt lat="45.4110654" lon="-121.7040909"></trkpt>
    <trkpt lat="45.4113353" lon="-121.7039421"></trkpt>
    <trkpt lat="45.4119105" lon="-121.7047169"></trkpt>
    <trkpt lat="45.4120297" lon="-121.7046115"></trkpt>
    <trkpt lat="45.4123835" lon="-121.7049762"></trkpt>
    <trkpt lat="45.4125020" lon="-121.7053677"></trkpt>
    <trkpt lat="45.4134357" lon="-121.7051916"></trkpt>
    <trkpt lat="45.4135832" lon="-121.7046182"></trkpt>
    <trkpt lat="45.4139565" lon="-121.7044171"></trkpt>
    <trkpt lat="45.4140658" lon="-121.7041636"></trkpt>
    <trkpt lat="45.4145098" lon="-121.7041176"></trkpt>
    <trkpt lat="45.4141414" lon="-121.7043045"></trkpt>
    <trkpt lat="45.4141558" lon="-121.7050125"></trkpt>
    <trkpt lat="45.4136095" lon="-121.7071948"></trkpt>
    <trkpt lat="45.4126067" lon="-121.7080044"></trkpt>
    <trkpt lat="45.4122181" lon="-121.7088539"></trkpt>
    <trkpt lat="45.4124283" lon="-121.7092346"></trkpt>
    <trkpt lat="45.4119295" lon="-121.7101625"></trkpt>
    <trkpt lat="45.4124117" lon="-121.7104037"></trkpt>
    <trkpt lat="45.4122553" lon="-121.7107970"></trkpt>
    <trkpt lat="45.4116919" lon="-121.7107601"></trkpt>
    <trkpt lat="45.4116619" lon="-121.7110571"></trkpt>
    <trkpt lat="45.4113536" lon="-121.7114942"></trkpt>
    <trkpt lat="45.4114186" lon="-121.7117619"></trkpt>
    <trkpt lat="45.4110215" lon="-121.7125886"></trkpt>
    <trkpt lat="45.4106014" lon="-121.7125816"></trkpt>
    <trkpt lat="45.4104916" lon="-121.7129590"></trkpt>
    <trkpt lat="45.4102544" lon="-121.7130066"></trkpt>
    <trkpt lat="45.4099714" lon="-121.7134279"></trkpt>
  </trkseg>
  <trkseg>
    <trkpt lat="45.4099747" lon="-121.7134529"></trkpt>
    <trkpt lat="45.4110685" lon="-121.7158641"></trkpt>
    <trkpt lat="45.4121873" lon="-121.7171940"></trkpt>
    <trkpt lat="45.4131063" lon="-121.7179663"></trkpt>
    <trkpt lat="45.4146646" lon="-121.7186587"></trkpt>
    <trkpt lat="45.4147872" lon="-121.7190281"></trkpt>
    <trkpt lat="45.4153143" lon="-121.7192079"></trkpt>
    <trkpt lat="45.4153716" lon="-121.7193714"></trkpt>
    <trkpt lat="45.4164891" lon="-121.7190904"></trkpt>
    <trkpt lat="45.4172221" lon="-121.7196833"></trkpt>
    <trkpt lat="45.4179416" lon="-121.7195244"></trkpt>
    <trkpt lat="45.4185782" lon="-121.7197987"></trkpt>
    <trkpt lat="45.4193540" lon="-121.7207025"></trkpt>
    <trkpt lat="45.4214007" lon="-121.7218387"></trkpt>
    <trkpt lat="45.4226606" lon="-121.7215644"></trkpt>
    <trkpt lat="45.4247590" lon="-121.7218690"></trkpt>
    <trkpt lat="45.4249036" lon="-121.7221738"></trkpt>
    <trkpt lat="45.4259458" lon="-121.7225690"></trkpt>
    <trkpt lat="45.4257020" lon="-121.7216118"></trkpt>
    <trkpt lat="45.4260738" lon="-121.7212258"></trkpt>
    <trkpt lat="45.4272087" lon="-121.7208974"></trkpt>
    <trkpt lat="45.4277253" lon="-121.7209468"></trkpt>
    <trkpt lat="45.4283981" lon="-121.7213890"></trkpt>
    <trkpt lat="45.4288768" lon="-121.7213453"></trkpt>
    <trkpt lat="45.4301857" lon="-121.7219605"></trkpt>
    <trkpt lat="45.4312165" lon="-121.7219340"></trkpt>
    <trkpt lat="45.4334856" lon="-121.7222528"></trkpt>
    <trkpt lat="45.4331572" lon="-121.7216508"></trkpt>
    <trkpt lat="45.4336070" lon="-121.7217366"></trkpt>
    <trkpt lat="45.4350551" lon="-121.7225997"></trkpt>
    <trkpt lat="45.4371233" lon="-121.7226122"></trkpt>
    <trkpt lat="45.4378561" lon="-121.7223631"></trkpt>
    <trkpt lat="45.4387304" lon="-121.7225545"></trkpt>
    <trkpt lat="45.4397525" lon="-121.7223926"></trkpt>
    <trkpt lat="45.4407832" lon="-121.7243251"></trkpt>
    <trkpt lat="45.4422796" lon="-121.7260896"></trkpt>
    <trkpt lat="45.4428882" lon="-121.7291117"></trkpt>
    <trkpt lat="45.4431708" lon="-121.7295917"></trkpt>
  </trkseg>
</trk>
</gpx>`;

const expectedOutput = `[{"name":"Barrett Spur 1","description":"","points":[{"lng":-121.7295456,"lat":45.4431641,"elevation":-1},{"lng":-121.72908,"lat":45.4428615,"elevation":-1},{"lng":-121.7279085,"lat":45.4425697,"elevation":-1},{"lng":-121.726736,"lat":45.4424274,"elevation":-1},{"lng":-121.7260429,"lat":45.4422017,"elevation":-1},{"lng":-121.7252347,"lat":45.4416576,"elevation":-1},{"lng":-121.7241181,"lat":45.4406144,"elevation":-1},{"lng":-121.722489,"lat":45.4398193,"elevation":-1},{"lng":-121.7226112,"lat":45.4387649,"elevation":-1},{"lng":-121.7224328,"lat":45.4383933,"elevation":-1},{"lng":-121.7224159,"lat":45.437785,"elevation":-1},{"lng":-121.7226603,"lat":45.4372204,"elevation":-1},{"lng":-121.7226007,"lat":45.4347837,"elevation":-1},{"lng":-121.721648,"lat":45.4332,"elevation":-1},{"lng":-121.7223143,"lat":45.4334576,"elevation":-1},{"lng":-121.7222102,"lat":45.432173,"elevation":-1},{"lng":-121.7219974,"lat":45.4316609,"elevation":-1},{"lng":-121.7220616,"lat":45.4303068,"elevation":-1},{"lng":-121.7209685,"lat":45.4270753,"elevation":-1},{"lng":-121.7211872,"lat":45.426761,"elevation":-1},{"lng":-121.7212623,"lat":45.4260133,"elevation":-1},{"lng":-121.7214738,"lat":45.4257683,"elevation":-1},{"lng":-121.7217762,"lat":45.42574,"elevation":-1},{"lng":-121.7226009,"lat":45.4259485,"elevation":-1},{"lng":-121.7223672,"lat":45.4249972,"elevation":-1},{"lng":-121.7219816,"lat":45.4246035,"elevation":-1},{"lng":-121.721983,"lat":45.4238682,"elevation":-1},{"lng":-121.7216494,"lat":45.4226721,"elevation":-1},{"lng":-121.7217998,"lat":45.422412,"elevation":-1},{"lng":-121.7218767,"lat":45.4211497,"elevation":-1},{"lng":-121.720865,"lat":45.4193319,"elevation":-1},{"lng":-121.7202956,"lat":45.4186435,"elevation":-1},{"lng":-121.7200745,"lat":45.4185934,"elevation":-1},{"lng":-121.7196035,"lat":45.4178963,"elevation":-1},{"lng":-121.7198115,"lat":45.4171101,"elevation":-1},{"lng":-121.719325,"lat":45.4166827,"elevation":-1},{"lng":-121.7190778,"lat":45.4161855,"elevation":-1},{"lng":-121.7193146,"lat":45.4159291,"elevation":-1},{"lng":-121.7193939,"lat":45.4153644,"elevation":-1},{"lng":-121.7191578,"lat":45.4151268,"elevation":-1},{"lng":-121.7191043,"lat":45.4148071,"elevation":-1},{"lng":-121.7187962,"lat":45.414631,"elevation":-1},{"lng":-121.7187236,"lat":45.4142524,"elevation":-1},{"lng":-121.7185595,"lat":45.4142844,"elevation":-1},{"lng":-121.7180429,"lat":45.413352,"elevation":-1},{"lng":-121.7181383,"lat":45.4131406,"elevation":-1},{"lng":-121.7179036,"lat":45.4130356,"elevation":-1},{"lng":-121.7168789,"lat":45.4118436,"elevation":-1},{"lng":-121.7156569,"lat":45.4109205,"elevation":-1},{"lng":-121.714525,"lat":45.4104523,"elevation":-1},{"lng":-121.7143814,"lat":45.410493,"elevation":-1},{"lng":-121.7140608,"lat":45.4102075,"elevation":-1},{"lng":-121.7134527,"lat":45.4099806,"elevation":-1},{"lng":-121.713461,"lat":45.4099792,"elevation":-1},{"lng":-121.7134937,"lat":45.4091489,"elevation":-1},{"lng":-121.7132504,"lat":45.4086133,"elevation":-1},{"lng":-121.712767,"lat":45.4080616,"elevation":-1},{"lng":-121.7126047,"lat":45.4076426,"elevation":-1},{"lng":-121.7122301,"lat":45.4075043,"elevation":-1},{"lng":-121.711898,"lat":45.4070652,"elevation":-1},{"lng":-121.7114766,"lat":45.4068712,"elevation":-1},{"lng":-121.7108634,"lat":45.4067987,"elevation":-1},{"lng":-121.7106934,"lat":45.4064528,"elevation":-1},{"lng":-121.7110326,"lat":45.4057286,"elevation":-1},{"lng":-121.710828,"lat":45.4056813,"elevation":-1},{"lng":-121.7109216,"lat":45.4055566,"elevation":-1},{"lng":-121.7093884,"lat":45.4047244,"elevation":-1},{"lng":-121.7083824,"lat":45.4039059,"elevation":-1},{"lng":-121.7077738,"lat":45.4037176,"elevation":-1},{"lng":-121.7074489,"lat":45.4034533,"elevation":-1},{"lng":-121.7071945,"lat":45.4026499,"elevation":-1},{"lng":-121.7067004,"lat":45.4019737,"elevation":-1},{"lng":-121.7067477,"lat":45.4018086,"elevation":-1},{"lng":-121.7063918,"lat":45.4014084,"elevation":-1},{"lng":-121.7059701,"lat":45.4013177,"elevation":-1},{"lng":-121.7058914,"lat":45.4011965,"elevation":-1},{"lng":-121.7053257,"lat":45.4010688,"elevation":-1},{"lng":-121.7054978,"lat":45.4008116,"elevation":-1},{"lng":-121.7053495,"lat":45.4006075,"elevation":-1},{"lng":-121.7054856,"lat":45.4005546,"elevation":-1},{"lng":-121.7049765,"lat":45.3991622,"elevation":-1},{"lng":-121.7042976,"lat":45.398556,"elevation":-1},{"lng":-121.704226,"lat":45.3981831,"elevation":-1},{"lng":-121.7036992,"lat":45.3973151,"elevation":-1},{"lng":-121.703637,"lat":45.3967974,"elevation":-1},{"lng":-121.7033742,"lat":45.3963985,"elevation":-1},{"lng":-121.7029688,"lat":45.3945456,"elevation":-1},{"lng":-121.7015918,"lat":45.3920595,"elevation":-1},{"lng":-121.7012029,"lat":45.3907614,"elevation":-1},{"lng":-121.7010483,"lat":45.3906454,"elevation":-1},{"lng":-121.7008185,"lat":45.3906726,"elevation":-1},{"lng":-121.7008263,"lat":45.3909774,"elevation":-1},{"lng":-121.70043,"lat":45.3911315,"elevation":-1},{"lng":-121.6998193,"lat":45.3909963,"elevation":-1},{"lng":-121.6997923,"lat":45.3908688,"elevation":-1},{"lng":-121.6994679,"lat":45.3917895,"elevation":-1},{"lng":-121.6994847,"lat":45.3926205,"elevation":-1},{"lng":-121.6992485,"lat":45.3925915,"elevation":-1},{"lng":-121.6995661,"lat":45.3928117,"elevation":-1}],"waypoints":[{"name":"Vista Ridge Trailhead","lng":-121.72904,"lat":45.44283,"elevation":1374},{"name":"Wy'East Basin","lng":-121.71349,"lat":45.41,"elevation":1777},{"name":"Dollar Lake","lng":-121.70404,"lat":45.41124,"elevation":1823},{"name":"Barrett Spur","lng":-121.69937,"lat":45.3926,"elevation":2394}]},{"name":"Barrett Spur 2","description":"","points":[{"lng":-121.6995658,"lat":45.3928201,"elevation":-1},{"lng":-121.6998805,"lat":45.3935449,"elevation":-1},{"lng":-121.699771,"lat":45.3937897,"elevation":-1},{"lng":-121.6999492,"lat":45.3941789,"elevation":-1},{"lng":-121.7001375,"lat":45.3942372,"elevation":-1},{"lng":-121.6999452,"lat":45.3946353,"elevation":-1},{"lng":-121.7005823,"lat":45.3953599,"elevation":-1},{"lng":-121.7006533,"lat":45.3957081,"elevation":-1},{"lng":-121.7016813,"lat":45.3964324,"elevation":-1},{"lng":-121.7016905,"lat":45.3965766,"elevation":-1},{"lng":-121.7028225,"lat":45.396906,"elevation":-1},{"lng":-121.7033856,"lat":45.3968739,"elevation":-1},{"lng":-121.7040597,"lat":45.3974854,"elevation":-1},{"lng":-121.7044455,"lat":45.398611,"elevation":-1},{"lng":-121.7050832,"lat":45.3993308,"elevation":-1},{"lng":-121.7055117,"lat":45.4006454,"elevation":-1},{"lng":-121.7049952,"lat":45.4017924,"elevation":-1},{"lng":-121.7048065,"lat":45.402869,"elevation":-1},{"lng":-121.7056599,"lat":45.4055213,"elevation":-1},{"lng":-121.7058477,"lat":45.4055606,"elevation":-1},{"lng":-121.7058619,"lat":45.4055556,"elevation":-1},{"lng":-121.7055424,"lat":45.4057016,"elevation":-1},{"lng":-121.7058247,"lat":45.4064672,"elevation":-1},{"lng":-121.705649,"lat":45.406555,"elevation":-1},{"lng":-121.7055042,"lat":45.4081392,"elevation":-1},{"lng":-121.7052201,"lat":45.4084785,"elevation":-1},{"lng":-121.7053029,"lat":45.4089125,"elevation":-1},{"lng":-121.705073,"lat":45.4097597,"elevation":-1},{"lng":-121.7049047,"lat":45.4098359,"elevation":-1},{"lng":-121.7049419,"lat":45.4101859,"elevation":-1},{"lng":-121.7045409,"lat":45.4109946,"elevation":-1},{"lng":-121.7040909,"lat":45.4110654,"elevation":-1},{"lng":-121.7039421,"lat":45.4113353,"elevation":-1},{"lng":-121.7047169,"lat":45.4119105,"elevation":-1},{"lng":-121.7046115,"lat":45.4120297,"elevation":-1},{"lng":-121.7049762,"lat":45.4123835,"elevation":-1},{"lng":-121.7053677,"lat":45.412502,"elevation":-1},{"lng":-121.7051916,"lat":45.4134357,"elevation":-1},{"lng":-121.7046182,"lat":45.4135832,"elevation":-1},{"lng":-121.7044171,"lat":45.4139565,"elevation":-1},{"lng":-121.7041636,"lat":45.4140658,"elevation":-1},{"lng":-121.7041176,"lat":45.4145098,"elevation":-1},{"lng":-121.7043045,"lat":45.4141414,"elevation":-1},{"lng":-121.7050125,"lat":45.4141558,"elevation":-1},{"lng":-121.7071948,"lat":45.4136095,"elevation":-1},{"lng":-121.7080044,"lat":45.4126067,"elevation":-1},{"lng":-121.7088539,"lat":45.4122181,"elevation":-1},{"lng":-121.7092346,"lat":45.4124283,"elevation":-1},{"lng":-121.7101625,"lat":45.4119295,"elevation":-1},{"lng":-121.7104037,"lat":45.4124117,"elevation":-1},{"lng":-121.710797,"lat":45.4122553,"elevation":-1},{"lng":-121.7107601,"lat":45.4116919,"elevation":-1},{"lng":-121.7110571,"lat":45.4116619,"elevation":-1},{"lng":-121.7114942,"lat":45.4113536,"elevation":-1},{"lng":-121.7117619,"lat":45.4114186,"elevation":-1},{"lng":-121.7125886,"lat":45.4110215,"elevation":-1},{"lng":-121.7125816,"lat":45.4106014,"elevation":-1},{"lng":-121.712959,"lat":45.4104916,"elevation":-1},{"lng":-121.7130066,"lat":45.4102544,"elevation":-1},{"lng":-121.7134279,"lat":45.4099714,"elevation":-1},{"lng":-121.7134529,"lat":45.4099747,"elevation":-1},{"lng":-121.7158641,"lat":45.4110685,"elevation":-1},{"lng":-121.717194,"lat":45.4121873,"elevation":-1},{"lng":-121.7179663,"lat":45.4131063,"elevation":-1},{"lng":-121.7186587,"lat":45.4146646,"elevation":-1},{"lng":-121.7190281,"lat":45.4147872,"elevation":-1},{"lng":-121.7192079,"lat":45.4153143,"elevation":-1},{"lng":-121.7193714,"lat":45.4153716,"elevation":-1},{"lng":-121.7190904,"lat":45.4164891,"elevation":-1},{"lng":-121.7196833,"lat":45.4172221,"elevation":-1},{"lng":-121.7195244,"lat":45.4179416,"elevation":-1},{"lng":-121.7197987,"lat":45.4185782,"elevation":-1},{"lng":-121.7207025,"lat":45.419354,"elevation":-1},{"lng":-121.7218387,"lat":45.4214007,"elevation":-1},{"lng":-121.7215644,"lat":45.4226606,"elevation":-1},{"lng":-121.721869,"lat":45.424759,"elevation":-1},{"lng":-121.7221738,"lat":45.4249036,"elevation":-1},{"lng":-121.722569,"lat":45.4259458,"elevation":-1},{"lng":-121.7216118,"lat":45.425702,"elevation":-1},{"lng":-121.7212258,"lat":45.4260738,"elevation":-1},{"lng":-121.7208974,"lat":45.4272087,"elevation":-1},{"lng":-121.7209468,"lat":45.4277253,"elevation":-1},{"lng":-121.721389,"lat":45.4283981,"elevation":-1},{"lng":-121.7213453,"lat":45.4288768,"elevation":-1},{"lng":-121.7219605,"lat":45.4301857,"elevation":-1},{"lng":-121.721934,"lat":45.4312165,"elevation":-1},{"lng":-121.7222528,"lat":45.4334856,"elevation":-1},{"lng":-121.7216508,"lat":45.4331572,"elevation":-1},{"lng":-121.7217366,"lat":45.433607,"elevation":-1},{"lng":-121.7225997,"lat":45.4350551,"elevation":-1},{"lng":-121.7226122,"lat":45.4371233,"elevation":-1},{"lng":-121.7223631,"lat":45.4378561,"elevation":-1},{"lng":-121.7225545,"lat":45.4387304,"elevation":-1},{"lng":-121.7223926,"lat":45.4397525,"elevation":-1},{"lng":-121.7243251,"lat":45.4407832,"elevation":-1},{"lng":-121.7260896,"lat":45.4422796,"elevation":-1},{"lng":-121.7291117,"lat":45.4428882,"elevation":-1},{"lng":-121.7295917,"lat":45.4431708,"elevation":-1}],"waypoints":[{"name":"Vista Ridge Trailhead","lng":-121.72904,"lat":45.44283,"elevation":1374},{"name":"Wy'East Basin","lng":-121.71349,"lat":45.41,"elevation":1777},{"name":"Dollar Lake","lng":-121.70404,"lat":45.41124,"elevation":1823},{"name":"Barrett Spur","lng":-121.69937,"lat":45.3926,"elevation":2394}]}]`;

test('Parse full GPX', () => {
    parse(testGPX, routes => {
        expect(JSON.stringify(routes)).toBe(expectedOutput);
    });
});