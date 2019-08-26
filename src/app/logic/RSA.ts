export class RSA {
	public fast_gcd(a: number, b: number): number {
		while (true) {
			let temp: number = a % b;
			if (temp === 0) {
				return b;
			}

			a = b;
			b = temp;
		}
	}

	public fast_pow(base: number, power: number, modulus: number): number {
		let result: number = 1;

		while (power > 0) {
			if (power % 2 === 1) {
				result = (result * base) % modulus;
			}
			base = (base * base) % modulus;
			power = Math.floor(power / 2);
		}
		return result;
	}

	public calculate_modulus(p: number, q: number) {
		return p * q;
	}

	public calculate_totient(p: number, q: number): number {
		return (p - 1) * (q - 1);
	}

	public find_public_keys(phi: number): Array<number> {
		let result: Array<number> = [];

		for (let i = 2; i < phi; ++i) {
			if (this.fast_gcd(i, phi) === 1) {
				result.push(i);
			}
		}
		return result;
	}

	public find_private_keys(public_key: number, phi: number): Array<number> {
		let result: Array<number> = [];
		let x: number;

		for (let i: number = 1; i < phi; ++i) {
			x = 1 + i * phi;

			if (x % public_key === 0) {
				result.push(x / public_key);
			}
		}
		return result;
	}

	public create_keys(p: number, q: number): any {
		let n: number = this.calculate_modulus(p, q);
		let phi: number = this.calculate_totient(p, q);

		let public_keys = this.find_public_keys(phi);
		// console.log(public_keys);

		let a_public_key = public_keys[0];

		let private_keys = this.find_private_keys(a_public_key, phi);
		// console.log(private_keys);

		let a_private_key = private_keys[0];

		return { a_public_key, a_private_key, n };
	}

	public crypt_message(
		key: number,
		modulus: number,
		numbers: Array<number>
	): Array<number> {
		let newArray = numbers.map((value: number) => {
			// console.log(this.fast_pow(value, key, modulus));
			return this.fast_pow(value, key, modulus);
		});

		return newArray;
	}

	public string_to_numbers(message: string): Array<number> {
		let result: Array<number> = [];

		for (let i: number = 0; i < message.length; i++) {
			result.push(message.charCodeAt(i));

			// FUNCION NO TERMINADA
		}

		return result;
	}

	public numbers_to_string(numbers: Array<number>): string {
		let result: string = "";

		for (let i: number = 0; i < numbers.length; i++) {
			result += String.fromCharCode(numbers[i]);
		}

		return result;
	}

	public main(): void {
		let p: number = 37;
		let q: number = 53;

		const {
			a_public_key: public_key,
			a_private_key: private_key,
			n: modulus
		} = this.create_keys(p, q);

		console.log(public_key, private_key, modulus);

		console.log("/=== MENSAJE ORIGINAL ===/");
		// let original_message: string = "MENSAJE GENÉRICO";
		let original_message: string = "MENSAJE ENCRIPTADO";
		let original_numbers: Array<number> = this.string_to_numbers(
			original_message
		);
		console.log(original_message);
		console.log(original_numbers);

		console.log("\n/=== MENSAJE ENCRIPTADO ===/");
		let encrypted_message = this.crypt_message(
			public_key,
			modulus,
			original_numbers
		);
		console.log(this.numbers_to_string(encrypted_message));
		console.log(encrypted_message);

		console.log("\n/=== MENSAJE DESENCRIPTADO ( ORIGINAL ) ===/");
		let decrypted_message: Array<number> = this.crypt_message(
			private_key,
			modulus,
			encrypted_message
		);
		console.log(this.numbers_to_string(decrypted_message));
		console.log(decrypted_message);

		console.log(this.fast_pow(2, 10, 20000));
	}
}
