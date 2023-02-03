import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listDoctors } from '../../actions/userActions';
import './Join.css';

export default function SignIn({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.doctorList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listDoctors());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='joinOuterContainer'>
          <div className='joinInnerContainer'>
            {users
              .filter((user) => user.isAvail)
              .map((filteredUser) => (
                <div className='joinInnerMostContainer' key={filteredUser._id}>
                  <h3 className='dName'>{filteredUser.name}</h3>
                  <img
                    src={'/photos/doc.jpg'}
                    alt='membershp_icon'
                    height='250vh'
                    width='250hw'
                  />
                  <Link
                    onClick={(e) =>
                      !userInfo.name || !filteredUser.name
                        ? e.preventDefault()
                        : null
                    }
                    to={`/chat?name=${userInfo.name}&room=${filteredUser.name}`}
                  >
                    <button className={'button mt-20'} type='submit'>
                      Join
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
