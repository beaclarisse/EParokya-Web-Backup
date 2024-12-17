import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, loading } = useSelector(state => state.auth);

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Profile'} />

          <div style={styles.profileContainer} className="profile-container mt-5">
            <h2 className="mb-4">My Profile</h2>

            <div className="row justify-content-center user-info">
              <div className="col-12 col-md-4 text-center">
                <figure style={styles.avatarProfile} className="avatar avatar-profile mb-4">
                  <img
                    className="rounded-circle img-fluid"
                    src={user?.avatar?.url || '/default-avatar.png'}
                    alt={user?.name || 'User Avatar'}
                    style={{ width: '150px', height: '150px' }}
                  />
                </figure>
                {/* Button Container for centering */}
                <div style={styles.buttonContainer}>
                  <Link to="/me/update" className="btn btn-primary" style={styles.btnBlock}>
                    Edit Profile
                  </Link>
                  <Link to="/password/update" className="btn btn-primary" style={styles.btnBlock}>
                    Change Password
                  </Link>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div style={styles.profileDetails} className="profile-details">
                  <h4>Full Name</h4>
                  <p>{user.name}</p>

                  <h4>Email Address</h4>
                  <p>{user.email}</p>

                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substring(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

const styles = {
  profileContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  profileDetails: {
    marginTop: '20px',
  },
  avatarProfile: {
    marginBottom: '20px',
  },
  // Added button container to center both buttons
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px', // Space between the buttons
    marginTop: '20px',
  },
  btnBlock: {
    width: '30%',
    padding: '20px 40px',
    textAlign: 'center',
  },
};
