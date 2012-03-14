define(function(){

	var Config = {

		url: "http://localhost/api-buddy/php/proxy.php",
		
		usingProxy: true,

		globalParams: [
			{
				name: "api_key",
				value: "1736566fad2d7a10e762a8ec92a619e6",
				description: "Your API application key."
			},
			{
				name: "format",
				value: ["json", "rest", "php_serial"],
				description: "Request output format."
			},
			{
				name: "nojsoncallback",
				value: "1",
				visible: false
			}
		],

		globalErrors: [
			{
				label: "100: Invalid API Key",
				description: "The API key passed was not valid or has expired."
			},
			{
				label: "105: Service currently unavailable",
				description: "The requested service is temporarily unavailable."
			},
			{
				label: "111: Format \"xxx\" not found",
				description: "The requested response format was not found."
			},
			{
				label: "112: Method \"xxx\" not found",
				description: "The requested method was not found."
			},
			{
				label: "114: Invalid SOAP envelope",
				description: "The SOAP envelope send in the request could not be parsed."
			},
			{
				label: "115: Invalid XML-RPC Method Call",
				description: "The XML-RPC request document could not be parsed."
			},
			{
				label: "116: Bad URL found",
				description: "One or more arguments contained a URL that has been used for abuse on Flickr."
			}
		],

		groups: [

			{
				name: "Photos",
				endpoints: [
					{
						label: "flickr.photos.search",
						description: "Return a list of photos matching some criteria. Only photos visible to the calling user will be returned. To return private or semi-private photos, the caller must be authenticated with 'read' permissions, and have permission to view the photos. Unauthenticated calls will only return public photos.",
						method: "GET",
						params: [
							{
								name: "method",
								value: "flickr.photos.search",
								visible: false
							},
							{
								name: "text",
								description: "A free text search. Photos who's title, description or tags contain the text will be returned. You can exclude results that match a term by prepending it with a - character."
							},
							{
								name: "tags",
								description: "A comma-delimited list of tags. Photos with one or more of the tags listed will be returned. You can exclude results that match a term by prepending it with a - character."
							}
						],
						errors: [
							{
								label: "1: Too many tags in ALL query",
								description: "When performing an 'all tags' search, you may not specify more than 20 tags to join together."
							},
							{
								label: "2: Unknown user",
								description: "A user_id was passed which did not match a valid flickr user."
							},
							{
								label: "3: Parameterless searches have been disabled",
								description: "To perform a search with no parameters (to get the latest public photos, please use flickr.photos.getRecent instead)."
							},
							{
								label: "4: You don't have permission to view this pool",
								description: "The logged in user (if any) does not have permission to view the pool for this group."
							},
							{
								label: "10: Sorry, the Flickr search API is not currently available.",
								description: "The Flickr API search databases are temporarily unavailable."
							},
							{
								label: "11: No valid machine tags",
								description: "The query styntax for the machine_tags argument did not validate."
							},
							{
								label: "12: Exceeded maximum allowable machine tags",
								description: "The maximum number of machine tags in a single query was exceeded."
							},
							{
								label: "17: You can only search within your own contacts",
								description: "The call tried to use the contacts parameter with no user ID or a user ID other than that of the authenticated user."
							},
							{
								label: "18: Illogical arguments",
								description: "The request contained contradictory arguments."
							}
						]
					},
					{
						label: "flickr.photos.getExif",
						description: "Retrieves a list of EXIF/TIFF/GPS tags for a given photo. The calling user must have permission to view the photo.",
						method: "GET",
						params: [
							{
								name: "method",
								value: "flickr.photos.getExif",
								visible: false
							},
							{
								name: "photo_id",
								description: "The id of the photo to fetch information for."
							},
							{
								name: "secret",
								description: "The secret for the photo. If the correct secret is passed then permissions checking is skipped. This enables the 'sharing' of individual photos by passing around the id and secret."
							}
						]
					},
					{
						label: "flickr.photos.getFavorites",
						description: "Returns the list of people who have favorited a given photo.",
						method: "GET",
						params: [
							{
								name: "method",
								value: "flickr.photos.getFavorites",
								visible: false
							},
							{
								name: "photo_id",
								description: "The ID of the photo to fetch the favoriters list for."
							}
						]
					},
					{
						label: "flickr.photos.getSizes",
						description: "Returns the available sizes for a photo. The calling user must have permission to view the photo.",
						method: "GET",
						params: [
							{
								name: "method",
								value: "flickr.photos.getSizes",
								visible: false
							},
							{
								name: "photo_id",
								description: "The id of the photo to fetch size information for."
							}
						]
					}
				]
			},

			{
				name: "Comments",
				endpoints: [
					{
						label: "flickr.photos.comments.getList",
						description: "Returns the comments for a photo",
						method: "GET",
						params: [
							{
								name: "method",
								value: "flickr.photos.comments.getList",
								visible: false
							},
							{
								name: "photo_id",
								description: "The id of the photo to fetch comments for."
							}
						]
					}
				]
			},

			{
				name: "Stats",
				endpoints: [
					{
						label: "flickr.stats.getPopularPhotos",
						description: "List the photos with the most views, comments or favorites. This method requires <strong>authentication</strong> with 'read' permission.",
						method: "GET",
						params: [
							{
								name: "method",
								value: "flickr.stats.getPopularPhotos",
								visible: false
							},
							{
								name: "auth_token"
							},
							{
								name: "api_sig"
							}
						]
					}
				]
			}

		]

	};

	return Config;

});