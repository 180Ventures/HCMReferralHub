import { Container } from '@/components';
import withAuth from '@/components/AuthHOC';
import SideBar from '@/components/SideBar';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Container
      headTitle='Home'
      className='flex flex-col h-screen bg-gray-50'
    >
      <SideBar />
    </Container>
  );
};

export default withAuth(HomePage, 'all');
