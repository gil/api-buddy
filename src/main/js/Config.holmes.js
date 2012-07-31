define(function(){

	var Config = {

		url: 'http://localhost/holmes/api',

		methodParam: "_method",

		traditionalSerialization: true,

		globalErrors: [
			{
				label: "400 - Bad Request",
				description: "Malformed request: the request you attempted to make, was not identified from the server."
			},
			{
				label: "403 - Forbidden",
				description: "Forbidden. You don't have permission to access this content."
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
								name: "newPassword",
								description: "New password. Should be different from the old one and have between 5 and 50 characters."
							},
							{
								name: "newPasswordAgain",
								description: "New user password again."
							}
						],
						errors: [
							{
								label: "406 - Not Acceptable",
								description: "The <i>oldPassword</i> attribute must match the actual password, and must be repeated correctly in the <i>oldPasswordAgain</i> attribute. The <i>newPassword</i> attribute msut have a different value from the actual."
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
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - A user with the given email, was not found in the data base."
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
						label: "Info",
						url: "/users/{username}/info",
						method: "GET",
						description: "Read the user info from the data base.",
						params: [
							{
								name: "username",
								urlParam: true,
								description: "The username."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>entity.notFound</i> - The entity was not found with the given username."
							}
						]
					},
					{
						label: "Read",
						url: "/users/{id}",
						method: "GET",
						description: "Read the user from the data base. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The user ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>entity.notFound</i> - The entity was not found with the given ID."
							}
						]
					},
					{
						label: "List",
						url: "/users",
						method: "GET",
						description: "List the users in pages. (Requires ADMIN permission)",
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
						description: "Create a new user with the given attributes. The password will be sent to the user email. (Requires ADMIN permission)",
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
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>password.notNull</i> - The password can't be null."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>email.alreadyInUse</i> - The email is already in use."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>username.alreadyInUse</i> - The username is already in use."
							}
						]
					},
					{
						label: "Update",
						url: "/users/{id}",
						method: "PUT",
						description: "Update the user data. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
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
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>entity.notFound</i> - The user was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>email.alreadyInUse</i> - The email is already in use."
							}
						]
					},
					{
						label: "Delete",
						url: "/users/{id}",
						method: "DELETE",
						description: "Delete the user owner of the passed ID. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The user ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>entity.notFound</i> - The user was not found."
							}
						]
					},
					{
						label: "List User's Profiles",
						url: "/users/{username}/profiles/",
						method: "GET",
						description: "List the profiles for the user. (Requires ADMIN permission)",
						params: [
							{
								name: "username",
								urlParam: true,
								description: "The username."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							}
						]
					},
					{
						label: "List User's Restrictions",
						url: "/users/{username}/restrictions/",
						method: "GET",
						description: "List the restrictions for the user. (Requires ADMIN permission)",
						params: [
							{
								name: "username",
								urlParam: true,
								description: "The username."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							}
						]
					},
					{
						label: "Disable User",
						url: "/users/{userId}/disable/",
						method: "POST",
						description: "Disables the user. (Requires ADMIN permission)",
						params: [
							{
								name: "userId",
								urlParam: true,
								description: "The user id."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							}
						]
					},
					{
						label: "Enable User",
						url: "/users/{userId}/enable/",
						method: "POST",
						description: "Enables the user. (Requires ADMIN permission)",
						params: [
							{
								name: "userId",
								urlParam: true,
								description: "The user id."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							}
						]
					},
					{
						label: "Resend Greetings Email",
						url: "/users/resendGreetingsEmail",
						method: "POST",
						description: "Sends the Greetings Email again for the user, reseting his/her password. (Requires ADMIN permission)",
						params: [
							{
								name: "userEmail",
								description: "The user email. Must be an existing user email."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
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
							},
							{
								name: "permissionType",
								value: ["VIEW", "DOWNLOAD", "CLASSIFICATION", "EDIT"],
								description: "The permission type to consider in the search (optional)."
							}
						],
						errors: [
							{
								label: "400 - Bad Request",
								description: "<i>query.malFormed</i> - The query is invalid."
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
						description: "Read the nature from the data base, with the passed ID. (Requires ADMIN permission)",
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
						description: "List the natures in pages. (Requires ADMIN permission)",
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
						description: "Create a new nature with the given attributes. (Requires ADMIN permission)",
						params: [
							{
								name: "name",
								description: "The nature name."
							},
							{
								name: "allowTags",
								value: ["off", "on"],
								description: "If the nature allow tags in the document."
							}
						]
					},
					{
						label: "Update",
						url: "/natures/{id}",
						method: "PUT",
						description: "Actually the update method is not permitted for natures. You can't change the nature's name, and natures only have the name attribute. This method will be used in the future to change other nature's attributes. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The nature ID."
							},
							{
								name: "name",
								description: "The nature name. (Only here for testing and debugging purpose)"
							},
							{
								name: "allowTags",
								value: ["off", "on"],
								description: "If the nature allow tags in the document."
							}
						]
					},
					{
						label: "Delete",
						url: "/natures/{id}",
						method: "DELETE",
						description: "Delete the nature owner of the passed ID. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The nature ID."
							}
						]
					},
					{
						label: "Add Property to Nature",
						url: "/natures/addProperty",
						method: "POST",
						description: "Add a new property to the nature as an association. (Requires ADMIN permission)",
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
						description: "Remove the property from the nature. (Requires ADMIN permission)",
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
						description: "Rearrange the order of the associations with the properties within the nature. (Requires ADMIN permission)",
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
					},
					{
						label: "List With Profiles",
						url: "/natures/withProfiles",
						method: "GET",
						description: "List the natures in pages with the profiles. (Requires ADMIN permission)",
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
						description: "Read the property from the data base. (Requires ADMIN permission)",
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
						description: "List the properties in pages. (Requires ADMIN permission)",
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
						description: "Create a new property with the given attributes. The 'values' attribute defines the different values possible for a 'LIST' property. You can add more values to the attribute. (Requires ADMIN permission)",
						params: [
							{
								name: "name",
								description: "The property name."
							},
							{
								name: "propertyType",
								value: ["LIST", "TEXT", "DATE", "NUMBER", "CURRENCY"],
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
						url: "/properties/{id}",
						method: "PUT",
						description: "Update the property with the given attributes. The 'values' attribute defines the different values possible for a 'LIST' property. You can add more values to the attribute. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The property ID."
							},
							{
								name: "name",
								description: "The property name."
							},
							{
								name: "propertyType",
								value: ["LIST", "TEXT", "DATE", "NUMBER"],
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
						url: "/properties/{id}",
						method: "DELETE",
						description: "Delete the property owner of the passed ID. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
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
						description: "Read the profile from the data base. The Profile will be completly loaded, with all permissions and properties associated. (Requires ADMIN permission)",
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
						description: "List the profiles in pages. (Requires ADMIN permission)",
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
						description: "Create a new profile. (Requires ADMIN permission)",
						params: [
							{
								name: "name",
								description: "The property name."
							}
						]
					},
					{
						label: "Update",
						url: "/profiles/{id}",
						method: "PUT",
						description: "Update the profile. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
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
						url: "/profiles/{id}",
						method: "DELETE",
						description: "Delete the profile owner of the passed ID, and all its permissions. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The profile ID."
							}
						]
					},
					{
						label: "Add Permission to Profile",
						url: "/profiles/addPermission",
						method: "POST",
						description: "Add a new permission to the profile, with the especified nature and type. (Requires ADMIN permission)",
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
						description: "Remove the permission from the profile. (Requires ADMIN permission)",
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
						description: "Add the properties values to the permission.</br>Associate the property ID to the value you want. The value must be in the property's value list. (Requires ADMIN permission)",
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
						description: "Remove the property from the permission. (Requires ADMIN permission)",
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
						description: "Remove all the properties from the permission. (Requires ADMIN permission)",
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
						description: "List the users for the profile. (Requires ADMIN permission)",
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
						description: "Add all the users to all the profiles. (Requires ADMIN permission)",
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
						description: "Remove all the users form all the profiles. (Requires ADMIN permission)",
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
						description: "Read the restriction from the data base. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The restriction ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>entity.notFound</i> - The restriction was not found."
							}
						]
					},
					{
						label: "List",
						url: "/restrictions",
						method: "GET",
						description: "List the restrictions in pages. (Requires ADMIN permission)",
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
						description: "Create a new restriction. (Requires ADMIN permission)",
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
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>property.notFound</i> - The property was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>property.value.invalid</i> - The property value is invalid."
							}
						]
					},
					{
						label: "Update",
						url: "/restrictions/{id}",
						method: "PUT",
						description: "Update the restriction. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
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
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>entity.notFound</i> - The restriction was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>property.notFound</i> - The property was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>property.value.invalid</i> - The property value is invalid."
							}
						]
					},
					{
						label: "Delete",
						url: "/restrictions/{id}",
						method: "DELETE",
						description: "Delete the restriction owner of the passed ID. (Requires ADMIN permission)",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The restriction ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>entity.notFound</i> - The restriction was not found."
							}
						]
					},
					{
						label: "Add Restriction to User",
						url: "/restrictions/addUser",
						method: "POST",
						description: "Add the user to the restriction. (Requires ADMIN permission)",
						params: [
							{
								name: "restrictionId",
								description: "The restriction ID."
							},
							{
								name: "userId",
								description: "The user ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>restriction.notFound</i> - The restriction was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							}
						]
					},
					{	
						label: "Remove Restriction from User",
						url: "/restrictions/removeUser",
						method: "POST",
						description: "Remove the user form the restriction. (Requires ADMIN permission)",
						params: [
							{
								name: "restrictionId",
								description: "The restriction ID."
							},
							{
								name: "userId",
								description: "The user ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>restriction.notFound</i> - The restriction was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
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
						description: "Classify the Document, as the nature and properties values.</br>Associate the property ID to the value you want. The value must be in the property's values list.",
						params: [
							{
								name: "documentId",
								description: "The document ID."
							},
							{
								name: "natureId",
								description: "The nature ID."
							},
							{
								name: "tags",
								description: "The tags of the document separated by ',' (optional)."
							}
						],
						errors: [
							{
								label: "401 - Unauthorized",
								description: "<i>permission.classif.unauthorized</i> - The user don't have permission to classify the document."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>nature.notFound</i> - The nature was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>property.required</i> - A required property was not filled."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>property.value.invalid</i> - There is a property filled with a value that doesn't exists within the permited values."
							}
						]
					},
					{
						label: "Retrive Document Classification",
						url: "/classification/retrieveClassification/{documentId}",
						method: "GET",
						description: "Retrive the classification for the document. This method supposes that the user will classify the document.",
						params: [
							{
								name: "documentId",
								urlParam: true,
								description: "The document ID."
							}
						],
						errors: [
							{
								label: "401 - Unauthorized",
								description: "<i>permission.classif.unauthorized</i> - The user don't have permission to classify the document."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							}
						]
					},
					{
						label: "Read Document Classification",
						url: "/classification/readClassification/{documentId}",
						method: "GET",
						description: "Read the classification for the document. This method supposes that the wants only see the actual classification.",
						params: [
							{
								name: "documentId",
								urlParam: true,
								description: "The document ID."
							}
						],
						errors: [
							{
								label: "401 - Unauthorized",
								description: "<i>permission.view.unauthorized</i> - The user don't have permission to view the document."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							}
						]
					},
					{
						label: "List Tags",
						url: "/classification/commonTags",
						method: "GET",
						description: "List the most used document tags."
					}
				]
			},

			// Quick Access API
			
			{
				name: "Quick Access",
				endpoints: [
					{
						label: "Create",
						url: "/quickAccess",
						method: "POST",
						description: "Create a new Quick Access. The quick access will be available calling the 'list' method.",
						params: [
							{
								name: "query",
								description: "The query to be persisted."
							},
							{
								name: "title",
								description: "The title of the quick access."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>query.null</i> - The query cannot be null."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>title.null</i> - The title cannot be null."
							}
						]
					},
					{
						label: "Remove",
						url: "/quickAccess/{quickAccessId}",
						method: "DELETE",
						description: "Delete the Quick Access.",
						params: [
							{
								name: "quickAccessId",
								urlParam: true,
								description: "The query ID to be removed."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							}
						]
					},
					{
						label: "List All Quick Access",
						url: "/quickAccess",
						method: "GET",
						description: "List all the quick accesses for the user. If the query of the quick access is malformed, a quick access will be returned informing the error.",
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>user.notFound</i> - The user was not found."
							}
						]
					}
				]
			},
			
			// Thumb API
			
			{
				name: "Thumbs",
				endpoints: [
					{
						label: "Thumbnail",
						url: "/thumb/{documentId}",
						method: "GET",
						description: "Retrieve the thumbnail for the document.",
						params: [
							{
								name: "documentId",
								urlParam: true,
								description: "The document ID."
							}
						],
						errors: [
							{
								label: "404 - Not Found",
								description: "<i>thumb.notFound</i> - The thumb could not be found for the document. This can mean that you don't hava permission to access the document."
							}
						]
					},
					{
						label: "Preview",
						url: "/preview/{documentId}",
						method: "GET",
						description: "Retrieve the preview for the document.",
						params: [
							{
								name: "documentId",
								urlParam: true,
								description: "The document ID."
							}
						],
						errors: [
							{
								label: "404 - Not Found",
								description: "<i>thumb.notFound</i> - The preview could not be found for the document. This can mean that you don't hava permission to access the document."
							}
						]
					},
					{
						label: "Preview Page",
						url: "/preview/{documentId}/page/{page}",
						method: "GET",
						description: "Retrieve the preview for the document.",
						params: [
							{
								name: "documentId",
								urlParam: true,
								description: "The document ID."
							},
							{
								name: "page",
								urlParam: true,
								description: "The document page."
							}
						],
						errors: [
							{
								label: "404 - Not Found",
								description: "<i>thumb.notFound</i> - The preview could not be found for the document. This can mean that you don't hava permission to access the document."
							}
						]
					}
				]
			},
			
			// Workflow API
			
			{
				name: "Workflow",
				endpoints: [
					{
						label: "List",
						url: "/workflows",
						method: "GET",
						description: "List the workflows. (Requires ADMIN permission)",
						params: [
							{
								name: "start",
								value: 0,
								description: "The start."
							},
							{
								name: "amount",
								value: 10,
								description: "The amount."
							}
						]
					},
					{
						label: "Available Natures",
						url: "/workflows/availableNatures",
						method: "GET",
						description: "Retrieve the list of natures not yet used in workflows. (Requires ADMIN permission)"
					},
					{
						label: "Read",
						url: "/workflows/{workflowId}",
						method: "GET",
						description: "Read the workflow with the given Id. (Requires ADMIN permission)",
						params: [
							{
								name: "workflowId",
								urlParam: true,
								description: "The workflow ID."
							}
						]
					},
					{
						label: "Create",
						url: "/workflows",
						method: "POST",
						description: "Create a new workflow with the given nature. (Requires ADMIN permission)",
						params: [
							{
								name: "natureId",
								description: "The nature ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>nature.notFound</i> - The nature was not found."
							}
						]
					},
					{
						label: "Remove",
						url: "/workflows/{workflowId}",
						method: "DELETE",
						description: "Remove the workflow. (Requires ADMIN permission)",
						params: [
							{
								name: "workflowId",
								urlParam: true,
								description: "The workflow ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>workflow.notFound</i> - The workflow was not found."
							}
						]
					},
					{
						label: "Arrange Profiles",
						url: "/workflows/arrangeProfiles",
						method: "POST",
						description: "Arrange the profile's orders. (Requires ADMIN permission)",
						params: [
							{
								name: "workflowId",
								description: "The workflow ID."
							},
							{
								name: "profilesIds",
								multiValue: true,
								description: "The profiles IDs."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>workflow.notFound</i> - The workflow was not found."
							}
						]
					},
					{
						label: "Approve Document",
						url: "/workflows/approve",
						method: "POST",
						description: "Approve the document, and proceed to the next workflow step.",
						params: [
							{
								name: "documentVersionId",
								description: "The document version ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							}
						]
					},
					{
						label: "Reprove Document",
						url: "/workflows/reprove",
						method: "POST",
						description: "Reprove the document.",
						params: [
							{
								name: "documentVersionId",
								description: "The document version ID."
							},
							{
								name: "reproveMessage",
								description: "The reproving message."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>user.permissionDenied</i> - The user don't have permission to reprove the document."
							}
						]
					}
				]
			},

			// Conversion API
			
			{
				name: "Conversion",
				endpoints: [
					{
						label: "Reconvert",
						url: "/conversion/reconvert",
						method: "POST",
						description: "Send the documents to the conversion queue.",
						params: [
							{
								name: "documentVersionIds",
								multiValue: true,
								description: "The documents IDs."
							},
							{
								name: "thumbPage",
								value: 0,
								description: "The thumb page to be created."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document IDs that were not found."
							}
						]
					}
				]
			},
			
			// Company API
			
			{
				name: "Company",
				endpoints: [
					{
						label: "Read Company",
						url: "/company",
						method: "GET",
						description: "Read the company from the current user.",
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>company.notFound</i> - The company from the current user."
							}
						]
					},
					{
						label: "Used Space",
						url: "/company/usedSpace",
						method: "GET",
						description: "Read the used space for the company."
					}
				]
			},
			
			// Documents API
			
			{
				name: "Document",
				endpoints: [
					{
						label: "Upload / Update Version",
						url: "/upload",
						description: "Upload a new document or update existing one.<br/><small>(This call will open a new window)</small>",
						params: [
							{
								name: "file",
								multipart: true,
								description: "File to be uploaded."
							},
							{
								name: "thumbPage",
								value: "0",
								description: "Document page to generate thumbnail from."
							},
							{
								name: "parentId",
								description: "The document ID, when updating version (optional)."
							}
						]
					},
					{
						label: "Thumbnail",
						url: "/thumb/{id}",
						description: "Return document thumbnail image.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The document ID."
							}
						]
					},
					{
						label: "Preview Page",
						url: "/preview/{id}/page/{page}",
						description: "Return document page preview image.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The document ID."
							},
							{
								name: "page",
								value: "0",
								urlParam: true,
								description: "The page to load."
							}
						]
					},
					{
						label: "Lock Document",
						url: "/document/{id}/lockForEditing",
						method: "POST",
						description: "Lock the document for editing.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The parent document ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							},
							{
								label: "403 - Forbidden",
								description: "The user is not allowed to lock the document."
							}
						]
					},
					{
						label: "Release Document",
						url: "/document/{id}/release",
						method: "POST",
						description: "Release the document from editing.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The parent document ID."
							}							
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							},
							{
								label: "403 - Forbidden",
								description: "The user is not allowed to release the document."
							}
						]
					},
					{
						label: "Remove Document",
						url: "/document/{id}",
						method: "DELETE",
						description: "Remove the document.",
						params: [
							{
								name: "id",
								urlParam: true,
								description: "The parent document ID."
							}							
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							},
							{
								label: "403 - Forbidden",
								description: "The user is not allowed to release the document."
							}
						]
					},
					{
						label: "Rename Document",
						url: "/document/{documentId}/rename",
						method: "POST",
						description: "Rename the document, and all its versions.",
						params: [
							{
								name: "documentId",
								urlParam: true,
								description: "The parent document ID."
							},
							{
								name: "name",
								description: "The new name for the document."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>document.notFound</i> - The document was not found."
							},
							{
								label: "403 - Forbidden",
								description: "The user is not allowed to rename the document."
							}
						]
					}
				]
			},

			// Related Lists API
			
			{
				name: "Related Lists",
				endpoints: [
					{
						label: "Read",
						url: "/relatedLists/{propertyId}",
						method: "GET",
						description: "Read the related list property.",
						params: [
							{
								name: "propertyId",
								urlParam: true,
								description: "The related list property ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>property.notFound</i> - The property was not found."
							}
						]
					},
					{
						label: "Create",
						url: "/relatedLists",
						method: "POST",
						description: "Create a new related list property.",
						dynamicParams: true,
						params: [
							{
								name: "name",
								description: "The property name."
							},
							{
								name: "parentId",
								description: "The parent property ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>property.name.alreadyInUse</i> - The name is already in use."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>property.notFound</i> - The parent property was not found."
							}
						]
					},
					{
						label: "Update",
						url: "/relatedLists/{propertyId}",
						method: "PUT",
						description: "Update an existing related list property.",
						dynamicParams: true,
						params: [
							{
								name: "propertyId",
								urlParam: true,
								description: "The property ID."
							},
							{
								name: "parentId",
								description: "The parent property ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>property.notFound</i> - The property was not found."
							},
							{
								label: "412 - Precondition Failed",
								description: "<i>property.notFound</i> - The parent property was not found."
							}
						]
					},
					{
						label: "Remove",
						url: "/relatedLists/{propertyId}",
						method: "DELETE",
						description: "Delete the related list property.",
						params: [
							{
								name: "propertyId",
								urlParam: true,
								description: "The related list property ID."
							}
						],
						errors: [
							{
								label: "412 - Precondition Failed",
								description: "<i>property.notFound</i> - The property was not found."
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

