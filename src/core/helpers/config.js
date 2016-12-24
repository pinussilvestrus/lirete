import fs from 'fs';

class Config {
	constructor(env) {
		const config = this.config();
    if (!env) return {server: 'http://lirete.niklaskiefer.de'};
    
		return config[env];
	}

	config() {
		return {
			local: {
				server: 'http://localhost:3001'
			},
			production: {
				server: 'http://lirete.niklaskiefer.de'
			}
		};
	}
}

export default new Config(process.env.ENV);
