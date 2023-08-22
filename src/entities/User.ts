class User {
  public name: string
  public email: string
  public _id?: string
  constructor(name: string, email: string, _id?: string) {
    this.name = name
    this.email = email
    this._id = _id
  }
}

export { User }
