import { Component } from "@angular/core";
import { RSA } from "./logic/RSA";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	title = "rsa-encription";

	constructor() {
		let rsa: RSA = new RSA();

		rsa.main();
	}
}
