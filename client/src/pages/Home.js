import React from 'react';
import { QUERY_THOUGHTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import ThoughList from '../components/ThoughtList';

const Home = () => {
  //use use uery hooke to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
      </div>
      </div>
    </main>
  );
};

export default Home;
