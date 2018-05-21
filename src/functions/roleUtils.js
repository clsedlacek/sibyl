module.exports = {
	checkGuildMemberHasRole: function(guildMember, roleName) {
		const role = guildMember.roles.find("name", roleName);
		return role ? true : false;
	}
}
