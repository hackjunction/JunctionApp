import React, { useState, useEffect } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';

const SearchResults = () => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected('5d5a860fdc07b6002b2329d2');
  });

  const event = {};

  return (
    <RecruitmentUserModal
      registrationId={selected}
      event={event}
      idToken={
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpCI6Ik5FWkZOa1U1TWtZMk1EWkNRelZGUVRGQ1JVWkZOVGRDUkVVNFF6SkdSRVZFTTBSRFJrWXdSZyJ9'
      }
    />
  );
};

export default SearchResults;
