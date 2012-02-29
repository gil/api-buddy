define(function(){

	var Config = {

		url: "http://localhost/flickr/api",

		globalParams: [
			{
				name: "api_key",
				value: "1736566fad2d7a10e762a8ec92a619e6",
				description: "Your API application key."
			},
			{
				name: "format",
				value: "json",
				description: "Request output format. (json, rest, php_serial)"
			},
			{
				name: "nojsoncallback",
				value: "1",
				visible: false
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