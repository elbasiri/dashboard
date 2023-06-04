import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const initialValues = {
  email: '',
  password: ''
};

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return errors;
};

function LoginForm() {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={values => {
        // Do something with the form data
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" tag={Field} />
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" tag={Field} />
            {errors.password && touched.password ? (
              <div className="text-danger">{errors.password}</div>
            ) : null}
          </FormGroup>
          <Button type="submit" color="primary">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;

