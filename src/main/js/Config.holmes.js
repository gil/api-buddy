define(function(){

	var Config = {

		url: 'http://localhost/holmes/api',

		methodParam: "_method",

		traditionalSerialization: true,

		globalErrors: [
			{
				label: "400",
				description: "Malformed request."
			},
			{
				label: "403",
				description: "Forbidden."
			}
		],
		
		groups: [

			// Login API
			{
				name: "Login",
				endpoints: [
					{
						label: "Login",
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
						],
						errors: [
							{
								label: "401 - Unauthorized",
								description: "Authentication Failed: Bad credentials."
							}
						]
					},
					{
						label: "Logout",
						url: "/logout",
						method: "GET",
						description: "Log user out."
					},
					{
						label: "Keep Alive Session",
						url: "/keepAlive",
						method: "GET",
						description: "Used to check if the session is still active and returns the logged user data.",
					},
					{
						label: "Change Password",
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
						label: "Forgot Password",
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
						label: "Read",
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
						label: "List",
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
						label: "Create",
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
						label: "Update",
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
						label: "Delete",
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
						label: "List User's Profiles",
						url: "/users/{username}/profiles/",
						method: "GET",
						description: "List the profiles for the user.",
						params: [
							{
								name: "username",
								urlParam: true,
								description: "The username."
							}
						]
					},
					{
						label: "List User's Restrictions",
						url: "/users/{username}/restrictions/",
						method: "GET",
						description: "List the restrictions for the user.",
						params: [
							{
								name: "username",
								urlParam: true,
								description: "The username."
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
						label: "Execute Search",
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
								value: 0,
								description: "The first document from result pagination. Starts at 0."
							},
							{
								name: "rows",
								value: 5,
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
						label: "Auto Complete List",
						url: "/natures/simple",
						method: "GET",
						description: "List the simplified version of natures and properties for the user.",
						params: [
							{
								name: "permissionType",
								description: "The permission Type.",
								value: ["VIEW", "DOWNLOAD", "CLASSIFICATION", "EDIT"]
							}
						]
					},
					{
						label: "Read",
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
						label: "List",
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
						label: "Create",
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
						label: "Update",
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
						label: "Delete",
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
						label: "Add Property to Nature",
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
						label: "Remove Property from Nature",
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
						label: "Arrange Properties in Nature",
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
						label: "Read",
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
						label: "List",
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
						label: "Create",
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
						label: "Update",
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
						label: "Delete",
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
						label: "Read",
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
						label: "List",
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
						label: "Create",
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
						label: "Update",
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
						label: "Delete",
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
						label: "Add Permission to Profile",
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
						label: "Remove Permission from Profile",
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
						label: "Add Property to Permission",
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
						label: "Remove Property from Permission",
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
						label: "Clear Properties from Permission",
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
						label: "List Users for Profile",
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
						label: "Add User to Profile",
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
						label: "Remove User from Profile",
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
						label: "Read",
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
						label: "List",
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
						label: "Create",
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
						label: "Update",
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
						label: "Delete",
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
						label: "Add Restriction to User",
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
						label: "Remove Restriction from User",
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
			},
			
			// Classification API
			
			{
				name: "Classification",
				endpoints: [
					{
						label: "Classify Document",
						url: "/classification/classifyDocument",
						method: "POST",
						dynamicParams: true,
						description: "Classify the Document, as the nature and properties values.",
						params: [
							{
								name: "documentId",
								description: "The document ID."
							},
							{
								name: "natureId",
								description: "The nature ID."
							}
						]
					},
					{
						label: "Retrive Document Classification",
						url: "/classification/retrieveClassification/{documentId}",
						method: "GET",
						description: "Retrive the classification for the document.",
						params: [
							{
								name: "documentId",
								urlParam: true,
								description: "The document ID."
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
