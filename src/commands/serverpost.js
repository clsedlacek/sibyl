const Discord = require('discord.js');
const help = require('../commands/serverpost');
const channels = require('../../config/channels.json');

//THIS DOESN'T DO ANYTHING YET

module.exports = (client, message, args) => {
	console.log('Log', 'Printing out #server embeds...');
	if (args.length === 0) {
		return message.channels.send(`Please specify an embed name.`)
	};

	if (args[0] === "0") {
		return message.guild.channels.find("id", channels.server).send(
			{
				"embed": {
						"image": {
						"url": "https://images-ext-2.discordapp.net/external/f7r-fPISuFinCpbQXL8fPxtZaSJAReRQRz8Kl1aJLEc/https/cdn.discordapp.com/attachments/350133011603390475/417752208675700737/logo_1.png"
					}
				}
			}
		  )};

	if (args[0] === "1") {
		return message.guild.channels.find("id", channels.server).send({
			"embed": {
						"title": "Welcome to Psychedelic Praxis",
			"description": "Psychedelic Praxis is a resource for people exploring psychedelic therapy and seeking materials that facilitate personal growth and safe drug consumption. This community aims for constructive dialogue, peer support, and globally-inclusive research, news, and policy updates. Visit us [on reddit](https://old.reddit.com/r/psychedelicpraxis/) or browse our [Psychedelic Library](http://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0/) hosted by [the-eye.eu](the-eye.eu). A full download of the library (which takes up 15.6gb) [is also available](https://the-eye.eu/public/Psychedelics/PPL3.tar) from the-eye.\n\nIn case this server is ever shut down by Discord, keep up with the community by using our relay node [PsychedelicPraxis.com](www.psychedelicpraxis.com)",
					"image": {
					"url": "https://images-ext-2.discordapp.net/external/qg2EG4O3-y-T6RwmUhV6b-2sxcGwzZHbIoRh9mEa45Y/https/cdn.discordapp.com/attachments/350133011603390475/417753303556816896/rules.png"
				},
				"fields": [
					{
						"name": "Who this server is for:",
						"value": "(a) people exploring psychedelic therapy or altered states\n(b) seeking resources that facilitate personal growth and safe drug consumption\n(c) discussing quandries inherent in expanded consciousness and hyperawareness\n(d) learning to convert personal struggle into compassion for oneself and others."
					},
					{
						"name": "You are expected to strive for these qualities in communication:",
						"value": "(a) show empathy or compassion toward everyone\n(b) be willing to question your assumptions so other perspectives can be validated\n(c) engage in active listening, acknowledge harm others perceive you have caused, apologize or make amends\n(d) take time to disengage when you become overwhelmed by discussion; do not feel obliged to reply."
					}
				]
			}
		})};

	if (args[0] === "2") {
		return message.guild.channels.find("id", channels.server).send({
			"embed": {
				"image": {
					"url": "https://cdn.discordapp.com/attachments/350133011603390475/417822079853920257/peer-moderation.png"
				},
				"fields": [
					{
						"name": "1. Age 18+",
						"value": "We cannot be held liable for the health/safety of children."
					},
					{
						"name": "2. No harassment",
						"value": "Do not discriminate against anyone for their experiences or self-identity. Maintain a space that feels safe and supportive for all users."
					},
					{
						"name": "3. Limit discussion of high-risk use",
						"value": "Discussion of recreational opioid/stimulant use is discouraged, as some present may be recovering. If you are unsure, keep these conversations in #drug-use."
					},
								{
						"name": "4. Respect altered states",
						"value": "Be mindful that users may be in altered state of consciousness. Show kindness toward members who are tripping."
					},
								{
						"name": "5. No sourcing",
						"value": "Requesting or giving sources for drugs is strictly prohibited, including any mention of active darknet markets (DNMs). Discussion of drug economies/cryptocurrency/security is allowed."
					},
								{
						"name": "6. No photo-based drug identification",
						"value": "Do not ask other users to identify substances by photo. Please test chemicals using reagent kits as outlined in #safety."
					},
								{
						"name": "7. No sockpuppets.",
						"value": "All alternative accounts belonging to a single user must be disclosed publicly in #introductions or privately with an @Operator. This is to reduce confusion, given the server's peer-support basis."
					}
				]
			}
		}
	)};

	if (args[0] === "3") {
		return message.guild.channels.find("id", channels.server).send({
			"embed": {
				"image": {
					"url": "https://cdn.discordapp.com/attachments/350133011603390475/417753305268092948/server-roles.png"
				},
				"fields": [
					{
						"name": "Community-Based Support/Moderation",
						"value": "The server is moderated by members with the @Community role, which any user can be nominated to by providing support to others. A user message which receives multiple :zipper_mouth: reacts from @Community members may result in the message sender being @Hushed temporarily or @Relocated to #arbitration. @Operators may intervene in discussion if not enough @Community members are present to bring a successful vote against an abusive user. Server roles applied during peer moderation, and a general listing, are as follows:"
					},
					{
						"name": "@:zipper_mouth: Hushed",
						"value": "Users who have been muted by community vote, but who can still read most channels."
					},
					{
						"name": "@:fishing_pole_and_fish: Relocated",
						"value": "Users who have been removed from all chat channels by community vote, but may appeal to the server operators in #arbitration."
					}
				]
			}
		}
	)};

	if (args[0] === "4") {
		return message.guild.channels.find("id", channels.server).send({
			"embed": {
				"image": {
					"url": "https://cdn.discordapp.com/attachments/478956414686199809/485974633867378690/library.png"
				},
				"fields": [
		
								{
						"name": "@:radio: Operator",
						"value": "Help manage the server and its users."
					},
								{
						"name": "@:classical_building: Specialists",
						"value": "Have a major specialization related to psychedelic drugs."
					},
								{
						"name": "@:tools: Technicians",
						"value": "Engineer the bots and #library archiving efforts."
					},
								{
						"name": "@:blue_heart: Here to Help",
						"value": "Lend emotional labor to peer disputes and server mediation in #arbitation, opt-in role."
					},
								{
						"name": "@:robot: Bots",
						"value": "Perform automated tasks. Use !help and --help to get command lists."
					},
								{
						"name": "@:books: Librarian",
						"value": "Users who have submitted studies to #library gain posting rights there and have access to read archived channels."
					},
								{
						"name": "@:meat_on_bone: Certified",
						"value": "Involved in real life activism or events. @:rainbow: Community members may join by typing !meetup <location>"
					},
								{
						"name": "@:rainbow: Community",
						"value": "Frequent contributors who participate in peer support and moderation, and have access to community channels."
					},
								{
						"name": "@:spy: Registree",
						"value": "Users who have written an introduction and have access to most channels."
					},
								{
						"name": "@:globe_with_meridians: everyone",
						"value": "Unregistered users who can view the Information Desk channels but do not have access to chat beyond #casual until writing in #introductions."
					},
								{
						"name": "Pronoun & Identity Roles",
						"value": "Users may designate pronouns or identity descriptors by using roles. Use #bots for commands --roles to get a list of available roles, and --role <role> to add/remove them."
					},
											{
						"name": "Vanity and Color Roles",
						"value": "If you would like a special role all to yourself, establish yourself in the community and ask an @:radio:Operator very nicely."
					}, 
					{
						"name": "System users and Prefixes",
						"value": "Some of our users identify as dissociated systems of alternate egos or identity-parts. Users may denote in conversation which part is currently speaking by prefixing their message with an emoji or alias. We encourage system users to post an explanation of their prefixes in #introductions to help others keep track of dialogues."
					}
				]
			}
		}
	)};

	if (args[0] === "5") {
		return message.guild.channels.find("id", channels.server).send({
			"embed": {
						"title": "Psychedelic Library & Directory",
			"description": "Psychedelic Praxis compiling a libray of academic and educational literature pertaining to entheogens, their history, and the safe therapeutic use of mind-expanding psychotropic drugs. We are in the process of creating a searchable online directory for all known psychedelic literature. If you find an item which is missing from our library, please contact a @:books: Librarian so that it may be added!",
				"url": "http://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0/",
		
				"fields": [
					{
						"name": "Current library holdings:",
						"value": ":floppy_disk: 3,500+ written documents including journal articles, academic studies, seminal books, regular publications, textbooks\n:leaves: 1,900+ books and studies on cannabis (thanks DMT-Nexus!)\n:headphones: 110+ audio recordings of healing psychedelic music and protocols, with clinical and ethnographic documentation\n:books: 130+ back issues from major psychedelic publications past and present\n:smile_cat: 60+ emojis related to psychedelic culture\n:projector: 20+ vintage films, primary source documentaries, and interviews\n:mag_right: a searchable INDEX.txt, harm reduction resources, information on current and enrolling clinical studies, listing of real-life psychedelic societies\n:satellite_orbital: a .torrent for the Psychedelic Praxis Multimedia Release 1.0, containing an additional 50GB of psychedelic video and audio"
					},
					{
						"name": "Torrent magnet link URL:",
						"value": "magnet:?xt=urn:btih:15565098b8d3f1af1a0d113d6b9e546543f87860&dn=Psychedelic%20Praxis%20Library%203.0&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.open-internet.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.skyts.net%3a6969%2fannounce"
					}
				]
			}
		}
	)}

	else {
		return
	}
}
