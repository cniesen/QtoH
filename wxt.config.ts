import { defineConfig } from 'wxt';

export default defineConfig({
	manifest: {
        name: "Q to H",
        default_locale: "en",
		permissions: ["declarativeNetRequestWithHostAccess"],
        host_permissions: ["http://www.qrz.com/", "https://www.qrz.com/"],
        browser_specific_settings: {
            'gecko': {
                'id': "@qtoh.cniesen",
                // @ts-expect-error - data_collection_permissions not yet in WXT types
                data_collection_permissions: {
                    required: ['none']
                }                
            }
        },
		declarative_net_request: {
			rule_resources: [
				{
					id: "ruleset",
					enabled: true,
					path: "rules/rules.json"
				}
			]
		}
	},
    zip: {
        excludeSources: [
            "gimp_assets/**",
            "img/**"
        ]
    }
});
