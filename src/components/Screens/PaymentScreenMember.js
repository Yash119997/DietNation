import Axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails } from '../../actions/userActions.js';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants.js';

const PaymentScreenMember = ({ location, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    history.push('/login');
  }

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log('payment submit');
    const headers = {
      Authorization: `Bearer ${userInfo.token}`,
    };
    const API_URL = `http://127.0.0.1:5000/razorpay/`;
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl, { headers: headers });
    const { data } = response;
    console.log('App -> razorPayPaymentHandler -> data', data);

    const options = {
      key: 'rzp_test_8DTKA90oOZEEiz',
      name: 'Houspetial & dietnation - Membership Fee',
      description: 'NOTE: You need to login again after successful payment',
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await Axios.post(
            url,
            {},
            { headers: headers }
          );
          const successObj = JSON.parse(captureResponse.data);
          const captured = successObj.captured;
          console.log('App -> razorPayPaymentHandler -> captured', successObj);
          if (captured) {
            console.log('success');
            const url = `${API_URL}member/${user._id}`;
            const r = await Axios.get(url, { headers: headers });
            if (r) {
              console.log(r);
              await localStorage.setItem('userInfo', JSON.stringify(r.data));
              history.push('/profile');
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: '#686CFD',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <Row>
      <Col md={6}>
        <img
          src={'/photos/pay.jpg'}
          alt='payment_icon'
          height='500vh'
          width='500hw'
        />
      </Col>
      <Col md={5}>
        <img
          src={'/photos/sub.png'}
          alt='membershp_icon'
          height='250vh'
          width='250hw'
        />
        <h2>User Details</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder={userInfo.name}
              readOnly
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder={userInfo.email}
              readOnly
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Pay
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PaymentScreenMember;
