import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Kolkata",
        avatar_url: "dummy.photo.com",
      },
    };
    const { count, count2 } = this.state;
    console.log("Child Constructor");
  }
  async componentDidMount() {
    // console.log("Child CDM");
    const data = await fetch(" https://api.github.com/users/prabhash1475");
    const json = await data.json();
    // console.log(json);

    this.setState({
      userInfo: json,
    });
    console.log(json.bio);
  }
  componentWillUnmount() {
    console.log("Unmount");
  }
  render() {
    const { count, count2 } = this.state;
    console.log("Child Render");
    const { name, location, avatar_url, bio } = this.state.userInfo;
    return (
      <div className="user-card">
        <img style={{ borderRadius: "50%" }} src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Bio : {bio}</h3>
        <h4>Location:{location}</h4>
        <h4>Contact: @pk1475</h4>
      </div>
    );
  }
}
export default UserClass;
