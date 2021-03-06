import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addRequest } from '../../actions';

const styles = {
  button: {
    margin: 12,
  },
  form: {
    padding: 20,
  },
};

class PassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        url: '',
        username: '',
        password: '',
        createdAt: '',
        updatedAt: '',
      },
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const submittedPassword = {};
    submittedPassword[e.target.name] = e.target.value;
    const newPassword = Object.assign({}, this.state.form, submittedPassword);
    this.setState({ form: newPassword });
  }

  render() {
    const { addRequest } = this.props;
    const { url, username, password } = this.state.form;
    return (
      <div>
        { this.state.submitted === true && <Redirect to={{ pathname: '/' }} />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addRequest(
              { url, username, password, createdAt: Date.now(), updatedAt: Date.now() }
            );
            this.setState(
              { url: '', username: '', password: '', submitted: true },
            );
          }}
        >
          <TextField
            type="text"
            name="url"
            value={url}
            onChange={this.handleChange}
            floatingLabelText="URL"
          /><br />
          <TextField
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            floatingLabelText="Username"
          /><br />
          <TextField
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            floatingLabelText="Password"
          /><br />
          <RaisedButton label="SUBMIT" type="submit" primary style={styles.button} />
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  addRequest: newPass => dispatch(addRequest(newPass))
});

export default connect(null, mapDispatchToProps)(PassForm);
