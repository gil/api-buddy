define([
	"collections/GroupsCollection"
],function(GroupsCollection){

	var GroupsController = {

		parseGroups: function(groups) {

			groups = GroupsCollection.groups.parse( groups );

			_.each(groups, function(group){
				GroupsCollection.groups.add( group );
			});
		}

	}

	return GroupsController;

});