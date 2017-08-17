import fs from 'fs';

class Config {
	constructor(env) {
		const config = this.config();
    if (!env) return {server: 'http://31.14.134.198:3001'};
    
		return config[env];
	}

	config() {
		return {
			local: {
				server: 'http://localhost:3001'
			},
			production: {
				server: 'http://lireteapi.niklaskiefer.de'
			}
		};
	}
}

export default new Config(process.env.ENV);
