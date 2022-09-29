/** @format */

class Sport {
  constructor(
    _id,
    title,
    iconUrl,
    minParticipants,
    maxParticipants,
    visible,
    popular,
    groups,
    profiles
  ) {
    this._id = _id;
    this.title = title;
    this.minParticipants = minParticipants;
    this.maxParticipants = maxParticipants;
    this.iconUrl = iconUrl;
    this.visible = visible;
    this.popular = popular;
    this.groups = groups;
    this.profiles = profiles;
  }
}

export default Sport;
