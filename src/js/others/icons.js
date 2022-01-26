import Linux from "../../images/linux.svg";
import Mobile from "../../images/mobile.svg";
import Playstation from "../../images/ps4.svg";
import Switch from "../../images/switch.svg";
import Windows from "../../images/windows.svg";
import Xbox from "../../images/xbox.svg";

const platformsIcons = (list) => {
	const iconPlatforms = {
		"linux": Linux,
		"ios": Mobile,
		"android": Mobile,
		"playstation4": Playstation,
		"nintendo-switch": Switch,
		"pc": Windows,
		"xbox-one": Xbox,
	};

	let searched = list.map(list => list.platform).map(plat => plat.slug)
	const icons = searched.map((element) => {
		if (iconPlatforms[element]) {
			return `<img class="icon" src="${iconPlatforms[element]}">`;
		};
	});
	return icons.join('\n');
};

export { platformsIcons };