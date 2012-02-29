define(function(){

	var Config = {

		url: "http://localhost/holmes/api",

		methodParam: "_method",

		groups: [

			{
				name: "Login",
				endpoints: [
					{
						url: "/login",
						method: "POST",
						description: "Spring Security session-based login Endpoint.",
						params: [
							{
								name: "j_username",
								description: "Username on Holmes or LDAP, when configured."
							},
							{
								name: "j_password",
								description: "Password on Holmes or LDAP, when configured."
							},
							{
								name: "_spring_security_remember_me",
								description: "When 'on', the session will remain for 2 weeks."
							}
						]
					},
					{
						url: "/keepAlive",
						method: "GET",
						description: "Used to check if the session is still active and returns the logged user data.",
					}
				]
			},

			{
				name: "Natures",
				endpoints: [
					{
						url: "/natures",
						method: "GET"
					},
					{
						url: "/natures/{media-id}",
						method: "GET"
					},
					{
						url: "/natures",
						method: "POST"
					},
					{
						url: "/natures",
						method: "PUT"
					},
					{
						url: "/natures",
						method: "DELETE"
					}
				]
			}

		]

	};

	return Config;

});