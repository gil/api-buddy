define(function(){

	var Config = {

		url: "http://localhost/holmes",

		methodParam: "_method",

		groups: [

			{
				name: "Login",
				endpoints: [
					{
						url: "/api/login",
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
						url: "/api/logout",
						method: "GET",
						description: "Log user out."
					},
					{
						url: "/api/keepAlive",
						method: "GET",
						description: "Used to check if the session is still active and returns the logged user data.",
					},
					{
						url: "/api/changePassword",
						method: "POST",
						description: "Change logged user's password.",
						params: [
							{
								name: "oldPassword",
								description: "Actual user password."
							},
							{
								name: "oldPasswordAgain",
								description: "Actual user password again."
							},
							{
								name: "newPassword",
								description: "New password. Should be different from the old one and have between 5 and 50 characters."
							}
						]
					},
					{
						url: "/public/forgotPassword",
						method: "POST",
						description: "Receive a new password via e-mail for given user.",
						params: [
							{
								name: "userEmail",
								description: "The e-mail address for the user to receive a new password."
							}
						]
					}
				]
			},

			{
				name: "Search",
				endpoints: [
					{
						url: "/api/search",
						method: "GET",
						description: "Search for documents stored on Holmes.",
						params: [
							{
								name: "query",
								description: "The query strin to search for documents."
							},
							{
								name: "start",
								description: "The first document from result pagination. Starts at 0."
							},
							{
								name: "rows",
								description: "The amount of documents to receive."
							}
						]
					}
				]
			},

			{
				name: "Natures",
				endpoints: [
					{
						url: "/api/natures",
						method: "GET"
					},
					{
						url: "/api/natures/{id}",
						method: "GET",
						params: [
							{
								name: "id",
								urlParam: true
							}
						]
					},
					{
						url: "/api/natures",
						method: "POST"
					},
					{
						url: "/api/natures",
						method: "PUT"
					},
					{
						url: "/api/natures",
						method: "DELETE"
					}
				]
			}

		]

	};

	return Config;

});