define(function(){

	var Config = {

		url: "http://localhost:8080/holmes/api",

		methodParam: "_method",

		traditionalSerialization: true,

		groups: [

			// Login API
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
								value: ["off", "on"],
								description: "When 'on', the session will remain for 2 weeks."
							}
						]
					},
					{
						url: "/logout",
						method: "GET",
						description: "Log user out."
					},
					{
						url: "/keepAlive",
						method: "GET",
						description: "Used to check if the session is still active and returns the logged user data.",
					},
					{
						url: "/changePassword",
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

			// User API
			{
				name: "Users",
				endpoints: [
					{
						url: "/users/{id}",
						method: "GET",
						description: "Read the user from the data base.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The user ID."
							}
						]
					},
					{
						url: "/users",
						method: "GET",
						description: "List the users in pages.",
						params: [
							{
								name: "start",
								value: 0,
								description: "The start of the page."
							},
							{
								name: "amount",
								value: 10,
								description: "The amount to be returned."
							}
						]
					},
					{
						url: "/users",
						method: "POST",
						description: "Create a new user with the given attributes. The password will be sent to the user email.",
						params: [
							{
								name: "name",
								description: "The user name."
							},
							{
								name: "username",
								description: "The username to access the application."
							},
							{
								name: "email",
								description: "The email of the user."
							},
							{
								name: "adminUser",
								value: ["off", "on"],
								description: "If the user is an administrator."
							}
						]
					},
					{
						url: "/users",
						method: "PUT",
						description: "Update the user data.",
						params: [
							{
								name: "id",
								description: "The user ID."
							},
							{
								name: "name",
								description: "The user name."
							},
							{
								name: "username",
								description: "The username to access the application."
							},
							{
								name: "email",
								description: "The email of the user."
							},
							{
								name: "adminUser",
								value: ["off", "on"],
								description: "If the user is an administrator."
							}
						]
					},
					{
						url: "/users",
						method: "DELETE",
						description: "Delete the user owner of the passed ID.",
						params: [
							{
								name: "id",
								description: "The user ID."
							}
						]
					},
					{
						url: "/users/{userEmail}/profiles/",
						method: "GET",
						description: "List the profiles for the user.",
						params: [
							{
								name: "userEmail",
								urlParam: true,
								description: "The user Email."
							}
						]
					},
					{
						url: "/users/{userEmail}/restrictions/",
						method: "GET",
						description: "List the restrictions for the user.",
						params: [
							{
								name: "userEmail",
								urlParam: true,
								description: "The user Email."
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
						url: "/search",
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
						url: "/natures/simple",
						method: "GET",
						description: "List the simplified version of natures and properties for the user."
					},
					{
						url: "/natures/{id}",
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
						url: "/natures",
						method: "GET",
						description: "List the natures in pages.",
						params: [
							{
								name: "start",
								value: 0,
								description: "The start of the page."
							},
							{
								name: "amount",
								value: 10,
								description: "The amount to be returned."
							}
						]
					},
					{
						url: "/natures",
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
						url: "/natures",
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
						url: "/natures",
						method: "DELETE",
						description: "Delete the nature owner of the passed ID.",
						params: [
							{
								name: "id",
								description: "The nature ID."
							}
						]
					},
					{
						url: "/natures/addProperty",
						method: "POST",
						description: "Add a new property to the nature as an association.",
						params: [
							{
								name: "natureId",
								description: "The nature ID."
							},
							{
								name: "propertyId",
								description: "The property ID."
							},
							{
								name: "order",
								description: "The order of the association."
							},
							{
								name: "required",
								value: ["off", "on"],
								description: "Mark if the association with the nature is obligatory."
							}
						]
					},
					{
						url: "/natures/removeProperty",
						method: "POST",
						description: "Remove the property from the nature.",
						params: [
							{
								name: "natureId",
								description: "The nature ID."
							},
							{
								name: "naturePropertyId",
								description: "The ID of the association with the property."
							}
						]
					},
					{
						url: "/natures/arrangeProperties",
						method: "POST",
						description: "Rearrange the order of the associations with the properties within the nature.",
						params: [
							{
								name: "natureId",
								description: "The nature ID."
							},
							{
								name: "naturePropertyIds",
								description: "The IDs of the associations with the property, int the order they must be rearranged.",
								multiValue: true
							}
						]
					}
				]
			},
			
			// Properties API
			{
				name: "Properties",
				endpoints: [
					{
						url: "/properties/{id}",
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
						url: "/properties",
						method: "GET",
						description: "List the properties in pages.",
						params: [
							{
								name: "start",
								value: 0,
								description: "The start of the page."
							},
							{
								name: "amount",
								value: 10,
								description: "The amount to be returned."
							}
						]
					},
					{
						url: "/properties",
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
						url: "/properties",
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
						url: "/properties",
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
			},
			
			// Profiles API
			{
				name: "Profiles",
				endpoints: [
					{
						url: "/profiles/{id}",
						method: "GET",
						description: "Read the profile from the data base. The Profile will be completly loaded, with all permissions and properties associated.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The profile ID."
							}
						]
					},
					{
						url: "/profiles",
						method: "GET",
						description: "List the profiles in pages.",
						params: [
							{
								name: "start",
								value: 0,
								description: "The start of the page."
							},
							{
								name: "amount",
								value: 10,
								description: "The amount to be returned."
							}
						]
					},
					{
						url: "/profiles",
						method: "POST",
						description: "Create a new profile.",
						params: [
							{
								name: "name",
								description: "The property name."
							}
						]
					},
					{
						url: "/profiles",
						method: "PUT",
						description: "Update the profile.",
						params: [
							{
								name: "id",
								description: "The property ID."
							},
							{
								name: "name",
								description: "The property name."
							}
						]
					},
					{
						url: "/profiles",
						method: "DELETE",
						description: "Delete the profile owner of the passed ID, and all its permissions.",
						params: [
							{
								name: "id",
								description: "The profile ID."
							}
						]
					},
					{
						url: "/profiles/addPermission",
						method: "POST",
						description: "Add a new permission to the profile, with the especified nature and type.",
						params: [
							{
								name: "profileId",
								description: "The profile ID."
							},
							{
								name: "natureId",
								description: "The nature ID."
							},
							{
								name: "permissionType",
								value: ["VIEW", "DOWNLOAD", "CLASSIFICATION", "EDIT"],
								description: "The type defining the permission."
							}
						]
					},
					{
						url: "/profiles/removePermission",
						method: "POST",
						description: "Remove the permission from the profile.",
						params: [
							{
								name: "permissionId",
								description: "The permission ID."
							}
						]
					},
					{
						url: "/profiles/permissions/addProperties",
						method: "POST",
						dynamicParams: true,
						description: "Add the properties values to the permission.",
						params: [
							{
								name: "permissionId",
								description: "The permission ID."
							}
						]
					},
					{
						url: "/profiles/permissions/removeProperty",
						method: "POST",
						description: "Remove the property from the permission.",
						params: [
							{
								name: "permissionId",
								description: "The permission ID."
							},
							{
								name: "permissionPropertyId",
								description: "The ID of the property whithin the permission."
							}
						]
					},
					{
						url: "/profiles/permissions/clearProperties",
						method: "POST",
						description: "Remove all the properties from the permission.",
						params: [
							{
								name: "permissionId",
								description: "The permission ID."
							}
						]
					},
					{
						url: "/profiles/{profileId}/users",
						method: "GET",
						description: "List the users for the profile.",
						params: [
							{
								name: "profileId",
								urlParam: true,
								description: "The profile ID."
							}
						]
					},
					{
						url: "/profiles/addUsers",
						method: "POST",
						description: "Add all the users to all the profiles.",
						params: [
							{
								name: "profilesIds",
								multiValue: true,
								description: "The profiles IDs."
							},
							{
								name: "usersIds",
								multiValue: true,
								description: "The users IDs."
							}
						]
					},
					{
						url: "/profiles/removeUsers",
						method: "POST",
						description: "Remove all the users form all the profiles.",
						params: [
							{
								name: "profilesIds",
								multiValue: true,
								description: "The profiles IDs."
							},
							{
								name: "usersIds",
								multiValue: true,
								description: "The users IDs."
							}
						]
					}
				]
			},
			
			// Restrictions API
			
			{
				name: "Restrictions",
				endpoints: [
					{
						url: "/restrictions/{id}",
						method: "GET",
						description: "Read the restriction from the data base.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The restriction ID."
							}
						]
					},
					{
						url: "/restrictions",
						method: "GET",
						description: "List the restrictions in pages.",
						params: [
							{
								name: "start",
								value: 0,
								description: "The start of the page."
							},
							{
								name: "amount",
								value: 10,
								description: "The amount to be returned."
							}
						]
					},
					{
						url: "/restrictions",
						method: "POST",
						description: "Create a new restriction.",
						params: [
							{
								name: "name",
								description: "The restriction name."
							},
							{
								name: "propertyId",
								description: "The ID of the property."
							},
							{
								name: "propertyValue",
								description: "The value for the property."
							}
						]
					},
					{
						url: "/restrictions",
						method: "PUT",
						description: "Update the restriction.",
						params: [
							{
								name: "id",
								description: "The restriction ID."
							},
							{
								name: "name",
								description: "The restriction name."
							},
							{
								name: "propertyId",
								description: "The ID of the property."
							},
							{
								name: "propertyValue",
								description: "The value for the property."
							}
						]
					},
					{
						url: "/restrictions",
						method: "DELETE",
						description: "Delete the restriction owner of the passed ID.",
						params: [
							{
								name: "id",
								description: "The restriction ID."
							}
						]
					},
					{
						url: "/restrictions/addUser",
						method: "POST",
						description: "Add the user to the restriction.",
						params: [
							{
								name: "restrictionId",
								description: "The restriction ID."
							},
							{
								name: "userId",
								description: "The user ID."
							}
						]
					},
					{
						url: "/restrictions/removeUser",
						method: "POST",
						description: "Remove the user form the restriction.",
						params: [
							{
								name: "restrictionId",
								description: "The restriction ID."
							},
							{
								name: "userId",
								description: "The user ID."
							}
						]
					}
				]
			}

			
		]

	};

	return Config;

});
