import { FC, useEffect, useState } from "react";
import { User } from "../../Types";
import { BASE_URL } from "../../Utils/constants";
import axios from "axios";
import Spinner from "../../Components/Common/Spinner";

const Home: FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchUsersAsync = async () =>{
        setIsLoading(true);
        axios.get<User[]>(`${BASE_URL}users`)
          .then(response => {
            setUsers(response.data);
            setIsLoading(false);
          })
          .catch(err => {
            setErrorMessage('Failed to fetch users. Please try again later.');
            console.error(err);
            setIsLoading(false);
          });
    }

    useEffect(() => {
        fetchUsersAsync();
      }, []);

    return(
        <div>
          {isLoading? <Spinner />:(
          <div>
            <h1>User List</h1>
            {users.map(user => (
              <div key={user.id}>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>Address: {user.address.street}, {user.address.city}</p>
              </div>
            ))}
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          )}
        </div>
         )
}

export default Home;