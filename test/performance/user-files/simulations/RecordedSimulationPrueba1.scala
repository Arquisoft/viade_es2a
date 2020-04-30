/**
 * Añade un computador en http://computer-database.gatling.io/computers
 * con el nombre viadees2a
 */

package prueba1

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class RecordedSimulationPrueba1 extends Simulation {

	val httpProtocol = http
		.baseUrl("http://computer-database.gatling.io")
		.inferHtmlResources()
		.acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("en-US,en;q=0.5")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0")

	val headers0 = Map("Upgrade-Insecure-Requests" -> "1")



	val scn = scenario("RecordedSimulationPrueba1")
		.exec(http("request_0")
			.get("/computers")
			.headers(headers0)
			.resources(http("request_1")
			.get("/favicon.ico")
			.check(status.is(404))))
		.pause(33)
		.exec(http("request_2")
			.get("/computers?f=viadees2a")
			.headers(headers0))
		.pause(1)
		.exec(http("request_3")
			.get("/computers/new")
			.headers(headers0))
		.pause(26)
		.exec(http("request_4")
			.post("/computers")
			.headers(headers0)
			.formParam("name", "viadees2a")
			.formParam("introduced", "2020-04-26")
			.formParam("discontinued", "")
			.formParam("company", "1"))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}