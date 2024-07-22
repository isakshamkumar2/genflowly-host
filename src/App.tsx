import React, { Suspense } from 'react';
import Layout from './components/Layout';
//@ts-ignore
import AuthApp from 'SubappOne/Shell';
const App = () => {
  return <Layout >
<Suspense fallback={<div>Loading...</div>}>
<AuthApp />
</Suspense>
  </Layout>
};

export default App;
