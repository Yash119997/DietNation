import React from 'react';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import HomeScreen from './components/Screens/HomeScreen/HomeScreen.js';
import loginScreen from './components/Screens/LoginScreen.js';
import registerScreen from './components/Screens/RegisterScreen.js';
import profileScreen from './components/Screens/ProfileScreen.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserEditScreen from './components/Screens/UserEditScreen.js';
import UserListScreen from './components/Screens/UserListScreen.js';
import Chat from './components/Chat/Chat.js';
import Join from './components/Join/Join.js';
import NearBy from './components/NearBy.js';
import ProductHomeScreen from './components/Screens/ProductHomeScreen.js';
import ProductScreen from './components/Screens/ProductScreen.js';
import CartScreen from './components/Screens/cartScreen.js';
import ShippingScreen from './components/Screens/shippingScreen.js';
import PaymentScreenMember from './components/Screens/PaymentScreenMember.js';
import PaymentScreen from './components/Screens/PaymentScreen.js';
import PlaceOrderScreen from './components/Screens/PlaceOrderScreen.js';
import OrderScreen from './components/Screens/OrderScreen.js';
import ProductListScreen from './components/Screens/ProductListScreen.js';
import ProductEditScreen from './components/Screens/ProductEditScreen.js';
import OrderListScreen from './components/Screens/OrderListScreen.js';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <main className='py-3'>
          <Route path='/login' component={loginScreen} />
          <Route path='/register' component={registerScreen} />
          <Route path='/profile' component={profileScreen} />
          <Route path='/paymentMember' component={PaymentScreenMember} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/onlinechat' exact component={Join} />
          <Route path='/chat' component={Chat} />
          <Route path='/nearbyhospital' component={NearBy} exact />
          {/* new */}
          <Route path='/products' component={ProductHomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
