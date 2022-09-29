/** @format */

class User {
  constructor(
    id,
    username,
    description,
    memberSince,
    numberNumber,
    isAdmin,
    isPro,
    preferences,
    profiles
  ) {
    this.id = id;
    this.username = username;
    this.description = description;
    this.memberSince = memberSince;
    this.numberNumber = numberNumber;
    this.isAdmin = isAdmin;
    this.isPro = isPro;
    this.preferences = preferences;
    this.profiles = profiles;
  }
}

export default User;
