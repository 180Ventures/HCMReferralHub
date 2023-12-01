import { Container } from '@/components';
import withAuth from '@/components/AuthHOC';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const InviteFriend: NextPage = () => {
  const route = useRouter();

  return (
    <Container headTitle='Invite a Friend'>
   
    </Container>
  );
};

export default InviteFriend
