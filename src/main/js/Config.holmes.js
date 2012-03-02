define(function(){

	var Config = {

		url: "http://localhost:8080/holmes",

		methodParam: "_method",

		traditionalSerialization: true,

		groups: [

			// Login API
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

			// Search API
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

			// Natures API
			{
				name: "Natures",
				endpoints: [
					{
						url: "/api/natures/simple",
						method: "GET",
						description: "List the simplified version of natures and properties for the user."
					},
					{
						url: "/api/natures/{id}",
						method: "GET",
						description: "Read the nature from the data base, with the passed ID.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The nature ID."
							}
						]
					},
					{
						url: "/api/natures",
						method: "GET",
						description: "List the natures in pages.",
						params: [
							{
								name: "start",
								description: "The start of the page."
							},
							{
								name: "amount",
								description: "The amount to be returned."
							}
						]
					},
					{
						url: "/api/natures",
						method: "POST",
						description: "Create a new nature with the given attributes.",
						params: [
							{
								name: "name",
								description: "The nature name."
							}
						]
					},
					{
						url: "/api/natures",
						method: "PUT",
						description: "Actually the update method is not permitted for natures. You can't change the nature's name, and natures only have the name attribute. This method will be used in the future to change other nature's attributes.",
						params: [
							{
								name: "id",
								description: "The nature ID."
							},
							{
								name: "name",
								description: "The nature name. (Only here for testing and debugging purpose)"
							}
						]
					},
					{
						url: "/api/natures",
						method: "DELETE",
						description: "Delete the nature owner of the passed ID.",
						params: [
							{
								name: "id",
								description: "The nature ID."
							}
						]
					}
				]
			},
			
			{
				name: "Properties",
				endpoints: [
					{
						url: "/api/properties/{id}",
						method: "GET",
						description: "Read the property from the data base.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The property ID."
							}
						]
					},
					{
						url: "/api/properties",
						method: "GET",
						description: "List the properties in pages.",
						params: [
							{
								name: "start",
								description: "The start of the page."
							},
							{
								name: "amount",
								description: "The amount to be returned."
							}
						]
					},
					{
						url: "/api/properties",
						method: "POST",
						description: "Create a new property with the given attributes. The 'values' attribute defines the different values possible for a 'LIST' property. You can add more values to the attribute.",
						params: [
							{
								name: "name",
								description: "The property name."
							},
							{
								name: "propertyType",
								value: ["LIST", "TEXT", "DATE", "BOOLEAN", "TAG", "NUMBER"],
								description: "The type to describe the property."
							},
							{
								name: "values",
								description: "One or more values for properties of type LIST.",
								multiValue: true
							}
						]
					},
					{
						url: "/api/properties",
						method: "PUT",
						description: "Update the property with the given attributes. The 'values' attribute defines the different values possible for a 'LIST' property. You can add more values to the attribute.",
						params: [
							{
								name: "id",
								description: "The property ID."
							},
							{
								name: "name",
								description: "The property name."
							},
							{
								name: "propertyType",
								value: ["LIST", "TEXT", "DATE", "BOOLEAN", "TAG", "NUMBER"],
								description: "The type to describe the property."
							},
							{
								name: "values",
								description: "One or more values for properties of type LIST.",
								multiValue: true
							}
						]
					},
					{
						url: "/api/properties",
						method: "DELETE",
						description: "Delete the property owner of the passed ID.",
						params: [
							{
								name: "id",
								description: "The property ID."
							}
						]
					}
				]
			}
			
			// Next Group

		]

	};

	return Config;

});