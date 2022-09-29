/** @format */

class Group {
  constructor(
    id,
    name,
    sportId,
    creationAt,
    description
    // preferences
  ) {
    this.id = id;
    this.name = name;
    this.sportId = sportId;
    this.creationAt = creationAt;
    this.description = description;
    // this.preferences = preferences;
  }
}

export default Group;
