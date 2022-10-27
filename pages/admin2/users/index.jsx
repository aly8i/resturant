import dynamic from 'next/dynamic';
import axios from "axios";
const UserList = dynamic(
  () => import("../../../components/admin/UserList"),
  {ssr: false}
)
const admin2 = ({users,token}) => {
  return (
        <UserList users={users} token={token}/>
  );
};

export default admin2;

export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res1={};
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      accessToken =  context.req.cookies.accessToken;
      if (accessToken) {
        config.headers.authorization = accessToken;
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    },
  );
  try{
    const res11 = await server.get("api/users/");
    res1=res11;
}catch(err){
  if(err.response.status>=300){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
  }
}
  return {
    props: {
      users: res1.data,
      token: accessToken,
    },
  };
};