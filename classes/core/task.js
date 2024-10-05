import Utils from "~/classes/utils.js";

export default class Task{
    constructor(icon, darkIcon, name, iconSize){
        this.id = Utils.generateUUID();
        this.name = name;
        this.icon = icon;
        this.darkIcon = darkIcon;
        this.iconSize = iconSize;
    }
}