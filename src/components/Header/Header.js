import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions.js';
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  // const text = localStorage.getItem('userInfo');
  // const obj = JSON.parse(text);
  return (
    <div>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <i className='far fa-hospital'></i>Housepital&Dietnation
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/health'>
              <Nav.Link href='/health'>Know Your Health</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/food'>
              <Nav.Link>Know Your Food</Nav.Link>
            </LinkContainer>
            <NavDropdown title='MEDICAL-ASSISTANCE' id='basic-nav-dropdown'>
              <LinkContainer to='/dietplan'>
                <NavDropdown.Item>Diet Plan</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/onlinechat'>
                <NavDropdown.Item>Online Assistance</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/nearbyhospital'>
                <NavDropdown.Item>Near-By Hospital</NavDropdown.Item>
              </LinkContainer>
              {/* added */}
              <LinkContainer to='/products'>
                <NavDropdown.Item>Medical products</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo && !userInfo.isMember && (
              <LinkContainer to='/paymentMember'>
                <Nav.Link href='/paymentMember'>Membership</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isMember && (
              <img
                src={'/photos/pre.svg'}
                alt={`premium user`}
                className='img-responsive'
                height='40px'
                width='40px'
              />
            )}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>Sign-in</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
